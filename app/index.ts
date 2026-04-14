import "dotenv/config";
import "reflect-metadata";
import { useExpressServer } from "routing-controllers";
import { UserController } from "./src/controller/UserController";
import { JobController } from "./src/controller/JobController";
import { ApplicationController } from "./src/controller/ApplicationController";
import express from "express";
import { AllDataCountController } from "./src/controller/AllDataCountController";

const app = express();

useExpressServer(app, {
    cors: true,
    controllers: [UserController, JobController, ApplicationController,AllDataCountController],
});


const Port=Number(process.env.PORT) || 4000;

app.listen(Port,():void=>{
    console.info(`Server is Starting at the Port No ${Port}`)
});
