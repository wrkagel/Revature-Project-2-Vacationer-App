import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Animated, FlatList, Pressable, Text, View } from "react-native";
import { ReservationContext } from "../App";
import MenuItem from "../models/menu-item";


export default function OrderSubmitForm(props:{cart:{item:MenuItem, amount:number}[], setShowSubmit:Function}) {

    const [submit, setSubmit] = useState<{}>();

    const formAnimation = useRef(new Animated.Value(0)).current;

    const reservation = useContext(ReservationContext);

    const {cart} = props; 

    function slideUp() {
        Animated.timing(formAnimation, {
            toValue:1,
            duration:500,
            useNativeDriver:false
        }).start();
    }

    useEffect(() => {
        slideUp();
    }, [])

    useEffect(() => {
        if(!submit) return;
        (async () => {
            const order:{desc:string, amount:number}[] = [];
            cart.forEach(cItem => {
                if(cItem.amount > 0) {
                    const {desc} = cItem.item;
                    const {amount} = cItem;
                    order.push({desc, amount});
                }
            });
            const response = await axios.post("http://20.72.189.253:3000/servicerequests", {
                data: {
                    room: reservation.room,
                    order
                }
            })
            .then(response => response)
            .catch((error) => {
                let message = "";
                if(error instanceof Error) {
                    message += error.message;
                }
                if(error.response) {
                    message += error.response.data;
                }
                alert(message);
            });
            if(response && response.status === 201) {
                alert('Order successfully submitted');
            }
            props.setShowSubmit(false);
        })()
    }, [submit]);

    function cancelSubmit(){
        props.setShowSubmit(false);
    };

    return(<Animated.View style={{position:"absolute", height:"100%", width:"100%", backgroundColor:"#aa77ff", transform: [{scale:formAnimation}]}}>
        <FlatList data={cart} keyExtractor={item => item.item.desc} renderItem={({item}) => {
            return(<>
            {Boolean(item.amount) && <View style={{flex:1, flexDirection:"row", margin:12, justifyContent:"space-between"}}>
                <Text>{item.item.desc} </Text>
                <Text>{item.item.cost} * {item.amount} = ${(item.item.cost * item.amount).toFixed(2)}</Text>
            </View>}
            </>)
        }}/>
        <Text>Total = ${cart.reduce((a, b) => a + b.item.cost * b.amount, 0).toFixed(2)}</Text>
        <View style={{flex:1, flexDirection:"row", alignItems:"flex-end", justifyContent:"space-between", margin:12}}>
            <Pressable onPress={() => setSubmit({...submit})}>
                <Text>Submit</Text>
            </Pressable>
            <Pressable onPress={cancelSubmit}>
                <Text>Cancel</Text>
            </Pressable>
        </View>
    </Animated.View>)
}