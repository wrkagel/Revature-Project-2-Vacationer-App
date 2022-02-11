import { StyleSheet, View, Text, TextInput, Pressable, Button, Image } from "react-native";
import {Picker} from '@react-native-picker/picker'
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import ProblemRoutes from "../routes/problem-routes";


export default function ProblemsPage() {

    const [type, setType] = useState<string>("");

    const [image, setImage] = useState<string | null>(null);

    const [desc, setDesc] = useState<string>("");

    const [submit, setSubmit] = useState<{}>()

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

      useEffect(()=> {
        if(!submit)return;
        (async () => {
            const savedDesc = {category:type,desc}
            const response = await ProblemRoutes.postProblem(savedDesc);
            if(response){
                alert(response.data)
            }else{
                alert("error occured while contacting server")
            }
        })();

        },[submit])

    return (<View style={styles.container}>
        <View style={{flex:0.2, flexDirection:'row'}}>
            <View style={{flex:1}}>
                <Text style={styles.issueLabel}>
                    Choose Issue Type
                </Text>
            </View>
            <View style={{flex:1 ,backgroundColor:"#ffffff", justifyContent:"flex-start"}}>
                <Picker style={{flex:1}}
                    selectedValue={type}
                    onValueChange={(itemValue) => setType(itemValue)}
                >
                    <Picker.Item style={styles.pickerItem} label="Housekeeping" value={"Housekeeping"}/>
                    <Picker.Item style={styles.pickerItem} label="Maintenance" value={"Maintenance"} />
                    <Picker.Item style={styles.pickerItem} label="Room Service" value={"Room Service"} />
                    <Picker.Item style={styles.pickerItem} label="Events" value={"Events"} />
                </Picker>
            </View>
        </View>
        <View style={{flex:0.5}}>
            <TextInput onChangeText={(value)=> setDesc(value)} style={styles.textInput} multiline 
            placeholder={"Write a description of the problem here and please include location/room number"}/>
        </View>
        <View style={styles.addPhotoView}>
            <Button title="Add a Photo" onPress={pickImage} />
        </View>
        <Pressable onPress={()=>setSubmit({...submit})} style={styles.pressable}>
            <Text style={styles.pressableText}>Submit Problem</Text>
        </Pressable>
        {image && <Image source={{ uri: image }} style={{width:200, height: 200 }} />}
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
    },
    pressableText:{
        textAlign:"center",
        fontSize:24,
        fontWeight:"bold",
    },
    pressable:{
        flex:0.1,
        backgroundColor:"#e0a020",
        justifyContent:"center"
    },
    issueLabel:{
        flex: 1, 
        textAlignVertical:"center",
        textAlign:"center", 
        fontSize:20, 
        padding:10, 
        backgroundColor:"#fff"
    },
    textInput:{
        flex:1,
        fontSize:20,
        padding:15,
    },
    addPhotoView:{
        flex:0.2,
        justifyContent:"flex-start",
        marginHorizontal: "20%",
    }

})