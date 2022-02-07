import axios, { AxiosResponse } from "axios";
import axiosErrorHandler from "../error-handlers/axios-error-handler";
import Activity from "../models/activity";
import MenuItem from "../models/menu-item";
import ServiceRequest from "../models/service-request";


export default class ServiceRequestRoutes {

  private static address:string = "http://20.72.189.253:3000";

  public static async getOfferings(): Promise<AxiosResponse<MenuItem[]> | void> {
    return axios
    .get<MenuItem[]>(`${this.address}/offerings`)
    .then((response) => response)
    .catch((error) => axiosErrorHandler(error));
  }

  public static async getServiceRequest(id:string): Promise<AxiosResponse<ServiceRequest> | void> {
    return axios.get<ServiceRequest>(`${this.address}/servicerequests/${id}`)
    .then(response => response)
    .catch((error) => axiosErrorHandler(error));
  }

  public static async cancelServiceRequest(id:string): Promise<AxiosResponse<ServiceRequest> | void> {
    return axios.patch(`${this.address}/servicerequests/${id}`, {
        status: "Cancelled"
    })
    .then(response => response)
    .catch((error) => axiosErrorHandler(error));
  }

  public static async submitServiceRequest(requestedOfferings: { desc: string; amount: number }[], room:string)
    : Promise<AxiosResponse<ServiceRequest> | void> {
    return axios
    .post<ServiceRequest>(`${this.address}/servicerequests`, {
        room,
        requestedOfferings
    })
    .then((response) => response)
    .catch((error) => axiosErrorHandler(error));
  }

  public static async getServiceRequestsByRoom(room:string): Promise<AxiosResponse<ServiceRequest[]> | void> {
    return axios.get<ServiceRequest[]>(`https://wk-revature-functions.azurewebsites.net/api/get-service-requests-by-room?room=${room}`)
    .then(response => response)
    .catch((error) => axiosErrorHandler(error));
  }

}