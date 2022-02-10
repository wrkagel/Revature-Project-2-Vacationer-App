import AsyncStorageLib from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable
} from "react-native";
import ReservationRoutes from "../routes/reservation-routes";

export default function LoginPage(props: { setShowLogin: Function , setReservation: Function }) {
  const [inputId, setInputId] = useState("");
  const [submit, setSubmit] = useState<{}>();

  useEffect(() => {
    (async () => {
      const reservationId = await AsyncStorageLib.getItem("reservationId");
      if(!reservationId) {
        if (!submit) {
          return;
        }
        if(!inputId) {
          alert('Please enter a reservation ID.');
          return;
        }
      }
      const response = await ReservationRoutes.login(reservationId ?? inputId);
      if (response && response.status === 200) {
        props.setReservation(response.data);
        AsyncStorageLib.setItem("reservationId", response.data.id);
        props.setShowLogin(false);
      }
    })();
  }, [submit]);

  return (<View style={{flex:1}}>
    <View style={styles.headerView}>
      <Text style={styles.welcomeText}>Welcome to the Triple Threat Guest Experiences App</Text>
    </View>
    <View style={styles.containerStyle}>
      <Text style={styles.headerStyle}>Please enter your reservation ID</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="reservation ID"
        onChangeText={(value) => setInputId(value)}
      />
      <Pressable
        style={styles.buttonStyle}
        onPress={() => setSubmit({ ...submit })}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
    <View style={styles.botttomSpacing}></View>
  </View>);
}

const styles = StyleSheet.create({
  containerStyle: {
    flex:0.7,
    justifyContent:"center",
    alignItems:"center",
  },
  welcomeText:{
    fontSize: 30,
    fontWeight:"bold",
    textAlign:"center",
  },
  headerView:{
    flex: 0.15,
    alignItems: "center",
    justifyContent:"center",
  },
  headerStyle: {
    fontSize:24,
  },
  inputStyle: {
    fontSize:18,
    borderStyle:"solid",
    borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 10,
    minWidth: 200,
    textAlign: "center",
    marginTop: 10,
  },
  buttonStyle: {
    backgroundColor:"rgba(0, 125, 0, 0.5)",
    marginTop: 30,
    borderStyle:"solid",
    borderWidth:1,
  },
  buttonText:{
    fontSize:24,
    padding:5,
  },
  botttomSpacing: {
    flex: 0.15,
  }
});
