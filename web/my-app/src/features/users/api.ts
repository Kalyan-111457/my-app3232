import { ApiClient } from "../../services/apiclient";
import type { UserRequestPayload } from "./types";

export const usersavedata = async (data: UserRequestPayload) => {
    try {
        const response = await ApiClient.post("/users/CreateUser", data);
        return response.data;
    }
    catch (error: unknown) {
        if(error  instanceof Error){
            console.log(error);
            throw error;
        }
        else{
            alert("Something went Wrong");
        }
    }
}