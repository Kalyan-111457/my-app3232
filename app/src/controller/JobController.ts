import { JsonController,Get,Post,Delete,Body,Param, HttpCode, UseBefore, Req } from "routing-controllers";
import { JobModels } from "../models/JobModel";
import { JobService } from "../Service/JobService";
import { AuthMiddleWare } from "../utils/AuthMiddleWare";
import { Request } from "express";
import { JWTPAYLOAD } from "../utils/JwtModel";

type AuthenticatedRequest = Request & {
    user?: JWTPAYLOAD;
};

@JsonController("/jobs")
export class JobController{
    private data1=new JobService();

    @Get("/listJobs")
    @UseBefore(AuthMiddleWare)
    @HttpCode(200)
    public async listofjobs(){
        return await this.data1.listjobs();
    }

    @Post("/upsert")
    @UseBefore(AuthMiddleWare)
    
    @HttpCode(200)
    public async CreateJOb(@Body() data:JobModels, @Req() request: AuthenticatedRequest){
        data.userId = request.user?.id;
        return await this.data1.CreateJob(data);
    }

    @Delete("/deleteJob/:id")
        @UseBefore(AuthMiddleWare)

    @HttpCode(200)
    public async DeleteJob(@Param("id") id:number){
        return await this.data1.deletejob(Number(id));
    }

    @Get("/GetSingleJob/:id")
        @UseBefore(AuthMiddleWare)

    @HttpCode(200)
    public async GetSingleJob(@Param("id") id:number){
        return await this.data1.getsinglejob(Number(id));
    }
}
