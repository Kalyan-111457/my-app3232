import "dotenv/config";
import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { UserController } from "./src/controller/UserController";
import { JobController } from "./src/controller/JobController";
import { ApplicationController } from "./src/controller/ApplicationController";

const app=createExpressServer(
    {
        cors:true,
        controllers:[UserController,JobController,ApplicationController]
    }
);

const Port=Number(process.env.PORT) || 4000;

app.listen(Port,():void=>{
    console.info(`Server is Starting at the Port No ${Port}`)
});
