import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Activity from "../models/activity";
import EventRoutes from "../routes/event-routes";
import EventLineItem from "./event-line-item";




export default function EventsPage() {

    const [events, setEvents] =  useState<Activity[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [run, setRun] = useState<{}>();

    useEffect(() => {
        (async () => {
            const response = await EventRoutes.getEvents();
            if(response && response.status === 200) {
                setEvents(response.data);
            }
        })();
        setRefreshing(false);
    },[run]);

    function refresh(){
        setRefreshing(true);
        setRun({...run});
    }


    return(<View style={styles.container}>

        <FlatList 
            keyExtractor={item => item.id}
            data={events}
            refreshing = {refreshing}
            onRefresh={refresh}
            renderItem={({item}) => (
                <EventLineItem {...item}/>
            )}
        />
        
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef',
        marginHorizontal:8,
    },
})