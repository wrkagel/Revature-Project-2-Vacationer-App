import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ReservationContext from "../contexts/reservation-context";
import ServiceRequest from "../models/service-request";
import ServiceRequestRoutes from "../routes/service-request-routes";

export default function RequestListItem(props: {
    serviceRequests:ServiceRequest[],
    setServiceRequests:Function,
    request: ServiceRequest
}){

    const {serviceRequests, setServiceRequests, request} = props;
    const [cancel, setCancel] = useState<{}>();
    const reservation = useContext(ReservationContext);

    useEffect(() => {
        (async () => {
            const response = await ServiceRequestRoutes.getServiceRequest(request.id);
            if(response && response.status === 200) {
                request.status = response.data.status;
                switch(request.status) {
                    case 'Cancelled':
                    case 'Completed': {
                        const index = serviceRequests.findIndex(r => r.id === request.id);
                        serviceRequests.splice(index, 1);
                        break;
                    }
                }
                setServiceRequests([...serviceRequests]);
            }
        })();
    },[]);

    useEffect(() => {
        if(!cancel) return;
        (async () => {
            const response = await ServiceRequestRoutes.cancelServiceRequest(request.id);
            if(response && response.status === 200) {
                alert('Order successfully cancelled.');
                const index = serviceRequests.findIndex((r) => r.id === request.id);
                serviceRequests.splice(index, 1);
                setServiceRequests([...serviceRequests]);
            }
        })();
    }, [cancel])

    return (<View style={styles.listItemView}>
        <Text style={styles.listItemText} >{request.requestedOfferings.reduce((a, b) => a + b.desc + ' x ' + b.amount + "\n", "")}Status: {request.status} {"\n"}</Text>
        <Pressable style={styles.cancelButton} onPress={() => setCancel({...cancel})}>
            <Text style={styles.cancelText} >Cancel Order</Text>
        </Pressable>
    </View>)
}

const styles = StyleSheet.create({
    listItemView:{
        flex:1, 
        flexDirection:"row", 
        justifyContent:"space-between",
        marginHorizontal: 12,
        marginTop:12,
    },
    listItemText:{
        fontWeight:"bold",
        fontSize:16,
    },
    cancelButton:{
        backgroundColor:"rgba(215,0,0,0.7)",
        maxHeight:40,
        padding:3,
        margin:8,
    },
    cancelText:{
        fontSize:16,
        fontWeight:"bold",
        textAlign:"center",
        padding:5,
    },
})