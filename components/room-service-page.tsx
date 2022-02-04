import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import MenuItem from "../models/menu-item";
import OrderSubmitForm from "./order-submit-form";


export default function RoomServicePage() {

    const [cart, setCart] = useState<{item:MenuItem, amount:number}[]>([]);
    const [showCart, setShowCart] = useState<boolean>(false);
    const [showSubmit, setShowSubmit] = useState<boolean>(false);
    const [menu, setMenu] = useState<MenuItem[]>([]);

    useEffect(() => {
        (async () => {
            const response = await axios.get<MenuItem[]>("http://20.72.189.253:3000/offerings")
            .then(response => response)
            .catch((error) => {
                let message = "";
                if(error instanceof Error) {
                    message += error.message;
                }
                if(error.response) {
                    message += '\n' + error.response.data;
                }
                alert(message);
            });
            if(response && response.status == 200) {
                const newMenu:MenuItem[] = response.data;
                setMenu(newMenu);
                setCart(newMenu.map(item => ({item, amount:0})));
                setShowCart(true);
            }
        })();
    }, []);

    function increaseAmount(item:MenuItem, index:number) {
        cart[index].amount++;
        setCart([...cart]);
    }

    function decreaseAmount(item:MenuItem, index:number) {
        if(cart[index].amount >= 1) {
            cart[index].amount--;
            setCart([...cart]);
        }
    }

    return(<View style={{flex:1}}>
        <FlatList style={{flex:0.9}} keyExtractor={(item) => item.desc} data={menu} renderItem={({item, index}) => {
            return(<>
            <View style={styles.menuItem}>
                <Text>{item.desc}</Text>
                <Text>${item.cost.toFixed(2)}</Text>
            </View>
            <View style={[styles.menuItem, styles.amountContainer]}>
                <Pressable style={styles.amountItem} onPress={() => decreaseAmount(item, index)}>
                    <Text style={styles.amountTextItem}>-</Text>
                </Pressable>
                {showCart && <Text style={[styles.amountItem, styles.amountTextItem]}>{cart[index].amount}</Text>}
                <Pressable style={styles.amountItem} onPress={() => increaseAmount(item, index)}>
                    <Text style={styles.amountTextItem}>+</Text>
                </Pressable>
            </View>
            </>)
        }} />
        <Pressable style={{flex:0.1}} onPress={() => setShowSubmit(true)} >
            <Text style={styles.amountTextItem}>Check Out</Text>
        </Pressable>
        {showSubmit && <OrderSubmitForm setShowSubmit={setShowSubmit} cart={cart}/>}
        </View>)
}

const styles = StyleSheet.create({
    menuItem: {
        flex:1, 
        flexDirection:"row", 
        justifyContent:"space-between",
        padding:10
    },
    amountContainer: {
        justifyContent:undefined
    },
    amountItem: {
        flex:1,
        backgroundColor:"#0055f5",
        borderStyle:"solid",
        borderWidth:2,
        alignSelf:"center"
    },
    amountTextItem: {
        fontWeight:"bold",
        fontSize:20,
        textAlign:"center",
        justifyContent:"center"
    }
});