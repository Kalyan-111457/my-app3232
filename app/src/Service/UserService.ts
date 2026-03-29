import { UserRepository } from "../Repository/UserRepository";
import { UsersModel } from "../models/UserModel";

export class UserService{
    private data:UserRepository
    constructor(){
        this.data=new UserRepository();
    }

    async getAllusers(){
        return await this.data.GetAllUsers();
    }

    async CreateUser(data:UsersModel){
        if(!data.bio || !data.email || !data.fullname ||!data.password ||!data.phone){
            throw new Error("please Check All Fields")
        }
        return await this.data.CreateAndUpdateUsers(data);
    }

    async deleteUser(id:number){
        if(id<=0){
            throw new Error("The id is not be less than Zero");
        }
        return await this.data.DeleteUser(id);
    }


    async getsingleuser(id:number){
        if(id<=0){
            throw new Error("the id is not be less than Zero");
        }
        return await this.data.GetSingleUser(id);
    }

   



}