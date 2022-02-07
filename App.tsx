import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, StatusBar, Button } from "react-native";
import EventsPage from "./components/events-page";
import LoginPage from "./components/login-page";
import ProblemsPage from "./components/problems-page";
import ReservationDetailsPage from "./components/reservation-details-page";
import RoomServicePage from "./components/room-service-page";
import ReservationContext from "./contexts/reservation-context";
import Reservation from "./models/reservation";



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
              return <Button title="Logout" onPress={async () => {
                await AsyncStorageLib.clear();
                setShowLogin(true);
              }} />
            }
          }}>
            <Tab.Screen name="Reservation" component={ReservationDetailsPage}/>
            <Tab.Screen name="Events" component={EventsPage} />
            <Tab.Screen name="Room Service" component={RoomServicePage} />
            <Tab.Screen name="Report a Problem" component={ProblemsPage} />
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
});
