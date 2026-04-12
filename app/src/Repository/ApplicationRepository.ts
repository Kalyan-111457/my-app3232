import { prisma } from "../config/prisma";
import { OpenAiService } from "../Service/OpenAiService";
import { DownloadFileService } from "../Service/DownloadFileService";

export class ApplicationRepository {
    private prisma = prisma;
    private OpenAi=new OpenAiService();
    private downloadfile=new DownloadFileService();

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

        await this.prisma.user.update({
            where:{
                id:userid
            },
            data:{
                resumeurl:resumeurl
            }
        })


       return await this.prisma.application.create({
            data: {
                userId: userid,
                jobId: jobid,
                resumeurl: resumeurl,
                status: "Applied",
                totalScore: 0,
                SkillsScore: 0,
                ProjectScore: 0,
                EducationScore: 0,
                ExperienceScore: 0,
                aifeedback: ""
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
            where: { id: id,
                isDeleted:false
             }
        });

        if (!checking || checking.isDeleted) {
            throw new Error("Application data not found or already deleted");
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
        const response=await this.prisma.job.findFirst({
            where:{
                id:jobid,
                isDeleted:false
            }
        })

       if(response){
            const response=await this.prisma.job.findMany({
                where:{
                    id:jobid,
                    isDeleted:false
                },
                select:{
                    id:true,
                    title:true,
                    description:true,
                    salary:true,
                    company:true,
                    location:true,
                    applications:{
                        where:{
                            isDeleted:false
                        },
                        select:{
                            status:true,
                            resumeurl:true,
                            totalScore:true,
                            ExperienceScore:true,
                            EducationScore:true,
                            ProjectScore:true,
                            SkillsScore:true,
                            aifeedback:true,
                            id:true,
                            user:{
                                select:{
                                    id:true,
                                    fullname:true,
                                    email:true,
                                    phone:true,
                                    bio:true
                                }
                            }
                        }
                    }
                }

            })
            return response;
        }
        else{
            throw new Error("we are not getting the data");
        }
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



    async AiRepositoryForAiModels(jobid:number){

        const response=await this.prisma.job.findFirst({
            where:{
                id:jobid,
                isDeleted:false
            }
        })

        if(!response){
            throw new Error("No JobId is Found");
        }

        const result=await this.prisma.application.findMany({
            where:{
                jobId:jobid,
                isDeleted:false
            }
        });

        const finalresult=await Promise.all(
            result.map(async(item)=>{
                if(item.totalScore){
                    return item;
                }

                const text=await this.downloadfile.ConvertPdfLinktotext(item.resumeurl);

                const cleanText = text
                        .replace(/\n/g, " ")
                        .replace(/\s+/g, " ")
                        .slice(0, 3000);

                const apiresponse=await this.OpenAi.analyseResume(cleanText,response.description);

                return await this.prisma.application.update({
                    where:{
                        id:item.id
                    },
                    data:{
                        totalScore:apiresponse.totalScore,
                        SkillsScore:apiresponse.skillsScore,
                        ProjectScore:apiresponse.projectsScore,
                        EducationScore:apiresponse.educationScore,
                        ExperienceScore:apiresponse.experienceScore,
                        aifeedback:apiresponse.feedback
                    }

                })



            }
        ))
        return finalresult;

    
    }
}
