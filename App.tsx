import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, StatusBar, Button, View } from "react-native";
import EventsPage from "./components/events-page";
import LoginPage from "./components/login-page";
import ProblemsPage from "./components/problems-page";
import ReservationDetailsPage from "./components/reservation-details-page";
import RoomServicePage from "./components/room-service-page";
import ReservationContext from "./contexts/reservation-context";
import Reservation from "./models/reservation";
import { SimpleLineIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';



export default function App() {
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [reservation, setReservation] = useState<Reservation>({
    id:"",
    room:"",
    checkIn:0,
    checkOut:0,
    owner:""
  });

  const Tab = createBottomTabNavigator();

  return (
    <ReservationContext.Provider value={reservation}>
      {showLogin ? (
        <LoginPage setShowLogin={setShowLogin} setReservation={setReservation} />
      ) : (
        <NavigationContainer>
          <Tab.Navigator screenOptions={{
            headerRight: () => {
              return (<View style={styles.logoutButton}>
                <Button title="Logout" onPress={async () => {
                await AsyncStorageLib.clear();
                setShowLogin(true);
              }} />
              </View>)
            }
          }}>
            <Tab.Screen name="Reservation" component={ReservationDetailsPage} options={{tabBarIcon: ()=>{return <SimpleLineIcons name="calendar" size={24} color="black" />}}}/>
            <Tab.Screen name="Events" component={EventsPage} options={{tabBarIcon: ()=>{return <Ionicons name="calendar" size={24} color="black" />}}} />
            <Tab.Screen name="Room Service" component={RoomServicePage} options={{tabBarIcon: ()=>{return <Ionicons name="restaurant" size={24} color="black" />}}} />
            <Tab.Screen name="Report a Problem" component={ProblemsPage} options={{tabBarIcon: ()=>{return <MaterialIcons name="report-problem" size={24} color="black" />}}} />
          </Tab.Navigator>
        </NavigationContainer>
      )}

      <StatusBar />
      </ReservationContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dedede",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButton:{
    marginRight:10,
    flexDirection:"row",
    alignItems:"center"
  },
});
