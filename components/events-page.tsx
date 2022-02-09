import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Activity from "../models/activity";
import EventRoutes from "../routes/event-routes";
import EventLineItem from "./event-line-item";




export default function EventsPage() {

    const [events, setEvents] =  useState<Activity[]>([]);

    useEffect(() => {
        (async () => {
            const response = await EventRoutes.getEvents();
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