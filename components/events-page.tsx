import axios from "axios";
import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text, Pressable } from "react-native";
import Activity from "../models/activity";
import EventLineItem from "./event-line-item";




export default function EventsPage() {

    const [events, setEvents] =  useState<Activity[]>([]);

    useEffect(() => {
        (async () => {
            const response = await axios.get<Activity[]>(`http://20.72.189.253:3000/activities`)
            .then(response => response)
            .catch((error) => {
                let message = "";
                if(error instanceof Error) {
                    message += error.message;
                }
                if(error.response) {
                    message += "\n" + error.response.data;
                }
                alert(message);
            });
            if(response && response.status === 200) {
                setEvents(response.data);
            }
        })();
    },[]);


    return(<View style={styles.container}>

        <FlatList 
            keyExtractor={item => item.id}
            data={events}
            renderItem={({item}) => (
                <EventLineItem {...item}/>
            )}
        />
        
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dedede'
    },
    itemContainer: {
        flex:1,
        flexDirection: "column",
    }
})