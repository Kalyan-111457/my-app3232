import {  type FormEvent, useEffect, useRef } from 'react'

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

    const emailRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);


    useEffect(()=>{
        emailRef.current?.focus();
    },[])


    

    const handleSubmit=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        const email = emailRef.current?.value.trim() ?? "";
        const password = passwordRef.current?.value.trim() ?? "";

        if (!email || !password) {
            alert("Email and password are required");
            return;
        }

        try{
        const response=await LoginVerification(email,password);

                if (response?.token) {

            localStorage.setItem("token", response.token);

            if (response.role === "admin") {
                navigate("/jobs");
            } else if (response.role === "user") {
                navigate("/users");
            }

        } else {
            throw new Error("Invalid response");
        }

      
        }catch(error){
            if(error instanceof Error){
                console.error(error.message);
                alert(error.message);
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
                    <input
                    type='email'
                    placeholder='Enter the Email'
                    name='username'
                    ref={emailRef}
                    />
                </label>

                <label className="login-field">
                    <span>Password</span>
                    <input
                    type='password'
                    placeholder='Enter the Password'
                    name='password'
                    ref={passwordRef}
                    />
                </label>

                <button className="login-button">Login</button>
            </form>
        </section>
    </div>
  )
}

export default LoginForm
