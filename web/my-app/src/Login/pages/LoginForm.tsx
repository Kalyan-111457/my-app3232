import { type ChangeEvent, type FormEvent, useEffect } from 'react'
import { useState } from 'react'
import type{ LoginModel } from '../LoginModel'
import { Input } from '../../components/input'
import { LoginVerification } from '../app'
import { useNavigate } from 'react-router-dom'
import './LoginForm.css'

const LoginForm = () => {

    const navigate=useNavigate();

    useEffect(() => {
        document.body.classList.add('login-page');
        return () => {
            document.body.classList.remove('login-page');
        };
    }, []);

    const [data,setData]=useState<LoginModel>({
        username:"",
        password:""
    });

    const handlechange=async(e:ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;
        setData((prev)=>({
            ...prev,[name]:value
    }))
    }

    const handleSubmit=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        try{
        const response=await LoginVerification(data.username,data.password);

        if(response){
            if(response==='admin'){
                navigate("/jobs")
            }
            else if(response==='user'){
                navigate("/users")
            }
        }
        else{
            throw new Error(response.data);
        }
        }catch(error){
            if(error instanceof Error){
                console.error(error.message);
                throw new Error(error.message);
            }
            else{
                alert("SomeThing Went Wrong");

            }
        }
    }



  return (
    <div className="login-shell">
        <div className="login-orb login-orb-one" />
        <div className="login-orb login-orb-two" />
        <div className="login-grid" />

        <section className="login-panel">
            <div className="login-copy">
                <p className="login-kicker">Job Application Portal</p>
                <h1>Welcome back</h1>
                <p className="login-subtitle">
                    Please Enter username and password to change your carrier
                    
                </p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
                <label className="login-field">
                    <span>Email Address</span>
                    <Input
                    type='email'
                    placeholder='Enter the Email'
                    value={data.username}
                    name='username'
                    onChange={handlechange}
                    />
                </label>

                <label className="login-field">
                    <span>Password</span>
                    <Input
                    type='password'
                    placeholder='Enter the Password'
                    value={data.password}
                    onChange={handlechange}
                    name='password'
                    />
                </label>

                <button className="login-button">Login</button>
            </form>
        </section>
    </div>
  )
}

export default LoginForm
