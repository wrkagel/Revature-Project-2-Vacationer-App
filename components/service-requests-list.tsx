import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import ServiceRequest from "../models/service-request";

export default function ServiceRequestsList(props: {
  serviceRequests: ServiceRequest[],
  setShowServiceRequests: Function
  
}) {




  return (
    <View>
      <FlatList data={props.serviceRequests} keyExtractor={(item)=> item.id}  
      renderItem={({item})=> {return (
          <View>
              

          </View>
          
      )}
    
    
    
    }   />
      
      
      <Pressable onPress={()=>props.setShowServiceRequests(false)}>
          <Text>Close</Text>
      </Pressable>
    </View>
  );
}
