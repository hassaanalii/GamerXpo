"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import styles from './page.module.css'
import CustomButton from '../components/custombutton/CustomButton';
import CustomInputField from '../components/custominputfield/CustomInputField';
import Image from 'next/image';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies with the request
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json(); // Parse the JSON response

            if (response.ok) {
                console.log('Login successful:', data);
                router.push('/signup/completeprofile')

            } else {
                console.error('Login failed:', data.detail);

            }
        } catch (error) {
            console.error('Network error:', error);

        }
    };
    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8000/accounts/google/login/';
    };
    const handleSignup = () => {
        router.push("/signup")
    };

    return (
        <div className={styles.container}>
            <div className={styles.formcontainer}>
                <div className={styles.imagecontainer}>
                    <img
                        src="/gamebg.jpg"
                        alt="Your Image Description"
                        className={styles.logoimage}
                    />
                    <div className={styles.imageoverlay}>
                        <p className={styles.imagetext}>Welcome to GamerXpo</p>
                        <CustomButton onClick={handleSignup} className={styles.imagebutton}>
                            Sign Up
                        </CustomButton>
                    </div>
                </div>
                <p className={styles.subheading}>Welcome Back!</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <CustomInputField
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className={styles.inputfield}
                    />
                    <CustomInputField
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className={styles.inputfield}
                    />
                    <div className="flex flex-col space-y-2">
                        <CustomButton
                            onClick={handleSubmit}
                            type="submit"
                            className={styles.btnprimary}
                        >
                            Login
                        </CustomButton>
                        <CustomButton onClick={handleGoogleLogin} className={styles.btnsecondary}>
                            <Image src="/googleicon.svg" alt="abc" width={20} height={20} />
                            Login with Google
                        </CustomButton>
                    </div>
                    <div className={styles.lastdiv}>
                        <a href="/forgot-password" className={styles.text2}>
                            Forgot your username or password?
                        </a>
                        <div className='flex items-center justify-center gap-1'>
                            <p className={styles.text2}>New to GamerXpo?</p>
                            <a href="/signup" className={` ${styles.text2} underline`}>
                                Sign Up 
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
