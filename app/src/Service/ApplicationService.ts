import { ApplicationRepository } from "../Repository/ApplicationRepository";

export class ApplicationService{
    private data:ApplicationRepository;

    constructor(){
        this.data=new ApplicationRepository();
    }

    async ApplyJob(userid:number,jobid:number,resumeurl:string){
        if(jobid<=0 || userid<=0 || !resumeurl){
            throw new Error("Please Check Once");
        }
        return await this.data.ApplyJob(userid,jobid,resumeurl);
    }

    async UpdateApplication(id:number,status:string){
        if(id<=0){
            throw new Error("The is is not be less than Zero");
        }

        if(!status){
            throw new Error("The status is not be Empty")
        }
        return await this.data.UpdateStatus(Number(id),status);
    }


    async deleteApplication(id:number){
        if(id<=0){
            throw new Error("The id is not be less than Zero");
        }
        return await this.data.deleteApplication(id);
    }

    async getApplicationById(id:number){
        if(id<=0){
            throw new Error("the id is not be less than Zero");
        }
        return await this.data.getApplicationByid(Number(id));
    }

    async getApplicationByUserId(id:number){
        if(id<=0){
            throw new Error("The id is not be less than Zero")
        }
        return await this.data.getApplicationsByuserId(Number(id));
    }

    async getApplicationByJobId(id:number){
        if(id<=0){
            throw new Error("The id is not be less than Zero");
        }
        return await this.data.getApplicationByJobid(Number(id))
    }

    async getApploicationByUserIdandJobId(userid:number,jobid:number){
        if(userid<=0 || jobid<=0){
            throw new Error("These cannot be less than Zero");
        }
        return await this.data.getApplicationBasedonUserIdandJobId(userid,jobid);
    }

    async AnalyseByAiService(jobid:number){
        return this.data.AiRepositoryForAiModels(jobid);
    }
}
