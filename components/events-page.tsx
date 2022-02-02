import { View, StyleSheet, FlatList, Text, Pressable } from "react-native";
import Activity from "../models/activity";
import EventLineItem from "./event-line-item";




export default function EventsPage() {

    const events: Activity[] = [
        {id:"101",
        title: "dummy",
        desc: "not calling you a dummy though",
        startTime: 0,
        endTime: 1,
        location: "pool deck",
        status: "On Schedule"
        },

        {id:"102",
        title: "doubledummy",
        desc: "not calling you a dummy though",
        startTime: 0,
        endTime: 1,
        location: "pool deck",
        status: "On Schedule"
        },
        
    ]


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
        backgroundColor: "#ffffff"
    },
    itemContainer: {
        flex:1,
        flexDirection: "column",
    }
})