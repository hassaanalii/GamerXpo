"use client"
import { useUserContext } from '@/app/context/userprofile';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useContext } from 'react';

const Page = () => {
    const {leadDetails, updateLeadDetails } = useUserContext();
    const router = useRouter()

    const [userDetails, setUserDetails] = useState({
        first_name: '',
        last_name: '',
        social_picture: '',
        role: ''
    });
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const defaultProfileImg = '/defaultuser.png';

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

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

        if (userDetails.role === 'Lead') {
            console.log("hello")
            updateLeadDetails({
                firstname: userDetails.first_name,
                lastname: userDetails.last_name,
                role: userDetails.role,
                profile_picture: profileImage, 
                profile_picture_url: userDetails.social_picture || null,
            });
            
            router.push('/signup/completeprofile/registercompany/')

        } else {
            const formData = new FormData();
            formData.append('first_name', userDetails.first_name);
            formData.append('last_name', userDetails.last_name);
            formData.append('role', userDetails.role);


            if (profileImage) {
                formData.append('profile_picture', profileImage);
                formData.append('profile_picture_url', null);
            } else if (userDetails.social_picture) {
                formData.append('profile_picture_url', userDetails.social_picture);
                formData.append('profile_picture', null);

            } else {
                formData.append('profile_picture_url', null);
                formData.append('profile_picture', null);

            }
            const csrfToken = getCookie('csrftoken');


            // Inside your handleSubmit function
            try {
                const response = await fetch('http://localhost:8000/api/setprofile/', {
                    method: 'POST',
                    body: formData,
                    credentials: 'include',
                    headers: {
                        'X-CSRFToken': csrfToken,
                    },

                });

                if (response.ok) {
                    console.log("Profile updated successfully.");

                } else {

                    console.error("Failed to update profile.");
                }
            } catch (error) {
                console.error("Error updating profile:", error);
            }

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
                <label>
                    Role:
                    <select name="role" value={userDetails.role} onChange={handleChange}>
                        <option value="">Select Role</option>
                        <option value="Lead">Lead</option>
                        <option value="Developer">Developer</option>
                        <option value="Gamer">Gamer</option>
                    </select>
                </label>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default Page;
