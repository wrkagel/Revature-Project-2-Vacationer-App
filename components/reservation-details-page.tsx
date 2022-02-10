import { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import ReservationContext from "../contexts/reservation-context";


export default function ReservationDetailsPage() {

    const reservation = useContext(ReservationContext);
    
    return(<View style={styles.container}>
        <Text style={styles.detailsText}>
            <Text style={styles.rowHead}>Reservation for: </Text>
            {reservation.owner}
        </Text>
        <Text style={styles.detailsText}>
            <Text style={styles.rowHead}>Room: </Text>
            {reservation.room}
        </Text>
        <Text style={styles.detailsText}>
            <Text style={styles.rowHead}>Check In Date: </Text>
            {new Date(reservation.checkIn).toDateString()}
        </Text>
        <Text style={styles.detailsText}>
            <Text style={styles.rowHead}>Check Out Date: </Text> 
            {new Date(reservation.checkOut).toDateString()}
        </Text>
        <Text style={styles.detailsText}>
            <Text style={styles.rowHead}>Reservation ID: </Text>
            {reservation.id}
        </Text>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center",
        marginLeft:"10%",
    },
    rowHead:{
        fontWeight:"bold",
        fontSize:16,
        marginLeft:"10%"
    },
    detailsText:{ 
        fontSize:18,        
    }
});