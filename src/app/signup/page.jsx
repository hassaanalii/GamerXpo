"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import CustomButton from '../components/custombutton/CustomButton';
import CustomInputField from '../components/custominputfield/CustomInputField';
import styles from './page.module.css'
import Image from 'next/image';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password1: password1,
                    password2: password2,
                }),
            });
            const data = await response.json();

            if (response.ok) {
                console.log(data);
                console.log('Access Token:', data.access);
                toast.success('Signup Successful', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setTimeout(() => {
                    router.push("/login");
                }, 1000);
                
            } else {
                const errorResponse = await response.json();
                toast.error(`Signup Failed: ${errorResponse.error}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setUsername("")
                setEmail("")
                setPassword2("")
                setPassword1("")
                console.log('Signup failed:', errorResponse);

            }
        } catch (error) {

            console.log('There was an error submitting the form:', error);
        }
    };
    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8000/accounts/google/login/';
    };
    const handleLogin = () => {
        router.push("/login")
    }

    return (
        <div className={styles.container}>
            <div className={styles.formcontainer}>
                <div className={styles.imagecontainer}>
                    <img
                        src="/gamebg.jpg"
                        alt="GamerXpo Sign Up"
                        className={styles.logoimage}
                    />
                    <div className={styles.imageoverlay}>
                        <p className={styles.imagetext}>Join GamerXpo</p>
                        <CustomButton onClick={handleLogin} className={styles.imagebutton}>
                            Log In
                        </CustomButton>
                    </div>
                </div>
                <div className={styles.parentdiv}>
                    <p className={styles.subheading}>Create your account</p>
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
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className={styles.inputfield}
                        />
                        <CustomInputField
                            type="password"
                            id="password1"
                            value={password1}
                            onChange={(e) => setPassword1(e.target.value)}
                            placeholder="Password"
                            className={styles.inputfield}
                        />
                        <CustomInputField
                            type="password"
                            id="password2"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            placeholder="Confirm Password"
                            className={styles.inputfield}
                        />
                        <div className="flex flex-col space-y-2">
                            <CustomButton type="submit" className={styles.btnprimary}>
                                Sign Up
                            </CustomButton>
                            <CustomButton onClick={handleGoogleLogin} className={styles.btnsecondary}>
                                <Image src="/googleicon.svg" alt="abc" width={20} height={20} />
                                Sign Up with Google
                            </CustomButton>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                            <p className={styles.text3}>Already have an account?</p>
                            <a href="/login" className={` ${styles.text2} underline text-[#4f6f52]`}>
                                Sign In
                            </a>
                        </div>
                    </form>
                </div>
            </div>
            <div style={{ height: "100px" }}></div>
        </div>
    );
};

export default Signup;
