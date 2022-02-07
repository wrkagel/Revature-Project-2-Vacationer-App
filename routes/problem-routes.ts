import axios, { AxiosResponse } from "axios";
import axiosErrorHandler from "../error-handlers/axios-error-handler";

export default class ProblemRoutes{

    private static address: string = "https://wk-revature-functions.azurewebsites.net/api"

    public static async postProblem(savedDesc:{category:string,desc:string}): Promise<AxiosResponse<string> | void>{
        return  axios.post<string>(`${this.address}/ProblemIngestion`, savedDesc)
            .then(response => response)
            .catch((error) => axiosErrorHandler(error));
}

}