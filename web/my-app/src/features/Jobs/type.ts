export interface JobApply{
    id?:number,
    title:string,
    description:string,
    company:string,
    location:string,
    salary:string,
    userId?:number
}
export type JobResponsePayload = {
    id: number;
    title: string;
    description: string;
    company: string;
    location: string;
    salary: string;

    applications: {
        user: {
            id: number;
            email: string;
            fullname: string;
            phone: string;
            bio: string;
        };

        status: string;
        resumeurl: string;

        totalScore?: number;
        SkillsScore?: number;
        ProjectScore?: number;
        EducationScore?: number;
        ExperienceScore?: number;
        aifeedback?: string;
        id:number
    }[];
}[];