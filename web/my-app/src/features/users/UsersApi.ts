import { ApiClient } from "../../services/apiclient";
import type { Alljobs } from "./UsersModel";


export const AllJobsForUser=async():Promise<Alljobs[]>=>{
    try{
        const response=await ApiClient.get("/jobs/listjobs");
        if(!response.data){
            throw new Error("We are getting error from the data");
        }
        return response.data;

    }
    catch(error){
        if(error instanceof Error){
            console.log(error.message);
        }
        else{
            alert("Something Went Wrong from the Api Side");
        }
        return [];
    }
}