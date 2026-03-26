import { JsonController, Get, Post, Delete, Body, Param, HttpCode } from "routing-controllers";
import { UsersModel } from "../models/UserModel";
import { UserService } from "../Service/UserService";

@JsonController("/users")
export class UserController {
    private userdata = new UserService();

    @Get("/")
    @HttpCode(200)
    async getallusers() {
        return await this.userdata.getAllusers();
    }

    @Post("/CreateUser")
    @HttpCode(200)
    async CreateUser(@Body() body: UsersModel) {
        return await this.userdata.CreateUser(body);
    }

    @Delete("/:id")
    @HttpCode(200)
    async DeleteUser(@Param("id") id: number) {
        return await this.userdata.deleteUser(Number(id));
    }
    
    @Get("/GetSingleUser/:id")
    @HttpCode(200)
    async getsingleuser(@Param("id") id:number){
        return await this.userdata.getsingleuser(Number(id));
    }


}