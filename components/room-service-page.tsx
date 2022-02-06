import AsyncStorageLib from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import ReservationContext from "../contexts/reservation-context";
import MenuItem from "../models/menu-item";
import ServiceRequest from "../models/service-request";
import OrderSubmitForm from "./order-submit-form";
import ServiceRequestsList from "./service-requests-list";

export default function RoomServicePage() {
  const [cart, setCart] = useState<{ item: MenuItem; amount: number }[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showSubmit, setShowSubmit] = useState<boolean>(false);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [showServiceRequests, setShowServiceRequests] = useState<boolean>(false);
  const reservation = useContext(ReservationContext);

  useEffect(() => {
    (async () => {
      const response = await axios
        .get<MenuItem[]>("http://20.72.189.253:3000/offerings")
        .then((response) => response)
        .catch((error) => {
          let message = "";
          if (error instanceof Error) {
            message += error.message;
          }
          if (error.response) {
            message += "\n" + error.response.data;
          }
          alert(message);
        });
      if (response && response.status == 200) {
        const newMenu: MenuItem[] = response.data;
        setMenu(newMenu);
        setCart(newMenu.map((item) => ({ item, amount: 0 })));
        setShowCart(true);
      }
      const storedRequests = await AsyncStorageLib.getItem(reservation.id);
      if(storedRequests) {
        setServiceRequests(JSON.parse(storedRequests));
      }
    })();
  }, []);

  function increaseAmount(item: MenuItem, index: number) {
    cart[index].amount++;
    setCart([...cart]);
  }

  function decreaseAmount(item: MenuItem, index: number) {
    if (cart[index].amount >= 1) {
      cart[index].amount--;
      setCart([...cart]);
    }
  }

  function checkOut() {
    let allZero = true;
    for (const cItem of cart) {
      if (cItem.amount > 0) {
        allZero = false;
        break;
      }
    }
    if (allZero) {
      alert("You must order at least 1 item.");
      return;
    }
    setShowSubmit(true);
  }
  function orders() {
    setShowServiceRequests(true);
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 0.8 }}
        keyExtractor={(item) => item.desc}
        data={menu}
        renderItem={({ item, index }) => {
          return (
            <>
              <View style={styles.menuItem}>
                <Text>{item.desc}</Text>
                <Text>${item.cost.toFixed(2)}</Text>
              </View>
              <View style={[styles.menuItem, styles.amountContainer]}>
                <Pressable
                  style={styles.amountItem}
                  onPress={() => decreaseAmount(item, index)}
                >
                  <Text style={styles.amountTextItem}>-</Text>
                </Pressable>
                {showCart && (
                  <Text style={[styles.amountItem, styles.amountTextItem]}>
                    {cart[index].amount}
                  </Text>
                )}
                <Pressable
                  style={styles.amountItem}
                  onPress={() => increaseAmount(item, index)}
                >
                  <Text style={styles.amountTextItem}>+</Text>
                </Pressable>
              </View>
            </>
          );
        }}
      />

      <Pressable style={{ flex: 0.1 }} onPress={() => setShowServiceRequests(true)}>
        <Text style={styles.amountTextItem}>Orders</Text>
      </Pressable>
      <Pressable style={{ flex: 0.1 }} onPress={() => checkOut()}>
        <Text style={styles.amountTextItem}>Check Out</Text>
      </Pressable>
      {showServiceRequests && (
        <ServiceRequestsList
          setShowServiceRequests={setShowServiceRequests}
          serviceRequests={serviceRequests}
          setServiceRequests={setServiceRequests}
        />
      )}
      {showSubmit && (
        <OrderSubmitForm 
          setShowSubmit={setShowSubmit} 
          cart={cart} 
          serviceRequests={serviceRequests} 
          setServiceRequests={setServiceRequests}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  amountContainer: {
    justifyContent: undefined,
  },
  amountItem: {
    flex: 1,
    backgroundColor: "#0055f5",
    borderStyle: "solid",
    borderWidth: 2,
    alignSelf: "center",
  },
  amountTextItem: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    justifyContent: "center",
  },
});
