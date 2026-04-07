import { useContext, useEffect, useMemo, useRef, useState } from "react"

import { Link } from "react-router-dom";
import { JobContext } from "./CreateContextSingleJob";
import { AllJobsContext } from "./AllJobsCreateContext";
const UserHomePage = () => {
    const [search, setSearch] = useState<string>("");
    const focusing = useRef<HTMLInputElement>(null);
    const {setItems}=useContext(JobContext);
    const { jobs } = useContext(AllJobsContext);

    useEffect(() => {
        focusing.current?.focus();
    }, []);
    
    const filtereddata = useMemo(() => {
        const data = (jobs ?? []).filter((item) =>
            item.description.toLowerCase().includes(search.toLowerCase())
        );
        return data;
    }, [jobs, search]);



    return (
        <div>

            <input
                ref={focusing}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                name="search"
                placeholder="Enter the Skills"
            />


            {filtereddata.length > 0 ? (
                <>


                    {filtereddata.map((item) => (
                        <div key={item.id}>
                            <h3>{item.company}</h3>
                            <h3>{item.description.substring(0, 25)}</h3>
                            <Link to="/ApplyJob">
                                <button onClick={()=>setItems(item)}>
                                    Apply For Job
                                </button>

                          </Link>


                        </div>
                    ))}

                </>

            ) : (<p>No Jobs was Found</p>)}


        </div>
    )
}

export default UserHomePage
