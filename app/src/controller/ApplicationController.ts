import { JsonController, Get, Post, Body, Param, Req, HttpCode, QueryParam, UseBefore, } from "routing-controllers";
import { Supabase } from "../config/Supabase";
import { v4 as uuidv4 } from "uuid";
import { ApplicationModel } from "../models/ApplicationModel";
import { ApplicationService } from "../Service/ApplicationService";
import { AuthMiddleWare } from "../utils/AuthMiddleWare";
import { JWTPAYLOAD } from "../utils/JwtModel";
import { Request } from "express";




type AuthenticatedRequest = Request & {
    user?: JWTPAYLOAD;
};

const RESUME_BUCKET = process.env.SUPABASE_RESUME_BUCKET || "ResumeUpload";

@JsonController("/Application")
export class ApplicationController {

    private data: ApplicationService;

    constructor() {
        this.data = new ApplicationService();
    }

    @Post("/ApplyJob")
    @HttpCode(200)
    @UseBefore(AuthMiddleWare)
    public async ApplyJob(
        @Body({ options: { limit: "25mb" } }) body: ApplicationModel,
        @Req() request: AuthenticatedRequest
    ) {

        if (!body?.base64file) {
            return "File is required";
        }

        try {
            const userId = request.user?.id;
            if (typeof userId !== "number") {
                return "Unauthorized user";
            }

            const jobId = Number(body.jobId);
            if (!Number.isFinite(jobId) || jobId <= 0) {
                return "Invalid job id";
            }

            const fileParts = body.base64file.match(/^data:(.+);base64,(.+)$/);
            if (!fileParts) {
                return "Invalid file format";
            }

            const mimeType = fileParts[1];
            const base64Data = fileParts[2];
            const fileBuffer = Buffer.from(base64Data, "base64");

            if (!fileBuffer.length) {
                return "Invalid file content";
            }

            const extension = mimeType.split("/")[1] || "bin";
            const fileName = `${uuidv4()}.${extension}`;
            const filePath = `user-${userId}/job-${jobId}/${fileName}`;

            const { error } = await Supabase.storage
                .from(RESUME_BUCKET)
                .upload(filePath, fileBuffer, {
                    contentType: mimeType
                });

            if (error) {
                console.error(error);
                return `Upload failed: ${error.message}`;
            }

            body.userId = userId;

            const { data } = Supabase.storage
                .from(RESUME_BUCKET)
                .getPublicUrl(filePath);

            const resumeUrl = data.publicUrl;

            return await this.data.ApplyJob(
                userId,
                jobId,
                resumeUrl
            );

        } catch (err) {
            console.error(err);
            return "Something went wrong";
        }
    }
    @Post("/UpdateStatus/:id")
    @UseBefore(AuthMiddleWare)
    @HttpCode(200)
    public async UpdateStatus(@Param("id") id: number, @Body() body: { status: string }) {
        return await this.data.UpdateApplication(Number(id), body.status);
    }

    @Post("/deleteApplication/:id")

    @UseBefore(AuthMiddleWare)

    @HttpCode(200)
    public async DeleteApplication(@Param("id") id: number) {
        return this.data.deleteApplication(Number(id));
    }

    @Get("/GetApplicationById/:id")
    @UseBefore(AuthMiddleWare)

    @HttpCode(200)
    public async GetApplication(@Param("id") id: number) {
        return this.data.getApplicationById(Number(id))
    }


    @Get("/GetApplicationByUserId/:id")
    @UseBefore(AuthMiddleWare)

    @HttpCode(200)
    public async GetApplicationByUserId(@Param("id") id: number) {
        return this.data.getApplicationByUserId(Number(id))
    }

    @Get("/GetApplicationByJobId/:id")
    @UseBefore(AuthMiddleWare)

    @HttpCode(200)
    public async GetApplicationByJobId(@Param("id") id: number) {
        return this.data.getApplicationByJobId(Number(id))
    }

    @Get("/Search")
    @UseBefore(AuthMiddleWare)
    @HttpCode(200)
    public async GetApplicationByUserIdandJobId(@QueryParam("userid") userid: number, @QueryParam("jobid") jobid: number) {
        return await this.data.getApploicationByUserIdandJobId(userid, jobid);
    }
}
