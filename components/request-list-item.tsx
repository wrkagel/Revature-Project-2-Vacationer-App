import AsyncStorageLib from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import ReservationContext from "../contexts/reservation-context";
import ServiceRequest from "../models/service-request";

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
            const response = await axios.get<ServiceRequest>(`http://20.72.189.253:3000/servicerequests/${request.id}`)
            .then(response => response)
            .catch((error) => {
                let message = "";
                if(error instanceof Error) {
                    message += error.message;
                }
                if(error.response) {
                    message += "\n" + error.response.data;
                }
                alert(message);
            });
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
                await AsyncStorageLib.setItem(reservation.id, JSON.stringify(serviceRequests));
            }
        })();
    },[]);

    useEffect(() => {
        if(!cancel) return;
        (async () => {
            const response = await axios.patch(`http://20.72.189.253:3000/servicerequests/${request.id}`, {
                status: "Cancelled"
            })
            .then(response => response)
            .catch((error) => {
                let message = "";
                if (error instanceof Error) {
                  message += error.message;
                }
                if (error.response) {
                  message += error.response.data;
                }
                alert(message);
              });
              if(response && response.status === 200) {
                  alert('Order successfully cancelled.');
                  const index = serviceRequests.findIndex((r) => r.id === request.id);
                  serviceRequests.splice(index, 1);
                  setServiceRequests([...serviceRequests]);
                  await AsyncStorageLib.setItem(reservation.id, JSON.stringify(serviceRequests));
              }
        })()
    }, [cancel])

    return (<View style={{flex:1, flexDirection:"row", justifyContent:"space-between"}}>
        <Text>{request.requestedOfferings.reduce((a, b) => a + b.desc + ' * ' + b.amount + "\n", "")}status: {request.status}</Text>
        <Button title="Cancel Order" onPress={() => setCancel({...cancel})} />
    </View>)
}