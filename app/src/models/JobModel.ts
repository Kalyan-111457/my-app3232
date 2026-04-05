import { IsNotEmpty, IsInt, IsOptional } from "class-validator";

export class JobModels {

    id?: number;

    @IsNotEmpty()
    title!: string;

    @IsNotEmpty()
    description!: string;

    @IsNotEmpty()
    company!: string;

    @IsNotEmpty()
    location!: string;

    @IsNotEmpty()
    salary!: string;

    @IsOptional()
    @IsInt()
    userId?: number;
}
