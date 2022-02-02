import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import {Picker} from '@react-native-picker/picker'
import { useState } from "react";


export default function ProblemsPage() {

    const [type, setType] = useState<string>("");

    return (<View style={styles.container}>
        <View style={{flex:0.2, flexDirection:'row'}}>
            <View style={{flex:1}}>
                <Text style={{flex: 1, textAlignVertical:"center", textAlign:"center", fontSize:20, padding:10, backgroundColor:"#fff"}}>
                    Choose Issue Type
                </Text>
            </View>
            <View style={{flex:1 ,backgroundColor:"#ffffff", justifyContent:"flex-start"}}>
                <Picker style={{flex:1}}
                    selectedValue={type}
                    onValueChange={(itemValue, itemIndex) => setType(itemValue)}
                >
                    <Picker.Item style={styles.pickerItem} label="Housekeeping" value={"Housekeeping"}/>
                    <Picker.Item style={styles.pickerItem} label="Maintenance" value={"Maintenance"} />
                    <Picker.Item style={styles.pickerItem} label="Room Service" value={"Room Service"} />
                    <Picker.Item style={styles.pickerItem} label="Events" value={"Events"} />
                </Picker>
            </View>
        </View>
        <View style={{flex:0.7}}>
            <TextInput style={{fontSize:20}} multiline={true} placeholder="Write a description of the problem here"/>
        </View>
        <Pressable style={{flex:0.1}}>
            <Text style={styles.pickerItem}>Submit Problem</Text>
        </Pressable>
    </View>)
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#dedede'
    },
    pickerItem: {
        fontSize:20,
        textAlign:"center",
        textAlignVertical:"center"
    }
})