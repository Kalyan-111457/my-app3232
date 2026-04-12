import { ApiClient } from "../../services/apiclient";
import type { UserRequestPayload, UsersData } from "./types";
import type{ JobResponsePayload } from "./type";


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

export const ApplicationsBasedOnJobId=async(id:number):Promise<JobResponsePayload>=>{
    try{
        const response=await ApiClient.get<JobResponsePayload>(`/Application/GetApplicationByJobId/${id}`);
        if(response.data){
            return response.data;
        }
        else{
            throw new Error("We are getting Error from the Api");
        }
    }
    catch(error){
        if(error instanceof Error){
            console.error(error.message);
            throw error;
        }
        else{
            alert("SomeThing Went Wrong");
            throw new Error("SomeThing Went Wrong");
        }
    }
}


export const handleAiEndpoint=async(jobid:number)=>{
    try{
        const response=await ApiClient.post(`/Application/Analyse/${jobid}`);
        if(response.data){
            return response;
        }
        else{
            throw new Error("Something went Wrong from the Api");
        }
    }catch(error){
        if(error instanceof Error){
            throw new Error("We are getting the Error");
        }
        else{
            throw new Error("SomeThing wnet Wrong");
        }
    }
}

export const handledeleteApplication=async(id:number)=>{
    try{
        const response=await ApiClient.post(`/Application/deleteApplication/${id}`)
        if(response.data){
            return response;
        }
        else{
            throw new Error("We are getting the Error from the Endpoint");
        }
    }
    catch(error){
        if(error instanceof Error){

            alert(error.message);
        }
        else{
            alert("Something went Wrong");
        }
    }
}
