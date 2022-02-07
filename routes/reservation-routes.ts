import axios, { AxiosResponse } from "axios";
import axiosErrorHandler from "../error-handlers/axios-error-handler";
import Reservation from "../models/reservation";


export default class ReservationRoutes {

    private static address:string = "https://f165bdd7-5455-4849-8cd5-9572a4c22c52.mock.pstmn.io";

    public static async login(id:string): Promise<AxiosResponse<Reservation> | void> {
        return axios
        .get<Reservation>(
          `${this.address}/reservations/${id}`
        )
        .then((r) => r)
        .catch((error) => axiosErrorHandler(error))
    };
}