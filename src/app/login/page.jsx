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
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const router = useRouter()

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Reset errors
        setUsernameError('');
        setPasswordError('');

        if (!username.trim()) {
            setUsernameError('Username is required');
            return; // Stop the function if there is an error
        }
        if (!password) {
            setPasswordError('Password is required');
            return; // Stop the function if there is an error
        }
        const csrfToken = getCookie('csrftoken');

        try {
            const response = await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                credentials: 'include', // Include cookies with the request
                body: JSON.stringify({ username, password }),
            });



            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                if (data.has_profile) {
                    router.push('/profile');
                } else {
                    router.push('/signup/completeprofile');
                }
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
                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
                    <div className='flex flex-col gap-0.5'>
                        {usernameError && (
                            <p className="text-red-500 text-[10px]">{usernameError}</p>
                        )}
                        <CustomInputField
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className={styles.inputfield}
                        />
                    </div>
                    <div>
                        {passwordError && (
                            <p className="text-red-500 text-[10px]">{passwordError}</p>
                        )}
                        <CustomInputField
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className={styles.inputfield}
                        />
                    </div>
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
