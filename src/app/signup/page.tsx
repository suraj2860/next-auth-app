'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignupPage = () => {

    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        username: "",
        password: ""
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("signup success :: " + response.data);
            router.push('/login');
        } catch (error: any) {
            console.log("Signup failed");
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    },[user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 '>
        <h1>{loading ? "Processing" : "Signup" }</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input 
        className='text-black'
        id='username'
        value={user.username}
        onChange={e => setUser({...user, username: e.target.value})}
        type="text" />
        <label htmlFor="email">email</label>
        <input 
        className='text-black'
        id='email'
        value={user.email}
        onChange={e => setUser({...user, email: e.target.value})}
        type="text" />
        <label htmlFor="password">password</label>
        <input 
        className='text-black'
        id='password'
        value={user.password}
        onChange={e => setUser({...user, password: e.target.value})}
        type="text" />
        <button onClick={handleSignup}>{buttonDisabled ? "No Signup" : "Signup"}</button>
        <Link href={'/login'}>Visit login page</Link>
    </div>
  )
}

export default SignupPage;