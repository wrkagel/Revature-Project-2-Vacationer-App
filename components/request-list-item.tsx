import axios from "axios";
import { useEffect } from "react";
import { Text, View } from "react-native";
import ServiceRequest from "../models/service-request";

export default function RequestListItem(props: {
    serviceRequests:ServiceRequest[],
    setServiceRequests:Function,
    request: ServiceRequest
}){

    const {serviceRequests, setServiceRequests, request} = props;

    useEffect(() => {
        (async () => {
            const response = await axios.get<ServiceRequest>(`http://20.72.189.253:3000/servicerequests/${request.id}`, {
            })
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
            }
        })();
    },[]);

    return (<View>
        <Text>{request.requestedOfferings.reduce((a, b) => a + b.desc + ' * ' + b.amount + "\n", "")} status: {request.status}</Text>
    </View>)
}