import { JsonController,Get,Post,Delete,Body,Param, HttpCode } from "routing-controllers";
import { JobModels } from "../models/JobModel";
import { JobService } from "../Service/JobService";


@JsonController("/jobs")
export class JobController{
    private data1=new JobService();

    @Get("/listJobs")
    @HttpCode(200)
    public async listofjobs(){
        return await this.data1.listjobs();
    }

    @Post("/upsert")
    @HttpCode(200)
    public async CreateJOb(@Body() data:JobModels){
        return await this.data1.CreateJob(data);
    }

    @Delete("/deleteJob/:id")
    @HttpCode(200)
    public async DeleteJob(@Param("id") id:number){
        return await this.data1.deletejob(Number(id));
    }

    @Get("/GetSingleJob/:id")
    @HttpCode(200)
    public async GetSingleJob(@Param("id") id:number){
        return await this.data1.getsinglejob(Number(id));
    }
}
