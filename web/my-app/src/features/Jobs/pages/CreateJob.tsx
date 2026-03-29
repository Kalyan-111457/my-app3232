import { useState, type ChangeEvent, type FormEvent } from "react";
import { Input } from "../../../components/input";
import { CreateJob as createJobApi } from "../JobApi";
import type { JobApply } from "../type";

const ADMIN_USER_ID = 5;

export const CreateJob = () => {
  const [data, setData] = useState<JobApply>({
    title: "",
    description: "",
    company: "",
    salary: "",
    location: "",
    userId: ADMIN_USER_ID,
  });

  const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
        userId: ADMIN_USER_ID,
      });
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handlesubmit}>
        <label>Title</label>
        <Input
          type="text"
          placeholder="Enter the Title"
          value={data.title}
          onChange={handlechange}
          name="title"
        />

        <label>Description</label>
        <Input
          type="text"
          placeholder="Enter the description"
          value={data.description}
          onChange={handlechange}
          name="description"
        />

        <label>Company</label>
        <Input
          type="text"
          placeholder="Enter the Company name"
          value={data.company}
          onChange={handlechange}
          name="company"
        />

        <label>Salary</label>
        <Input
          type="text"
          placeholder="Enter the salary"
          value={data.salary}
          onChange={handlechange}
          name="salary"
        />

        <label>Location</label>
        <Input
          type="text"
          placeholder="Enter the location"
          value={data.location}
          onChange={handlechange}
          name="location"
        />

        <button type="submit">Create Job</button>
      </form>
    </div>
  );
};

export default CreateJob;
