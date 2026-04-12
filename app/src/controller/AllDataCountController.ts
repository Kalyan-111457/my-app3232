import { Get, HttpCode, JsonController, UseBefore } from "routing-controllers";
import { AllDataCountService } from "../Service/AllDataCountService";
import { AuthMiddleWare } from "../utils/AuthMiddleWare";

@JsonController("/AllData")
export class  AllDataCountController{
    private data:AllDataCountService;

    constructor(){
        this.data=new AllDataCountService();
    }


    @Get("/AllActiveUsersCount")
    @HttpCode(200)
    @UseBefore(AuthMiddleWare)
    async getAllActive (){
        return this.data.getAllActiveUsersService();
    }


    @Get("/AllInActiveUsersCount")
    @HttpCode(200)
    @UseBefore(AuthMiddleWare)
    async getAllInActiveUsers(){
        return this.data.allinactiveusersservice();
    }


    @Get("/AllJobsCount")
    @HttpCode(200)
    @UseBefore(AuthMiddleWare)
    async getAllActiveJobs(){
        return this.data.allactivejobsService();
    }

    @Get("/AllInActiveJobs")
    @HttpCode(200)
    @UseBefore(AuthMiddleWare)
    async getAllInActiveJobs(){
        return this.data.allinactiveJobsService();
    }

    @Get("/AllActiveApplications")
    @HttpCode(200)
    @UseBefore(AuthMiddleWare)
    async getActiveApplications(){
        return this.data.allactiveapplicationservice();
    }

    @Get("/AllInActiveApplications")
    @HttpCode(200)
    @UseBefore(AuthMiddleWare)
    async getAllInactiveApplications(){
        return this.data.allinactiveapplicationservice();
    }

 

    
}