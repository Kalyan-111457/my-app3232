import { JsonController, Get, Post, Body, Param, UploadedFile, Delete, HttpCode, QueryParam, UseBefore, } from "routing-controllers";
import multer from "multer";
import { Supabase } from "../config/Supabase";
import { v4 as uuidv4 } from "uuid";
import { ApplicationModel } from "../models/ApplicationModel";
import { ApplicationService } from "../Service/ApplicationService";
import { AuthMiddleWare } from "../utils/AuthMiddleWare";

const upload = multer({ storage: multer.memoryStorage() });

@JsonController("/Application")
export class ApplicationController {

    private data: ApplicationService;

    constructor() {
        this.data = new ApplicationService();
    }

    @Post("/ApplyJob")
    @HttpCode(200)
    @UseBefore(AuthMiddleWare)

    @UseBefore(upload.single("file"))
    public async ApplyJob(
        @Body() body: ApplicationModel,
        @UploadedFile("file") file: any
    ) {

        if (!file) {
            return "File is required";
        }

        try {

            const fileName = `${uuidv4()}-${file.originalname}`;
            const filePath = `user-${body.userId}/job-${body.jobId}/${fileName}`;

            const { error } = await Supabase.storage
                .from("resumes")
                .upload(filePath, file.buffer, {
                    contentType: file.mimetype
                });

            if (error) {
                console.error(error);
                return "Upload failed";
            }

            const { data } = Supabase.storage
                .from("resumes")
                .getPublicUrl(filePath);

            const resumeUrl = data.publicUrl;

            return await this.data.ApplyJob(
                body.userId,
                body.jobId,
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