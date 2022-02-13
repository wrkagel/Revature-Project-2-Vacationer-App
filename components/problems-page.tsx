import { StyleSheet, View, Text, TextInput, Pressable, Button, Image, Dimensions } from "react-native";
import {Picker} from '@react-native-picker/picker'
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import ProblemRoutes from "../routes/problem-routes";


export default function ProblemsPage() {

    const [type, setType] = useState<string>("");

    const [image, setImage] = useState<{uri:string, height:number, width:number, shrunkHeight:number, shrunkWidth:number} | null>(null);

    const [desc, setDesc] = useState<string>("");

    const [submit, setSubmit] = useState<{}>();

    const [expandedImage, setExpandedImage] = useState<boolean>(false);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });
        console.log(result);
        if (!result.cancelled) {
            let {height:shrunkHeight, width:shrunkWidth} = result;
            const {width:screenWidth, height:screenHeight} = Dimensions.get('screen');
            while(result.height > screenHeight || result.width > screenWidth) {
                result.height *= 0.95;
                result.width *= 0.95;
            }
            while(shrunkHeight > screenHeight * 0.25 || shrunkWidth > screenWidth * 0.25) {
                shrunkHeight *= 0.95;
                shrunkWidth *= 0.95;
            }
          setImage({uri:result.uri, height:result.height, width:result.width, shrunkHeight, shrunkWidth});
        } else {
            setImage(null);
        }
    };

    useEffect(()=> {
        if(!submit)return;
        (async () => {
            const savedDesc = {category:type,desc, photoLink:""}
            if(image) {
                const urlResponse = await ProblemRoutes.postPhoto(image);
                if(urlResponse) {
                    const url = await urlResponse.text();
                    savedDesc.photoLink = url;
                }
            }
            const response = await ProblemRoutes.postProblem(savedDesc);
            if(response){
                alert(response.data)
            }else{
                alert("error occurred while contacting server")
            }
        })();

    },[submit]);

    return (<View style={styles.container}>
        <View style={{flex:0.1, flexDirection:'row'}}>
            <View style={{flex:1}}>
                <Text style={styles.issueLabel}>
                    Choose Issue Type
                </Text>
            </View>
            <View style={{flex:1 ,backgroundColor:"#ffffff", justifyContent:"flex-start", overflow:"hidden"}}>
                <Picker style={{flex:1, backgroundColor:"#ffffff"}}
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
        <View style={{flex:0.6}}>
            <TextInput onChangeText={(value)=> setDesc(value)} style={styles.textInput} multiline 
            placeholder={"Write a description of the problem here and please include location/room number"}/>
        </View>
        <View style={[styles.addPhotoView, {opacity: (expandedImage ? 0 : 1)}]}>
            <Button title="Add a Photo" onPress={pickImage} />
        </View>
        {image && <Pressable style={
            {
                position: (expandedImage ? "absolute" : "relative")
            }} onPress={() => {
            setExpandedImage(!expandedImage);
        }}>
            <Image source={{ uri: image.uri}} 
            style={
                {width: (expandedImage ? image.width : image.shrunkWidth), 
                height: (expandedImage ? image.height : image.shrunkHeight),
                alignSelf:"center", margin:10}} />
        </Pressable>}
        <Pressable onPress={()=>setSubmit({...submit})} style={styles.pressable}>
            <Text style={styles.pressableText}>Submit Problem</Text>
        </Pressable>
    </View>)
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#dedede',
        justifyContent: "center",
        alignItems: "center"
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
        justifyContent:"center",
        width:"100%"
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
        flex:0.1,
        justifyContent:"flex-start",
        margin:10
    }

})