import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import ServiceRequest from "../models/service-request";
import RequestListItem from "./request-list-item";

export default function ServiceRequestsList(props: {
  serviceRequests: ServiceRequest[],
  setServiceRequests: Function,
  setShowServiceRequests: Function,
  refresh: ()=> void,
  refreshing: boolean
}) {


  return (
    <View style={{
      position: "absolute",
      height: "100%",
      width: "100%",
      backgroundColor: "#efefef"
    }}>
      <FlatList 
      data={props.serviceRequests} 
      keyExtractor={(item)=> item.id}
      refreshing={props.refreshing}
      onRefresh={props.refresh}
      renderItem={({item})=> {return (
        <RequestListItem 
          serviceRequests={props.serviceRequests} 
          setServiceRequests={props.setServiceRequests}
          request={item}
        />
      )}}/>      
      <Pressable onPress={()=>props.setShowServiceRequests(false)}>
          <Text>Close</Text>
      </Pressable>
    </View>
  );
}
