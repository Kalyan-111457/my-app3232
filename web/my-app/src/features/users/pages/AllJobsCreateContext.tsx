import { createContext, useEffect, useState } from "react";
import type { Alljobs } from "../UsersModel";
import { AllJobsForUser } from "../UsersApi";

export const AllJobsContext=createContext<{

jobs: Alljobs[] | undefined;
  setjobs: (jobs: Alljobs[]) => void;
}>({
  jobs: [],
  setjobs: () => {},
});

export const AllJobsProvider = ({ children }: { children: React.ReactNode }) => {
    const [jobs, setjobs] = useState<Alljobs[] |undefined>(undefined);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await AllJobsForUser();
                if (response) {
                    setjobs(response);
                }
            } 
            catch(error){
                if(error instanceof Error){
                    alert("SomeThing went Wrong");
                }
            }

        }
        fetchJobs();
    },[]);


    return(
        <AllJobsContext.Provider value={{jobs,setjobs}}>
        {children}
        </AllJobsContext.Provider>
    )


}