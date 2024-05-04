"use client"
import { useUserContext } from '@/app/context/userprofile';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useContext } from 'react';
import styles from "./page.module.css"
import CustomInputField from '@/app/components/custominputfield/CustomInputField';
import CustomButton from '@/app/components/custombutton/CustomButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
    const { leadDetails, updateLeadDetails } = useUserContext();
    const router = useRouter()


    const [userDetails, setUserDetails] = useState({
        first_name: '',
        last_name: '',
        social_picture: '',
        role: ''
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        tempErrors.first_name = userDetails.first_name ? "" : "First Name is required";
        tempErrors.last_name = userDetails.last_name ? "" : "Last Name is required";
        tempErrors.role = userDetails.role ? "" : "Role is required";
        setErrors(tempErrors);

        // Return true if no errors
        return Object.values(tempErrors).every(x => x === "");
    };
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
        const fetchToken = async () =>{
            const urlParams = new URLSearchParams(window.location.search);
            const refresh = urlParams.get('refresh');
            const access = urlParams.get('access');
            if (access && refresh) {
                console.log('hello')
                console.log(access)
                console.log(refresh)
            }else{
                console.log("nothing")
            }
        }
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
                console.log(data);

                // Check if the user has a profile and redirect accordingly
                if (data.has_profile) {
                    // User has a complete profile, redirect to the profile page
                    router.push('/profile');
                }

            } catch (error) {
                console.error('There was a problem with your fetch operation:', error);
                // Consider redirecting to an error page or showing an error message
            }
        };
        fetchToken();
        fetchUserDetails();
    }, [router]);

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

        if (validate()) {
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
                        toast.success('Profile has been set up successfully!', {
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
                            router.push("/profile");
                        }, 1000);

                    } else {

                        console.error("Failed to update profile.");
                    }
                } catch (error) {
                    console.error("Error updating profile:", error);
                }

            }
        }

    };

    return (
        <div className='bg-black flex items-center justify-center h-screen w-full gap-[60px]'>
            <div className={styles.imageContainer}>
                <label htmlFor="profileImageUpload">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Profile preview" className={styles.circleImage} />
                    ) : userDetails.social_picture ? (
                        <img src={userDetails.social_picture} alt="Profile" className={styles.circleImage} />
                    ) : (
                        <img src="/profile.png" alt="Default User" className={styles.circleImage} />
                    )}
                    <input
                        type="file"
                        id="profileImageUpload"
                        name="profile_picture"
                        onChange={handleImageChange}
                        className={styles.hiddenFileInput}
                        style={{ display: 'none' }} // This hides the input but it is still functional
                    />
                </label>
            </div>

            <div className='flex flex-col gap-5'>
                <p className='text-white font-bold text-[30px]'>Complete Your Profile!</p>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-[#6c757d] text-[13px]'>Username</p>
                        <CustomInputField
                            type="text"
                            id="username"
                            value={userDetails.username}
                            onChange={handleChange}
                            placeholder="Username"
                            className={styles.inputfield}
                            readOnly={true}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='text-[#6c757d] text-[13px]'>Email</p>
                        <CustomInputField
                            type="text"
                            id="email"
                            value={userDetails.email}
                            onChange={handleChange}
                            className={styles.inputfield}
                            readOnly={true}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='text-[#6c757d] text-[13px]'>First Name</p>
                        <CustomInputField
                            type="text"
                            name="first_name" // This should match the state property
                            id="firstname" // ID can be used for labeling and should match the 'for' attribute of the label
                            value={userDetails.first_name === "undefined" ? "" : userDetails.first_name}
                            onChange={handleChange}
                            className={styles.inputfield}
                            placeholder="First Name"
                        />
                        {errors.first_name && <p className="text-red-800 text-[10px]">{errors.first_name}</p>}

                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='text-[#6c757d] text-[13px]'>Last Name</p>
                        <CustomInputField
                            type="text"
                            name="last_name" // This should match the state property
                            id="lastname" // ID can be used for labeling and should match the 'for' attribute of the label
                            value={userDetails.last_name === "undefined" ? "" : userDetails.last_name}
                            onChange={handleChange}
                            className={styles.inputfield}
                            placeholder="Last Name"
                        />
                        {errors.last_name && <p className="text-red-800 text-[10px]">{errors.last_name}</p>}

                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='text-[#6c757d] text-[13px]'>Role</p>
                        <select name="role" value={userDetails.role} onChange={handleChange} className='p-2 rounded-md bg-[#222] border-2 border-[#333] text-white'>
                            <option value="">Select Role</option>
                            <option value="Lead">Lead</option>
                            <option value="Developer">Developer</option>
                            <option value="Gamer">Gamer</option>
                        </select>
                        {errors.role && <p className="text-red-800 text-[10px]">{errors.role}</p>}

                    </div>
                    <CustomButton onClick={handleSubmit} type="submit" className={styles.btnprimary}>
                        Save
                    </CustomButton>

                </div>
            </div>

        </div>
    );
};

export default Page;
