import { prisma } from "../config/prisma";

export class  AllDataCountRepository{
    private data = prisma;

    async getAllActiveUsersRepository(){
        return this.data.user.count({
            where:{
                isDeleted:false
            }
        })
    }

    async getAllInActiveUsersRepository(){
        return this.data.user.count({
            where:{
                isDeleted:true
            }
        })
    }


    async getAllActiveJobsRepository(){
        return this.data.job.count({
            where:{
                isDeleted:false
            }
        })
    }


    async getAllInActiveJobsRepository(){
        return this.data.job.count({
            where:{
                isDeleted:true
            }
        })
    }


    async getAllActiveApplications(){
        return this.data.application.count({
            where:{
                isDeleted:false
            }
        })
    }


    async getAllInActiveApplications(){
        return this.data.application.count({
            where:{
                isDeleted:true
            }
        })
    }




}
