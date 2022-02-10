import { useContext, useEffect, useRef, useState } from "react";
import { Animated, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import ReservationContext from "../contexts/reservation-context";
import MenuItem from "../models/menu-item";
import ServiceRequest from "../models/service-request";
import ServiceRequestRoutes from "../routes/service-request-routes";

export default function OrderSubmitForm(props: {
  cart: { item: MenuItem; amount: number }[];
  setShowSubmit: Function;
  setServiceRequests: Function;
  serviceRequests: ServiceRequest[];
}) {
  const [submit, setSubmit] = useState<{}>();

  const formAnimation = useRef(new Animated.Value(0)).current;

  const reservation = useContext(ReservationContext);

  const { cart } = props;

  function slideUp() {
    Animated.timing(formAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  useEffect(() => {
    slideUp();
  }, []);

  useEffect(() => {
    if (!submit) return;
    (async () => {
      const requestedOfferings: { desc: string; amount: number }[] = [];
      cart.forEach((cItem) => {
        if (cItem.amount > 0) {
          const { desc } = cItem.item;
          const { amount } = cItem;
          requestedOfferings.push({ desc, amount });
        }
      });
      const response = await ServiceRequestRoutes.submitServiceRequest(requestedOfferings, reservation.room);
      if (response && response.status === 201) {
        props.serviceRequests.push(response.data);
        props.setServiceRequests([...props.serviceRequests]);
        alert("Order successfully submitted");
      }
      props.setShowSubmit(false);
    })();
  }, [submit]);

  function cancelSubmit() {
    props.setShowSubmit(false);
  }

  return (
    <Animated.View
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: "#efefef",
        transform: [{ scale: formAnimation }],
      }}
    >
      <FlatList
        data={cart}
        keyExtractor={(item) => item.item.desc}
        renderItem={({ item }) => {
          return (
            <>
              {Boolean(item.amount) && (
                <View
                  style={styles.orderDetailsView}
                >
                  <Text style={styles.orderDetailsText}>{item.item.desc} </Text>
                  <Text style={styles.orderDetailsText}>
                    {item.item.cost.toFixed(2)} x {item.amount} = $
                    {(item.item.cost * item.amount).toFixed(2)}
                  </Text>
                </View>
              )}
            </>
          );
        }}
      />
      <Text style={styles.totalText}>
        Total = $
        {cart.reduce((a, b) => a + b.item.cost * b.amount, 0).toFixed(2)}
      </Text>
      <View
        style={styles.buttonView}
      >
        <Pressable style={styles.cancelButton} onPress={cancelSubmit}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
        <Pressable style={styles.submitButton} onPress={() => setSubmit({ ...submit })}>
          <Text style={styles.buttonText}>Place Order</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  orderDetailsView:{
    flex: 1,
    flexDirection: "row",
    margin: 12,
    justifyContent: "space-between", 
  },
  orderDetailsText:{
    fontSize:18,
    fontWeight:"700"
  },
  totalText:{
    fontSize:24,
    color: "#448844",
    fontWeight:"bold",
    textAlign:"center",
  },
  submitButton:{
    backgroundColor:"#99c966",
  },
  cancelButton:{
    backgroundColor:"rgba(215,0,0,0.7)"
  },
  buttonView:{
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    margin: 12,
    marginBottom:25,
  },
  buttonText:{
    textAlign:"center",
    textAlignVertical:"auto",
    fontWeight:"bold",
    fontSize:16,
    padding:10,
  },
});