import React, { useState, type FormEvent } from 'react';
import { Input } from '../../../components/input';
import { usersavedata } from '../api';

const UserForm = () => {

    const [email, setEmail] = useState<string>("");
    const [Password, setPassword] = useState<string>("");
    const [fullname, setFullName] = useState<string>("");
    const [Phone, setPhone] = useState<string>("");
    const [bio, setBio] = useState<string>("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const obj = {
            email: email,
            password: Password,
            fullname: fullname,
            phone: Phone,
            bio: bio
        }

        try{

        await usersavedata(obj);

        setEmail("");
        setPassword("");
        setBio("");
        setPhone("");
        setFullName("");

        }catch(error){
            if(error instanceof Error){
                alert(error);

            }
            else{
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
                <button type='submit'>Submit</button>
            </form>



        </div>
    )
}

export default UserForm
