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


export const ApplyJob=async(jobid:number,base64file:string)=>{
    try{
    const response=await ApiClient.post("/Application/ApplyJob",
        {
        jobId: jobid,
        base64file
       });

    if(!response.data){
        throw new Error("The data has not been Stored");
    }

    return response.data;

    }
    catch(error){
        if(error instanceof Error){
            throw error;
        }
        else{
            throw new Error("Some Thing Went Wrong");
        }
    }

    
    
}
