import { ApiClient } from "../services/apiclient";


export const LoginVerification=async(username:string,password:string)=>{
    try{
        const response=await ApiClient.post("/users/LoginUser", null, {
            params: {
                email: username,
                password
            }
        })

        return response.data;
    }

    catch(error:unknown){
        if(error instanceof Error){
            throw new Error(error.message);
        }
        else{
            alert("SomeThin Went Wrong");
        }
    }
}
