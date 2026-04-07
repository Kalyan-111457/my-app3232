import { useEffect, useState, type FormEvent } from 'react';
import { usersavedata, deleteUsers, AllUserData } from '../api';
import type { UserRequestPayload, UsersData } from '../types';
import "./Css/UserForm.css";


const UserForm = () => {

    const [email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [fullname, setFullName] = useState("");
    const [Phone, setPhone] = useState("");
    const [bio, setBio] = useState("");
    const [isAdmin, setIsAdmin] = useState("user");
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
            isAdmin
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
            setIsAdmin("user");
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
        } catch {
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
        setIsAdmin(item.isAdmin);
        setEditId(item.id);

    }



    return (

                <div className="users-page">

            {/* Header */}
            <div className="users-header">
                <h1>All Users <span>CRUD</span> Operations</h1>
                <button type="button" className="btn-add" onClick={() => setDialogOpen(!dialogOpen)}>
                    + Add User
                </button>
            </div>

            {/* Form Card */}
            {dialogOpen && (
                <div className="form-card">
                    <h2>{editId ? "Edit User" : "Create New User"}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter full name"
                                    value={fullname}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    value={Password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    placeholder="Enter phone number"
                                    value={Phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="form-group full-width">
                                <label>Bio</label>
                                <input
                                    type="text"
                                    placeholder="Enter bio"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-actions">
                            <button
                                type="button"
                                className="btn-cancel"
                                onClick={() => {
                                    setDialogOpen(false);
                                    setEditId(null);
                                    setEmail("");
                                    setPassword("");
                                    setFullName("");
                                    setPhone("");
                                    setBio("");
                                }}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn-submit">
                                {editId ? "Update User" : "Create User"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Table Section */}
            <div className="table-section">
                <div className="table-toolbar">
                    <div className="search-wrap">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <span className="table-count">{filteredData.length} users found</span>
                </div>

                {loading && <div className="state-loading">Loading users...</div>}
                {error && <div className="state-error">{error}</div>}

                <div className="table-card">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Phone</th>
                                <th>Bio</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length === 0 && !loading && (
                                <tr>
                                    <td colSpan={6} className="state-empty">No users found.</td>
                                </tr>
                            )}
                            {filteredData.map((item) => (
                                <tr key={item.id}>
                                    <td><strong>{item.fullname}</strong></td>
                                    <td>{item.email}</td>
                                    <td>{item.password}</td>
                                    <td><span className="badge-phone">{item.phone}</span></td>
                                    <td>{item.bio}</td>
                                    <td>
                                        <div className="action-cell">
                                            <button className="btn-edit" onClick={() => handleEdit(item)}>✏ Edit</button>
                                            <button className="btn-delete" onClick={() => handleDelete(item.id)}>🗑 Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )

}
export default UserForm;
