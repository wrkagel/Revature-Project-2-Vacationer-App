import { View, StyleSheet, FlatList, Text, Pressable } from "react-native";
import Event from "../models/event";




export default function EventsPage() {

    const events: Event[] = [
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
                <View>
                    <Pressable>
                        <Text>{item.title} {new Date(item.startTime).toDateString()}</Text>
                    </Pressable>
                    <View> 
                        <Text>{item.desc}</Text>
                        <Text>{item.endTime}</Text>
                        <Text>{item.location}</Text>
                        <Text>{item.status}</Text>
                    </View>
                   
                    
                </View>
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