import { useEffect, useState } from "react";
import { AllJob, deleteJob } from "../JobApi";
import type { JobApply } from "../type";

const AllJobs = () => {
  const [data, setData] = useState<JobApply[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handledelete=async(id:number)=>{
    try{
    await deleteJob(id);
    setData((prev) => prev.filter((item) => item.id !== id));
    alert('SucessFully Deleted');
    }
    catch(error){
         if(error instanceof Error){
            console.error(error.message);
         }
         else{
            alert("Something went Wrong");
         }
    }


  }

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true);
        const response = await AllJob();
        setData(response);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchdata();
  }, []);

  return (
    <div>
      {loading ? <p>Loading...</p> : null}
      {!loading && error ? <p>{error}</p> : null}

      <table border={1}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Company</th>
            <th>Location</th>
            <th>Salary</th>
            <th>UserId</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id ?? `${item.title}-${item.userId}`}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.company}</td>
              <td>{item.location}</td>
              <td>{item.salary}</td>
              <td>{item.userId}</td>
              <td>
                <button
                  onClick={() => {
                    if (item.id !== undefined) {
                      handledelete(item.id);
                    }
                  }}
                >
                    Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllJobs;
