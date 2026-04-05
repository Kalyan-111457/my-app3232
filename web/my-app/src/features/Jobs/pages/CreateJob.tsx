import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { Input } from "../../../components/input";
import { AllJob, CreateJob as createJobApi,deleteJob } from "../JobApi";
import type { JobApply } from "../type";
import "./css/CreateJob.css";

export const CreateJob = () => {


  const [data, setData] = useState<JobApply>({
    title: "",
    description: "",
    company: "",
    salary: "",
    location: "",
  });


  const [Jobs, setAllJobs] = useState<JobApply[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [OpenDialog,setOpenDialog]=useState<boolean>(false);


  const handlechange=(e:ChangeEvent<HTMLInputElement>)=>{
    const{name,value}=e.target;
    setData((prev)=>({
      ...prev,
      [name]:value,
    }))
  }


  const handledelete=async(id:number)=>{
    try{
      const response=await deleteJob(id);
      if(response){
        alert("SucessFully Deleted");
      }
      else{
        alert("Failed due to api please Check Once");
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

  const handleEdit=async(id:number)=>{
    const data=filteredData.find((item)=>item.id==id);
    setData(data!);
    setOpenDialog(true);
  }



  const fetchAllJobsData = async () => {
    try {
      setLoading(true);
      const response = await AllJob();
      setAllJobs(response);
    }
    catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        alert(error.message);
      }
      else {
        console.error("SomeThing Went Wrong");
      }
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllJobsData();
  }, []);
const[count,setcount]=useState<number>(19);

  const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createJobApi(data);
      alert("Job created successfully");
      setData({
        title: "",
        description: "",
        company: "",
        salary: "",
        location: "",
      });
      fetchAllJobsData();
      setOpenDialog(false);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Something went wrong");
      }
    }
  };
 const filteredData = useMemo(() => {
  console.log("Filtering...");
  return Jobs.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );
}, [Jobs, search]);


  return (

 <div   className="jobs-page">
  <button onClick={()=>setcount(count+1)}>
    Increment
  </button>

  <p>{count}</p>

    {/* Header */}
    <div className="jobs-header">
      <h1>Jobs <span>CRUD</span> Operations</h1>
      <button className="btn-add" onClick={() => setOpenDialog(!OpenDialog)}>
        + Add Job
      </button>
    </div>

    {/* Form */}
    {OpenDialog && (
      <div className="form-card">
        <h2>{data.id ? "Edit Job" : "Create New Job"}</h2>
        <form onSubmit={handlesubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Title</label>
              <Input type="text" placeholder="Enter the Title" value={data.title} onChange={handlechange} name="title" />
            </div>
            <div className="form-group">
              <label>Company</label>
              <Input type="text" placeholder="Enter the Company" value={data.company} onChange={handlechange} name="company" />
            </div>
            <div className="form-group">
              <label>Location</label>
              <Input type="text" placeholder="Enter the Location" value={data.location} onChange={handlechange} name="location" />
            </div>
            <div className="form-group">
              <label>Salary</label>
              <Input type="text" placeholder="Enter the Salary" value={data.salary} onChange={handlechange} name="salary" />
            </div>
            <div className="form-group full-width">
              <label>Description</label>
              <Input type="text" placeholder="Enter the Description" value={data.description} onChange={handlechange} name="description" />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => setOpenDialog(false)}>Cancel</button>
            <button type="submit" className="btn-submit">{data.id ? "Update Job" : "Create Job"}</button>
          </div>
        </form>
      </div>
    )}

    {/* Table Section */}
    <div className="table-section">
      <div className="table-toolbar">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search by job title..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <span className="table-count">{filteredData.length} jobs found</span>
      </div>

      {loading && <div className="state-loading">Loading jobs...</div>}
      {error && <div className="state-error">{error}</div>}

      <div className="table-card">
        <table className="jobs-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Description</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 && !loading && (
              <tr><td colSpan={6} className="state-empty">No jobs found.</td></tr>
            )}
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td><strong>{item.title}</strong></td>
                <td><span className="badge-company">{item.company}</span></td>
                <td>{item.description}</td>
                <td>{item.location}</td>
                <td><span className="badge-salary">₹{item.salary}</span></td>
                <td>
                  <div className="action-cell">
                    <button className="btn-edit" onClick={() => item.id !== undefined && handleEdit(item.id)}>✏ Edit</button>
                    <button className="btn-delete" onClick={() => item.id !== undefined && handledelete(item.id)}>🗑 Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  </div>



  );
};




export default CreateJob;
