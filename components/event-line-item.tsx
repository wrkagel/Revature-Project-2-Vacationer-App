import { useState } from "react";
import {View, Pressable, Text, StyleSheet} from "react-native";
import Activity from "../models/activity";



export default function EventLineItem(props: Activity){

    const [expanded, setExpanded] = useState<boolean>(false)


    return(
    <View>
        <Pressable onPress={()=> setExpanded(!expanded)} style={styles.pressable}>
            <Text style={styles.inlineTextBold}>{props.title}</Text>
            <Text style={styles.inlineText}>{new Date(props.startTime).toLocaleString()}</Text>
        </Pressable>
        {expanded && <View>
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
                <Text style={styles.expandedBold}>Event Status: </Text>
                {props.status}
            </Text>
        </View>}
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