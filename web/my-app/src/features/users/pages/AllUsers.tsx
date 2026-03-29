import  { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { AllUserData } from '../api'
import type { UsersData } from '../types'
import { deleteUsers } from '../api'
import { Input } from '../../../components/input';

interface AllUsersProps {
    setedituser: Dispatch<SetStateAction<UsersData | null>>;
}

const AllUsers = ({ setedituser }: AllUsersProps) => {

    const [data, setData] = useState<UsersData[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const[search,setSearch]=useState<string>("");

    useEffect(() => {
        const fetchingData = async () => {
            try {
                setLoading(true);
                const response = await AllUserData();
                setData(response);
            }
            catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
                else {
                    alert("Some Thing Went Wrong");
                }

            }
            finally {
                setLoading(false);
            }
        }
        fetchingData();
    }, []);

    const filtereddata = data.filter((item) =>
        item.fullname.toLowerCase().includes(search.toLowerCase())
    );


    const handledelete=async(id:number)=>{

        try{
            await deleteUsers(id);
            setData((prev) => prev.filter((item) => item.id !== id));
            alert("SuceessFully Deleted");
        }
        catch(error:unknown){
            if(error instanceof Error){
                console.error(error.message);
            }
        }


        
    }

    return (
        <div>
            {loading ? <p>Loading...</p> : null}
            {!loading && error ? <p>{error.toLowerCase()}</p> : null}

            <Input 
            type='text'
            placeholder='Enter the Username'
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            name='Search'
            />



            <table border={1}>
                <thead>
                    <tr>
                        <th>FullName</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Phone</th>
                        <th>Bio</th>
                        <th>Resume Url</th>
                        <th>CreatedAt</th>
                        <th>Action</th>
                        <th>Edit</th>
                    </tr>

                </thead>
                <tbody>
                    {filtereddata.map((item) => (
                        <tr key={item.id}>
                            <td>{item.fullname}</td>
                            <td>{item.email}</td>
                            <td>{item.password}</td>
                            <td>{item.phone}</td>
                            <td>{item.bio}</td>
                            <td>{item.resumeurl ?? "NULL"}</td>
                            <td>{new Date(item.createdAt).toLocaleString()}</td>
                            <td>
                                <button onClick={() => handledelete(item.id)}>
                                    Delete
                                </button>

                            </td>
                            <td>
                                <button onClick={() => setedituser(item)}>
                                    Edit
                                </button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default AllUsers
