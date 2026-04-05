import { JobRepository } from "../Repository/JobRepository";
import { JobModels } from "../models/JobModel";

export class JobService{
    private data:JobRepository;
    constructor(){
        this.data=new JobRepository();
    }

    async listjobs(){
        return await this.data.listjobs();
    }


    async CreateJob(data:JobModels){
        if(!data.company || !data.description || !data.location || !data.salary || !data.title || !data.userId){
            throw new Error("Please check Once Company ,location,salary,descrption,title,userid")
        }
      return  await this.data.CreateJob(data);
    }


    async deletejob(id:number){
        if(id<=0){
            throw new Error("id is not be less than Zero");
        }
        return await this.data.deleteJob(id);
    }

    async getsinglejob(id:number){
        if(id<=0){
            throw new Error("id is not be less than zero");
        }
        return await this.data.getsingleJob(id);
    }
}
