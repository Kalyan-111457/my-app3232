import axios from "axios";

export const ApiClient=axios.create({
    baseURL:"http://localhost:4000",
    headers:{
        "Content-Type":"application/json"
    }
})

ApiClient.interceptors.request.use((config)=>{
    const token=localStorage.getItem("token");
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config;

})
