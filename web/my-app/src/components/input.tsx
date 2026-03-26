import type{ InputType } from "./type/input-type";

export const Input=(data:InputType)=>{

    return(
  
    <input 
    type={data.type}
    name={data.name}
    placeholder={data.placeholder}
    value={data.value}
    onChange={data.onChange}
    />
    )


}
