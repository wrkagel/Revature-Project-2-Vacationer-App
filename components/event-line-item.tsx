import { useRef, useState } from "react";
import {View, Pressable, Text, StyleSheet, Animated} from "react-native";
import Activity from "../models/activity";



export default function EventLineItem(props: Activity){

    const [expanded, setExpanded] = useState<boolean>(false)

    const formAnimation = useRef(new Animated.Value(0)).current;

    function expand() {
        Animated.timing(formAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }).start();
    }

    function contract() {
        Animated.timing(formAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver:true
        }).start(() => {
            setExpanded(false);
        })
    }

    return(<View>
        <Pressable onPress={()=> {
                if(!expanded) {
                    setExpanded(true);
                    expand();
                } else {
                    contract();
                }
            }} style={styles.pressable}>
                {props.status === "Cancelled" ? 
                    <Text style={[styles.inlineTextBold, {color:"crimson"}]}>{props.title}</Text> 
                    : 
                    <Text style={styles.inlineTextBold}>{props.title}</Text>}
            <Text style={styles.inlineText}>{new Date(props.startTime).toLocaleString()}</Text>
        </Pressable>
            {expanded && 
                <Animated.View style={{transform: [{ scaleY: formAnimation }]}}>
                    <Text style={styles.expandedText}>
                        <Text style={styles.expandedBold}>Event Details: </Text>
                        {props.desc}
                    </Text>
                    <Text style={styles.expandedText}>
                        <Text style={styles.expandedBold}>End Time: </Text>
                        {new Date(props.endTime).toLocaleString()}
                    </Text>
                    <Text style={styles.expandedText}>
                        <Text style={styles.expandedBold}>Where: </Text>
                        {props.location}
                    </Text>
                    <Text style={styles.expandedText}>
                        {props.status === "Cancelled" ? 
                            <Text style={[styles.expandedBold,{color:"crimson"}]}>Event Status: {props.status}</Text>
                            :
                            <Text style={styles.expandedBold}>Event Status: {props.status}</Text>
                        }
                        
                    </Text>
                </Animated.View>
            }
    </View>)
}

const styles = StyleSheet.create({
    expandedBold:{
        fontWeight:"bold"
    },
    pressable:{
        flex:1,
        marginVertical:10,
    },
    inlineText:{
        fontSize:20,
        textAlign:"center"
    },
    inlineTextBold:{
        fontSize:20,
        textAlign:"center",
        fontWeight:"bold"
    },
    expandedText:{
        fontSize: 15,
        marginVertical:2,
        marginHorizontal:12,
    },
});