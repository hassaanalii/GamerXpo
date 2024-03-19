"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import CustomButton from '../components/custombutton/CustomButton';
import CustomInputField from '../components/custominputfield/CustomInputField';
import styles from './page.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

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

            if (response.ok) {
                console.log("hello");
                router.push("/login")
            } else {

                const errorResponse = await response.json();
                console.log('Signup failed:', errorResponse);

            }
        } catch (error) {

            console.log('There was an error submitting the form:', error);
        }
    };
    const handleGoogleLogin = () => {
        // Redirect the user to your backend endpoint that handles Google OAuth
        window.location.href = 'http://localhost:8000/accounts/google/login/';

    };

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
                        <CustomButton onClick={handleGoogleLogin} className={styles.imagebutton}>
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
                                <FontAwesomeIcon icon={faGoogle} className="mr-2 fa-icon" />
                                Sign Up with Google
                            </CustomButton>
                        </div>
                        <div className={styles.lastdiv}>
                            <a href="/login" className={styles.text2}>
                                Already have an account? Sign In
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
