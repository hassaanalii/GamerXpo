"use client"
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const Page = () => {
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        social_picture: '',
    });
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const defaultProfileImg = '/defaultuser.png';


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
                console.log(data)
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
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
        setImagePreview(file ? URL.createObjectURL(file) : userDetails.social_picture || defaultProfileImg);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', userDetails.username);
        formData.append('email', userDetails.email);
        formData.append('first_name', userDetails.first_name);
        formData.append('last_name', userDetails.last_name);

        if (profileImage) {
            formData.append('profile_picture_url', profileImage);
        } else if(userDetails.social_picture) {
            formData.append('profile_picture_url', userDetails.social_picture);

        }else {
            formData.append('profile_picture_url', defaultProfileImg);

        }

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

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

                <div>
                    <p>Profile Picture:</p>
                    <input type="file" name="profile_picture" onChange={handleImageChange} />

                    {imagePreview ? (
                        // If there's an image preview, display it
                        <img src={imagePreview} alt="Profile preview" style={{ maxWidth: '200px' }} />
                    ) : (
                        // If there's no image preview but there's a social picture, display it
                        // Otherwise, display the default image
                        <img
                            src={userDetails.social_picture || defaultProfileImg}
                            alt="Profile"
                            style={{ maxWidth: '200px' }}
                        />
                    )}
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default Page;
