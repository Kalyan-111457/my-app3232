import { useEffect, useState, type FormEvent } from 'react';
import { Input } from '../../../components/input';
import { usersavedata, deleteUsers, AllUserData } from '../api';
import type { UserRequestPayload, UsersData } from '../types';


const UserForm = () => {

    const [email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [fullname, setFullName] = useState("");
    const [Phone, setPhone] = useState("");
    const [bio, setBio] = useState("");
    const [editId, setEditId] = useState<number | null>(null);

    const [AllUsers, setAllUsers] = useState<UsersData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await AllUserData();
            setAllUsers(response || []);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const obj: UserRequestPayload = {
            id: editId || undefined,

            email,
            password: Password,
            fullname,
            phone: Phone,
            bio,
            isAdmin: "user"
        };

        try {
            await usersavedata(obj);
            alert("Created Successfully");
            setDialogOpen(false);

            setEmail("");
            setPassword("");
            setFullName("");
            setPhone("");
            setBio("");
            setEditId(null);


            fetchData();
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                alert(error.message);
            }
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteUsers(id);
            alert("Successfully Deleted");
            fetchData();
        } catch (error) {
            alert("Something went wrong");
        }
    };



    const filteredData = AllUsers.filter((item) =>
        item.fullname.toLowerCase().includes(search.toLowerCase())
    );

    const handleEdit = (item: UsersData) => {
        setDialogOpen(true);
        setEmail(item.email);
        setPassword(item.password);
        setFullName(item.fullname);
        setBio(item.bio);
        setPhone(item.phone);
        setEditId(item.id); 

    }



    return (
        <div>



            <div>
                <h2>All Users CRUD Operations</h2>
                <button type="button" onClick={() => setDialogOpen(!dialogOpen)}>+Add</button>
            </div>

            {dialogOpen && (

                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Full Name' value={fullname} onChange={(e) => setFullName(e.target.value)} />
                    <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type='password' placeholder='Password' value={Password} onChange={(e) => setPassword(e.target.value)} />
                    <input type='text' placeholder='Bio' value={bio} onChange={(e) => setBio(e.target.value)} />
                    <input type='text' placeholder='Phone' value={Phone} onChange={(e) => setPhone(e.target.value)} />

                    <button type='submit'>
                        {editId ? "Update" : "Submit"}
                    </button>
                </form>
            )}

            <input
                type='text'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search by name'
            />

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {filteredData.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>FullName</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Phone</th>
                            <th>Bio</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.fullname}</td>
                                <td>{item.email}</td>
                                <td>{item.password}</td>
                                <td>{item.phone}</td>
                                <td>{item.bio}</td>
                                <td>
                                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                                </td>
                                <td>
                                    <button onClick={() => handleEdit(item)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No Users Found</p>
            )}

        </div>
    );
};

export default UserForm;
