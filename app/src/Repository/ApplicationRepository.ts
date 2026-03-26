import { prisma } from "../config/prisma";

export class ApplicationRepository {
    private prisma = prisma;

    async ApplyJob(userid: number, jobid: number, resumeurl: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userid }
        });

        const job = await this.prisma.job.findUnique({
            where: { id: jobid }
        });

        if (!user || !job || user.isDeleted || job.isDeleted) {
          throw new Error("Please Check Once")
        }

        const checking = await this.prisma.application.findFirst({
            where: {
                userId: userid,
                jobId: jobid,
                isDeleted: false
            }
        });

        if (checking) {
            throw new Error("Already Applied")
          
        }

       return await this.prisma.application.create({
            data: {
                userId: userid,
                jobId: jobid,
                resumeurl: resumeurl,
                status: "Applied"
            }
        });

   
    }

    async UpdateStatus(id: number, status: string) {
        const checking = await this.prisma.application.findFirst({
            where: {
                id: id,
                isDeleted: false
            }
        });

        if (!checking) {
           throw new Error("No id is Found")
        }

       return await this.prisma.application.update({
            where: { id: id },
            data: { status: status }
        });

    }

    async deleteApplication(id: number) {
        const checking = await this.prisma.application.findUnique({
            where: { id: id }
        });

        if (!checking || checking.isDeleted) {
            throw new Error("Application data is Found"); 
        }

        return await this.prisma.application.update({
            where: { id: id },
            data: { isDeleted: true }
        });

      
    }

    async getApplicationsByuserId(userid: number) {
        const data = await this.prisma.application.findMany({
            where: {
                userId: userid,
                isDeleted: false
            },
            include: { job: true },
            orderBy: { createdAt: "desc" }
        });

        if (data.length === 0) {
           throw new Error("No data is Found")
        }

        return data;
    }

    async getApplicationByJobid(jobid: number) {
        const data = await this.prisma.application.findMany({
            where: {
                jobId: jobid,
                isDeleted: false
            },
            include: { user: true },
            orderBy: { createdAt: "desc" }
        });

        if (data.length === 0) {
           throw new Error("No data is Found")
        }

        return data;
    }

    async getApplicationByid(id: number) {
        const app = await this.prisma.application.findUnique({
            where: { id: id },
            include: {
                user: true,
                job: true
            }
        });

        if (!app || app.isDeleted) {
           throw new Error("No data is Found")
        }

        return app;
    }

    async getApplicationBasedonUserIdandJobId(userid: number, jobid: number) {
        const data = await this.prisma.application.findMany({
            where: {
                userId: userid,
                jobId: jobid,
                isDeleted: false
            },
            include: {
                user: true,
                job: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        if (data.length === 0) {
           throw new Error("No data is Found")
        }

        return data;
    }
}
