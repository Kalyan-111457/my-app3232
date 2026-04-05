import { prisma } from "../config/prisma";
import { JobModels } from "../models/JobModel";

export class JobRepository {
    private prisma = prisma;

    async CreateJob(data: JobModels) {
        const userId = data.userId;

        if (userId === undefined) {
            throw new Error("User id is required");
        }

        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user || user.isDeleted) {
            throw new Error("User is Not found")
        }

        if (data.id) {
            const job = await this.prisma.job.findUnique({
                where: { id: data.id }
            });

            if (!job || job.isDeleted) {
                throw new Error("Job is Not Found")
            }

            return await this.prisma.job.update({
                where: { id: data.id },
                data: {
                    title: data.title,
                    description: data.description,
                    company: data.company,
                    location: data.location,
                    salary: data.salary,
                    userId
                }
            });
        }

        return await this.prisma.job.create({
            data: {
                title: data.title,
                description: data.description,
                company: data.company,
                location: data.location,
                salary: data.salary,
                userId
            }
        });

    }

    async deleteJob(id: number) {
        const job = await this.prisma.job.findUnique({
            where: { id }
        });

        if (!job || job.isDeleted) {
            throw new Error("the job is Not Found")
       
        }

        return await this.prisma.job.update({
            where: { id },
            data: { isDeleted: true }
        });

    }

    async listjobs() {
        const jobs = await this.prisma.job.findMany({
            where: { isDeleted: false },
            orderBy:{createdAt:"desc"}
         
        });

        if (jobs.length === 0) {
            throw new Error("there is no Jobs")
        }

        return jobs;
    }


    async getsingleJob(id:number){
        const job = await this.prisma.job.findFirst({
            where:{
                id:id,
                isDeleted: false
            }
        });

        if(!job){
            throw new Error("Job is Not Found")
        }

        return job;
    }
}
