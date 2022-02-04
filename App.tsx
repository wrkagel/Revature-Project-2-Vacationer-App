import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, StatusBar } from "react-native";
import EventsPage from "./components/events-page";
import LoginPage from "./components/login-page";
import ProblemsPage from "./components/problems-page";
import ReservationDetailsPage from "./components/reservation-details-page";
import RoomServicePage from "./components/room-service-page";
import Reservation from "./models/reservation";

export default function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [reservation, setReservation] = useState<Reservation>({
    id:"",
    room:"",
    checkIn:0,
    checkOut:0,
    owner:""
  });

  const Tab = createBottomTabNavigator();

  return (
    <>
      {showLogin ? (
        <LoginPage setShowLogin={setShowLogin} setReservation={setReservation} />
      ) : (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Reservation" >
              {(props) => <ReservationDetailsPage {...props} reservation={reservation} />}
            </Tab.Screen>
            <Tab.Screen name="Events" component={EventsPage} />
            <Tab.Screen name="Room Service" component={RoomServicePage} />
            <Tab.Screen name="Report a Problem" component={ProblemsPage} />
          </Tab.Navigator>
        </NavigationContainer>
      )}

      <StatusBar />
    </>
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
