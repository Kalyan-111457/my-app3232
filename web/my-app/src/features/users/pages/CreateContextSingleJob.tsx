import { createContext, useState, type ReactNode } from "react";
import type { Alljobs } from "../UsersModel";


export const JobContext=createContext<{
    items:Alljobs | null ,
    setItems:(job:Alljobs)=>void;
}>({
    items:null,
    setItems:()=>{}
})


export const JobProvider = ({ children }: { children: ReactNode }) => {
    const [items,setItems]=useState<Alljobs | null>(null);

    return (
        <JobContext.Provider value={{items,setItems}}>
            {children}
        </JobContext.Provider>
    );
}
