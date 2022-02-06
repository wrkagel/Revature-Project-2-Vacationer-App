import { createContext } from "react";

const ReservationContext = createContext({
    id:"",
    room:"",
    checkIn:0,
    checkOut:0,
    owner:""
  });

export default ReservationContext;