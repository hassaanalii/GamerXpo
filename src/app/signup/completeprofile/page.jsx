"use client"
import React, { useState, useEffect } from 'react';

const Page = () => {
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        social_name: '',
        social_picture: '',
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/userdetails/', {
                    method: 'GET',
                    credentials: 'include', // Include cookies with the request
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUserDetails(data);
            } catch (error) {
                console.error('There was a problem with your fetch operation:', error);
            }
        };

        fetchUserDetails();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevDetails => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you would send the userDetails to the backend to update the user details
        console.log(userDetails);
    };

    return (
        <div>
            <h1>Edit User Details</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={userDetails.username} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={userDetails.email} onChange={handleChange} />
                </label>
                <label>
                    First Name:
                    <input type="text" name="first_name" value={userDetails.first_name} onChange={handleChange} />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="last_name" value={userDetails.last_name} onChange={handleChange} />
                </label>
                {userDetails.social_picture && (
                    <div>
                        <label>
                            Social Name:
                            <input type="text" name="social_name" value={userDetails.social_name || ''} onChange={handleChange} />
                        </label>
                        <p>Profile Picture:</p>
                        <img src={userDetails.social_picture} alt="Profile" style={{ maxWidth: "200px" }} />
                    </div>
                )}
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default Page;
