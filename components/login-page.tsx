import AsyncStorageLib from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable
} from "react-native";
import Reservation from "../models/reservation";

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
      const response = await axios
        .get<Reservation>(
          `https://f165bdd7-5455-4849-8cd5-9572a4c22c52.mock.pstmn.io/reservations/${reservationId ?? inputId}`
        )
        .then((r) => r)
        .catch((error) => {
          let message = "";
          if(error.response) {
            message += error.response.data;
          }
          if(error.message) {
            message += `\n${error.message}`;
          }
          alert(message);
        });

      if (response && response.status === 200) {
        props.setReservation(response.data);
        props.setShowLogin(false);
        AsyncStorageLib.setItem("reservationId", response.data.id);
      }
    })();
  }, [submit]);

  return (
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
        <Text>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {},
  headerStyle: {},
  inputStyle: {},
  buttonStyle: {},
});
