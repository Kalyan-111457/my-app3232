import { useContext, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { Input } from "../../../components/input";
import { AllJob, CreateJob as createJobApi, deleteJob } from "../JobApi";
import type { JobApply } from "../type";
import "./css/CreateJob.css";
import { AllJobsContext } from "../../users/pages/AllJobsCreateContext";

export const CreateJob = () => {
  const [data, setData] = useState<JobApply>({
    title: "",
    description: "",
    company: "",
    salary: "",
    location: "",
  });
  const [search, setSearch] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [count, setCount] = useState<number>(19);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { jobs, setjobs } = useContext(AllJobsContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const refreshJobs = async () => {
    const updatedJobs = await AllJob();
    setjobs(updatedJobs);
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      setError("");
      const response = await deleteJob(id);

      if (response) {
        await refreshJobs();
        alert("SucessFully Deleted");
      } else {
        alert("Failed due to api please Check Once");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        alert(error.message);
      } else {
        alert("Something went Wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: number) => {
    const selectedJob = filteredData.find((item) => item.id === id);
    if (!selectedJob) {
      return;
    }

    setData(selectedJob);
    setOpenDialog(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      await createJobApi(data);
      await refreshJobs();
      alert("Job created successfully");
      setData({
        title: "",
        description: "",
        company: "",
        salary: "",
        location: "",
      });
      setOpenDialog(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        alert(error.message);
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    return (jobs ?? []).filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [jobs, search]);

  return (
    <div className="jobs-page">
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>

      <p>{count}</p>

      <div className="jobs-header">
        <h1>Jobs <span>CRUD</span> Operations</h1>
        <button className="btn-add" onClick={() => setOpenDialog(!openDialog)}>
          + Add Job
        </button>
      </div>

      {openDialog && (
        <div className="form-card">
          <h2>{data.id ? "Edit Job" : "Create New Job"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Title</label>
                <Input type="text" placeholder="Enter the Title" value={data.title} onChange={handleChange} name="title" />
              </div>
              <div className="form-group">
                <label>Company</label>
                <Input type="text" placeholder="Enter the Company" value={data.company} onChange={handleChange} name="company" />
              </div>
              <div className="form-group">
                <label>Location</label>
                <Input type="text" placeholder="Enter the Location" value={data.location} onChange={handleChange} name="location" />
              </div>
              <div className="form-group">
                <label>Salary</label>
                <Input type="text" placeholder="Enter the Salary" value={data.salary} onChange={handleChange} name="salary" />
              </div>
              <div className="form-group full-width">
                <label>Description</label>
                <Input type="text" placeholder="Enter the Description" value={data.description} onChange={handleChange} name="description" />
              </div>
            </div>
            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={() => setOpenDialog(false)}>Cancel</button>
              <button type="submit" className="btn-submit">{data.id ? "Update Job" : "Create Job"}</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-section">
        <div className="table-toolbar">
          <div className="search-wrap">
            <span className="search-icon">Search</span>
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
                  <td><span className="badge-salary">Rs {item.salary}</span></td>
                  <td>
                    <div className="action-cell">
                      <button className="btn-edit" onClick={() => item.id !== undefined && handleEdit(item.id)}>Edit</button>
                      <button className="btn-delete" onClick={() => item.id !== undefined && handleDelete(item.id)}>Delete</button>
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
