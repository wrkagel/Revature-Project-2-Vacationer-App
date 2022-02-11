import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import ReservationContext from "../contexts/reservation-context";
import MenuItem from "../models/menu-item";
import ServiceRequest from "../models/service-request";
import ServiceRequestRoutes from "../routes/service-request-routes";
import OrderSubmitForm from "./order-submit-form";
import ServiceRequestsList from "./service-requests-list";
import { Fontisto, Feather, AntDesign } from '@expo/vector-icons';

export default function RoomServicePage() {
  const [cart, setCart] = useState<{ item: MenuItem; amount: number }[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showSubmit, setShowSubmit] = useState<boolean>(false);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [showServiceRequests, setShowServiceRequests] = useState<boolean>(false);
  const reservation = useContext(ReservationContext);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [run, setRun] = useState<{}>();
  

  useEffect(() => {
    (async () => {
      const response = await ServiceRequestRoutes.getOfferings();
      if (response && response.status == 200) {
        const newMenu: MenuItem[] = response.data;
        setMenu(newMenu);
        setCart(newMenu.map((item) => ({ item, amount: 0 })));
        setShowCart(true);
      }
      const storedRequestsResponse = await ServiceRequestRoutes.getServiceRequestsByRoom(reservation.room);
      if(storedRequestsResponse && storedRequestsResponse.status === 200) {
        setServiceRequests(storedRequestsResponse.data);
      }
    })();
    setRefreshing(false);
  }, [run]);

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

  function refresh(){
    setRefreshing(true)
    setRun({...run})
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 0.8 }}
        keyExtractor={(item) => item.desc}
        data={menu}
        refreshing={refreshing}
        onRefresh={refresh}
        renderItem={({ item, index }) => {
          return (
            <>
              <View style={styles.menuItem}>
                <Text style={styles.menuItemText}>{item.desc}</Text>
                <Text style={styles.menuItemText}>${item.cost.toFixed(2)}</Text>
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
        <Text style={styles.amountTextItem}>Orders  <Feather name="list" size={24} color="black" /></Text>
      </Pressable>
      <Pressable style={{ flex: 0.1 }} onPress={() => checkOut()}>
        <Text style={styles.amountTextItem}>Check Out  <AntDesign name="shoppingcart" size={24} color="black" /></Text>
      </Pressable>
      {showServiceRequests && (
        <ServiceRequestsList
          setShowServiceRequests={setShowServiceRequests}
          serviceRequests={serviceRequests}
          setServiceRequests={setServiceRequests}
          refresh={refresh}
          refreshing={refreshing}
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
    padding:10,
  },
  menuItemText: {
    fontSize: 18,
    fontWeight:"bold",
  },
  amountContainer: {
    justifyContent: undefined,
  },
  amountItem: {
    flex: 1,
    backgroundColor: "#0055f5aa",
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
