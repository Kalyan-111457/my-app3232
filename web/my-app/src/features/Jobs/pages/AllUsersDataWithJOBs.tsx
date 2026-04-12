import { useContext, useState, useMemo } from "react";
import { AllJobsContext } from "../../users/pages/AllJobsCreateContext";
import { useNavigate } from "react-router-dom";

export const AllUsersDataWithJOb = () => {

    const { jobs } = useContext(AllJobsContext);
    const [search, setSearch] = useState<string>("");
    const navigate=useNavigate();


    const filtereddata = useMemo(() => {
        const data = (jobs ?? []).filter((item) =>
            item.description.toLowerCase().includes(search.toLowerCase())
        );
        return data;
    }, [jobs, search]);

    const handleclick=(id:number)=>{
        navigate(`/AIJobs/${id}`);
    }


    return (

        <div>
            <input
                type="text"
                placeholder="Enter the description"
                name="input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div>
                {filtereddata.length > 0 ? (
                    <>
                        {filtereddata.map((item) => (
                            <div key={item.id}>
                                <h1>{item.title}</h1>
                                <p>{item.company}</p>
                                <p>{item.location}</p>
                                <p>{item.salary}</p>
                                <button onClick={()=>handleclick(item.id)}>Data</button>
                            </div>
                        ))}
                    </>

                ) : (<p>No Jobs was Found</p>)}
            </div>


        </div>





    )
}


