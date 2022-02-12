import axios, { AxiosResponse } from "axios";
import axiosErrorHandler from "../error-handlers/axios-error-handler";
import 'react-native-get-random-values';
import {v4} from 'uuid';
import FormData from 'form-data';

export default class ProblemRoutes{

    private static address: string = "https://wk-revature-functions.azurewebsites.net/api"

    public static async postPhoto(image:{uri:string}) {
        const id = v4();
        const index = image.uri.lastIndexOf('.');
        const ext = image.uri.substring(index + 1);
        const fd = new FormData();
        fd.append('file', {
            name:id,
            type:`image/${ext}`,
            uri:image.uri
        })
        return fetch(`${this.address}/upload-problem-with-photo?id=${id}&ext=${ext}`, {
            method:"POST",
            //@ts-ignore
            body:fd
        })
        .then(response => response)
        .catch((error) => axiosErrorHandler(error));
    }

    public static async postProblem(savedDesc:{category:string,desc:string, photoLink:string}): Promise<AxiosResponse<string> | void>{
        return  axios.post<string>(`${this.address}/ProblemIngestion`, savedDesc)
            .then(response => response)
            .catch((error) => axiosErrorHandler(error));
    }

}