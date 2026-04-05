import axios from "axios";

export const ApiClient=axios.create({
    baseURL:"http://localhost:4000",
    headers:{
        "Content-Type":"application/json"
    }
})



//👉 An interceptor = a middle layer that runs before or after a request/response

//Think of it like a security guard:

//Before entering → checks request
//After leaving → checks response


ApiClient.interceptors.request.use((config)=>{
    const token=localStorage.getItem("token");
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config;

})
