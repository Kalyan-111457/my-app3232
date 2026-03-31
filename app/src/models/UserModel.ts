import { IsEmail, IsNotEmpty } from "class-validator";

export class UsersModel {

    id?: number;

    @IsEmail()
    email!: string;

    @IsNotEmpty()
    password!: string;

    @IsNotEmpty()
    fullname!: string;

    @IsNotEmpty()
    phone!: string;

    @IsNotEmpty()
    bio!: string;

    resumeurl?: string | null;

    isAdmin?: string;
}


export interface LoginModel{
    email:string,
    password:string
}
