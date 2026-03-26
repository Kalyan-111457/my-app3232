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
}