import { useEffect, useState, type Dispatch, type FormEvent, type SetStateAction } from 'react';
import { Input } from '../../../components/input';
import { usersavedata } from '../api';
import type { UserRequestPayload, UsersData } from '../types';

interface UserFormProps {
    edituser: UsersData | null;
    setedituser: Dispatch<SetStateAction<UsersData | null>>;
}
const UserForm = ({ edituser, setedituser }: UserFormProps) => {

    const [email, setEmail] = useState<string>("");
    const [Password, setPassword] = useState<string>("");
    const [fullname, setFullName] = useState<string>("");
    const [Phone, setPhone] = useState<string>("");
    const [bio, setBio] = useState<string>("");


    useEffect(() => {
        if (edituser) {
            setEmail(edituser.email);
            setPassword(edituser.password);
            setFullName(edituser.fullname);
            setPhone(edituser.phone);
            setBio(edituser.bio);
        } else {
            setEmail("");
            setPassword("");
            setFullName("");
            setPhone("");
            setBio("");
        }
    }, [edituser]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const obj: UserRequestPayload = {
            id: edituser?.id,
            email: email,
            password: Password,
            fullname: fullname,
            phone: Phone,
            bio: bio
        };

        try {

            if (edituser) {
                await usersavedata(obj);
                alert("Updated Successfully");
                setedituser(null);
            } else {
                await usersavedata(obj);
                alert("Created Successfully");
            }


            setedituser(null);

        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);

            }
            else {
                alert("Something Went Wrong");
            }
        }
    }

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <label>Full Name</label>
                <Input
                    type='text'
                    placeholder='Enter the Full Name'
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                    name='fullname'
                />

                <label>email</label>
                <Input
                    type='email'
                    placeholder='Enter the Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name='email'
                />
                <label>Password</label>
                <Input
                    type='password'
                    placeholder='Enter the Password'
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    name='password'
                />

                <label>Bio</label>

                <Input
                    type='text'
                    placeholder='Enter the Bio'
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    name='bio'
                />

                <label>Phone</label>
                <Input
                    type='text'
                    placeholder='Enter the Phone No'
                    value={Phone}
                    onChange={(e) => setPhone(e.target.value)}
                    name='phone'
                />
                <button type='submit'>{edituser ? "Update" : "Submit"}
                </button>
            </form>
        </div>
    )
}

export default UserForm
