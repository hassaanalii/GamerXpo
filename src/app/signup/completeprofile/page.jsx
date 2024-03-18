"use client"
import React, { useState, useEffect } from 'react'

const Page = () => {
    const [userDetails, setUserDetails] = useState(null);

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
    }, []); // The empty array ensures this effect runs once on mount

    return (
        <div>
            <h1>User Details</h1>
            {userDetails ? (
                <div>
                    <p>Username: {userDetails.username}</p>
                    <p>Email: {userDetails.email}</p>
                    <p>First Name: {userDetails.first_name}</p>
                    <p>Last Name: {userDetails.last_name}</p>
                    {userDetails.social_picture && (
                        <div>
                            <p>Social Name: {userDetails.social_name}</p>
                            <img src={userDetails.social_picture} alt="Profile" />
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Page;
