import { ApiClient } from "../../services/apiclient";
import type { JobApply } from "./type";

export const CreateJob=async(body:JobApply)=>{
    try{
        const response=await ApiClient.post("/jobs/upsert",body);
        return response.data;
    }
    catch(error:unknown){
        if(error instanceof Error){
            console.error(error);
            throw error;
        }
        else{
            alert("SomeThing Went Wrong");
        }
    }
}

export const AllJob=async():Promise<JobApply[]>=>{
    try{
        const response=await ApiClient.get("/jobs/listJobs");
        return response.data;
    }
    catch(error){
        if(error instanceof Error){
            console.log(error.message);
        }
        else{
            alert("Some Thing Went Wrong");
        }
        return [];
    }
}


export const deleteJob=async(id:number)=>{
    try{
        const deletejobs=await ApiClient.delete(`/jobs/deleteJob/${id}`);
        return deletejobs.data;
    }
    catch(error){
        if(error instanceof Error){
            console.error(error.message);
            throw error;
        }
        else{
            alert("We are Missing SomeThing");
        }        
    }
}


