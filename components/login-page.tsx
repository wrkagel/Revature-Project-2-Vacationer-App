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
