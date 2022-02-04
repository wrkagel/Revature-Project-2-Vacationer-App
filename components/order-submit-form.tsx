import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { v4 } from "uuid";
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
    }, [submit])

    return(<Animated.View style={{position:"absolute", height:"100%", width:"100%", backgroundColor:"#aa77ff", transform: [{scale:formAnimation}]}}>
        <Pressable onPress={() => setSubmit({...submit})}>
            <Text>Submit</Text>
        </Pressable>
    </Animated.View>)
}