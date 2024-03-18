"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const router = useRouter()
    const [userDetails, setUserDetails] = useState(null);


    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submit behavior

        // Construct the POST request to send form data to the server
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
                // const fetchUserDetails = async () => {
                //     try {
                //         const response = await fetch('http://localhost:8000/api/userdetails/', {
                //             credentials: 'include',
                //         });
                //         if (!response.ok) {
                //             throw new Error('Network response was not ok');
                //         }
                //         const data = await response.json();
                //         setUserDetails(data);
                //     } catch (error) {
                //         console.error('There was a problem with your fetch operation:', error);
                //     }
                // };

                // fetchUserDetails();
            } else {
                // Extract and log the error response from the server
                const errorResponse = await response.json();
                console.log('Signup failed:', errorResponse);

            }
        } catch (error) {
            // Handle the error here, such as a network error
            console.log('There was an error submitting the form:', error);
        }
    };
    const handleGoogleLogin = () => {
        // Redirect the user to your backend endpoint that handles Google OAuth
        window.location.href = 'http://localhost:8000/accounts/google/login/';

    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}

                    />
                </div>
                <div>
                    <label htmlFor="email">Email (optional):</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password1">Password:</label>
                    <input
                        type="password"
                        id="password1"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}

                    />
                </div>
                <div>
                    <label htmlFor="password2">Password (again):</label>
                    <p>? when hover on it Your password can’t be too similar to your other personal information.
                        Your password must contain at least 8 characters.
                        Your password can’t be a commonly used password.
                        Your password can’t be entirely numeric. should be shown </p>
                    <input
                        type="password"
                        id="password2"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}

                    />
                </div>
                <button type="submit">Sign Up</button>
                <p>already have an account signin</p>
                <button type="button" onClick={handleGoogleLogin}>Signup with Google</button>

            </form>
        </div>
    );
};

export default Signup;
