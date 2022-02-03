import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import Reservation from "../models/reservation";

export default function LoginPage(props: { setShowLogin: Function }) {
  const [inputId, setInputId] = useState("");
  const [submit, setSubmit] = useState<{}>();

  useEffect(() => {
    if (!submit) {
      return;
    }

    (async () => {
      const response = await axios
        .get<Reservation>(
          `https://f165bdd7-5455-4849-8cd5-9572a4c22c52.mock.pstmn.io/reservations/${inputId}`
        )
        .then((r) => r)
        .catch((error) => alert(error.message));

      if (response && response.status === 200) {
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
