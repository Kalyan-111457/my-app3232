import { ApiClient } from "../../services/apiclient";
import type { UserRequestPayload, UsersData } from "./types";

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


export const AllUserData=async():Promise<UsersData[]>=>{
    try{
        const response=await ApiClient.get<UsersData[]>("/users/");
        return response.data;
    }
    catch(error:unknown){
        if(error instanceof Error){
            console.error(error);
        }
        else{
            alert("Some-Thing Went Wrong");
        
        }
        return [];
    }
}

export const deleteUsers=async(id:number)=>{
    try{
        const response = await ApiClient.delete(`/users/${id}`);
        return response.data;
    }
    catch(error:unknown){
        if(error instanceof Error){
            console.error(error);
            throw error;
        }
        else{
            alert(`Some Thing Went Wrong`);
        }
    }


}




