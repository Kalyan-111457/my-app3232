import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApplicationsBasedOnJobId, handleAiEndpoint } from "../api";
import type { JobResponsePayload } from "../type";
import { handledeleteApplication } from "../api";

export const AiJobsPage = () => {
    const { id } = useParams();

    const [data, setData] = useState<JobResponsePayload>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await ApplicationsBasedOnJobId(Number(id));
            setData(response);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const handleAi = async (jobId: number) => {
        try {
            setLoading(true);

            if (jobId <= 0) {
                throw new Error("Invalid Job ID");
            }

            await handleAiEndpoint(jobId);

            await fetchData();

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    const handledelete=async(id:number)=>{
        try{
            const response=await  handledeleteApplication(id);
            if(response?.data){
                alert("SucessFully Deleted");
                await fetchData();
            }
            else{
                throw new Error("We are getting the Error While Deleting");
            }
        }
        catch(error){
            if(error instanceof Error){
                alert(error.message);
            }
            else{
                alert("Something went Wrong");
            }
        }
    }

    return (
        <div style={{ padding: "20px" }}>

            {loading && <p>AI is analyzing resumes... please wait</p>}

            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && !error && data.length > 0 && (
                <>
                    {data.map((job) => (
                        <div key={job.id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "15px" }}>
                            
                            <h2>Job Title: {job.title}</h2>
                            <p>Company: {job.company}</p>
                            <p>Location: {job.location}</p>
                            <p>Salary: {job.salary}</p>
                            <p>Applications: {job.applications.length}</p>

                            <button
                                onClick={() => handleAi(Number(id))}
                                disabled={loading}
                                style={{ marginBottom: "10px" }}
                            >
                                {loading ? "Analyzing..." : "Analyze with AI"}
                            </button>

                            {job.applications.map((application) => (
                                <div
                                    key={`${job.id}-${application.user.id}`}
                                    style={{
                                        border: "1px solid gray",
                                        marginTop: "10px",
                                        padding: "10px",
                                        borderRadius: "8px"
                                    }}
                                >
                                    <h3>{application.user.fullname}</h3>

                                    <p>Status: {application.status}</p>
                                    <p>Email: {application.user.email}</p>
                                    <p>Phone: {application.user.phone}</p>
                                    <p>Bio: {application.user.bio}</p>

                                    <p>Total Score: {application.totalScore ?? "Not analyzed"}</p>
                                    <p>Skills: {application.SkillsScore ?? "-"}</p>
                                    <p>Projects: {application.ProjectScore ?? "-"}</p>
                                    <p>Education: {application.EducationScore ?? "-"}</p>
                                    <p>Experience: {application.ExperienceScore ?? "-"}</p>

                                    <p>Feedback: {application.aifeedback ?? "No feedback yet"}</p>
                                    <button onClick={()=>handledelete(application.id)}>Delete Application</button>
                                </div>
                            ))}
                        </div>
                    ))}
                </>
            )}

            {!loading && !error && data.length === 0 && (
                <p>No data is present</p>
            )}
        </div>
    );
};
