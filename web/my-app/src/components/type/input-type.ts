import type { ChangeEvent } from "react";

export interface InputType{
    name:string,
    type:string,
    placeholder:string,
    value:string,
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void
}