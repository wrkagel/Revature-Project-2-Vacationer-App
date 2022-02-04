import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import MenuItem from "../models/menu-item";


export default function RoomServicePage() {

    const [cart, setCart] = useState<{item:MenuItem, amount:number}[]>([]);
    const [showCart, setShowCart] = useState<boolean>(false);
    const [submit, setSubmit] = useState<{}>();

    const menu:MenuItem[] = [
        {
            desc:"McLobster Bisque",
            cost:40000.23
        },
        {
            desc:"Grab Bag",
            cost:2.2
        },
        {
            desc:"This is the song that doesn't end",
            cost:0
        }
    ]

    useEffect(() => {
        const newCart = menu.map(item => {
            return {item, amount:0};
        });
        setCart(newCart);
        setShowCart(true);
    }, []);

    useEffect(() => {
        if(!submit) return;
        let message = "";
        let total = 0;
        cart.forEach((cartItem) => {
            const totalAmount = cartItem.item.cost * cartItem.amount;
            message += `${cartItem.item.desc}   ${cartItem.amount} x ${cartItem.item.cost} = ${totalAmount.toFixed(2)}\n`;
            total += totalAmount;
        })
        alert(message + "\n" + `total = $${total.toFixed(2)}`);
    }, [submit])

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
        <Pressable style={{flex:0.1}} onPress={() => setSubmit({...submit})} >
            <Text style={styles.amountTextItem}>Check Out</Text>
        </Pressable>
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