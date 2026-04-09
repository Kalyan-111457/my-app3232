import { useContext, useState, } from "react"
import { JobContext } from "./CreateContextSingleJob"
import { ApplyJob } from "../UsersApi";

const JobApplyPage = () => {
    const { items } = useContext(JobContext);
    const [file, setfile] = useState<File | null>(null);

    const converttobase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        })

    }

    const handleSubmit = async (jobid: number) => {
        if (!file) {
            alert("Please select a file before applying.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert("File too large (max 5MB)");
            return;
        }
        try {
            const base64file = await converttobase64(file);
            const response = await ApplyJob(jobid, base64file);
            if (typeof response === "string" && response.toLowerCase().includes("failed")) {
                throw new Error(response);
            }

            if (response) {
                alert("SucessFully Uploaded")
            }
            else {
                throw new Error("We are getting the error");
            }

        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
            else {
                alert("we are getting errror from the endpoint");
            }

        }
    }


    return (
        <div>
            <div key={items?.id}>
                <h1>{items?.title}</h1>
                <h2>{items?.company}</h2>
                <p>{items?.description}</p>
                <p>{items?.salary}</p>
                <input
                    type="file"
                    onChange={(e) => setfile(e.target.files?.[0] || null)}
                />

                <button
                    onClick={() => {
                        if (!items) {
                            alert("Job details are not available.");
                            return;
                        }
                        handleSubmit(items.id);
                    }}
                >Apply</button>
            </div>


        </div>
    )
}

export default JobApplyPage
