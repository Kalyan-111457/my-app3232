import { AllDataCountRepository } from "../Repository/AllDataCountRepository";

export class AllDataCountService {
    private respoitory: AllDataCountRepository;

    constructor() {
        this.respoitory = new AllDataCountRepository();
    }

    async getAllActiveUsersService() {
        return this.respoitory.getAllActiveUsersRepository();
    }


    async allinactiveusersservice() {
        return this.respoitory.getAllInActiveUsersRepository();
    }


    async allactivejobsService() {
        return this.respoitory.getAllActiveJobsRepository();
    }


    async allinactiveJobsService() {
        return this.respoitory.getAllInActiveJobsRepository();
    }

    async allactiveapplicationservice() {
        return this.respoitory.getAllActiveApplications();
    }

    async allinactiveapplicationservice() {
        return this.respoitory.getAllInActiveApplications();
    }

}