import { View, StyleSheet, Text } from "react-native";
import Reservation from "../models/reservation";


export default function ReservationDetailsPage(props:{reservation:Reservation}) {

    const {reservation} = props;

    return(<View style={styles.container}>
        <Text>Reservation for: {reservation.owner}</Text>
        <Text>Room: {reservation.room}</Text>
        <Text>Check In Date: {new Date(reservation.checkIn).toDateString()}</Text>
        <Text>Check Out Date: {new Date(reservation.checkOut).toDateString()}</Text>
        <Text>Reservation ID: {reservation.id}</Text>
    </View>)
}

const styles = StyleSheet.create({
    container: {

    }
});