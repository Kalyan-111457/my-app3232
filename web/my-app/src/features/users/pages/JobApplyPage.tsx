import { useContext, useState } from "react"
import { JobContext } from "./CreateContextSingleJob"

const JobApplyPage = () => {
    const { items } = useContext(JobContext);
    const [file,setfile]=useState<File | null>(null);

    return (
        <div>
            <div key={items?.id}>
                <h1>{items?.title}</h1>
                <h2>{items?.company}</h2>
                <p>{items?.description}</p>
                <p>{items?.salary}</p>
                <input 
                type="file"
                onChange={(e)=>setfile(e.target.files?.[0] || null)}
                />

                <button
                onClick={()=>console.log(file)}
                >Apply</button>
            </div>


        </div>
    )
}

export default JobApplyPage
