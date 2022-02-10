import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
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
    <View style={styles.page}>
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
          <Text style={styles.closeText}>Close</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page:{
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "#efefef"
  },
  closeText:{
    fontSize: 30,
    fontWeight:"bold",
    textAlign:"center",
    padding:10,
    backgroundColor:"rgba(210,0,0,.6)"
  },
})
