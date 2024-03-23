"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomInputField from '@/app/components/custominputfield/CustomInputField';
import CustomButton from '@/app/components/custombutton/CustomButton';
import styles from './page.module.css'

export default function Profile() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    profile_picture: '',
    profile_picture_url: '',
  });
  const [profileImage, setProfileImage] = useState(null); // To hold the file object
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    // Determine which image to show as preview
    if (profileImage) {
      setImagePreview(URL.createObjectURL(profileImage));
    } else if (userDetails.profile_picture && userDetails.profile_picture !== "") {
      setImagePreview(`http://localhost:8000/${userDetails.profile_picture}`);
    } else if (userDetails.profile_picture_url) {
      setImagePreview(userDetails.profile_picture_url);
    } else {
      setImagePreview('/profile.png'); // Default profile image
    }
  }, [profileImage, userDetails.profile_picture, userDetails.profile_picture_url]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('first_name', userDetails.first_name);
    formData.append('last_name', userDetails.last_name);
    formData.append('email', userDetails.email);
    // Add the profile image only if a new one has been selected
    if (profileImage) {
      formData.append('profile_picture', profileImage);
    }
    // Here you would include the logic to send formData to the backend API

    console.log(userDetails);
  };

  useEffect(() => {
    async function fetchUserDetails() {
      const response = await fetch("http://localhost:8000/api/userinformation/", {
        credentials: 'include',
      });
      if (!response.ok) {
        console.error("Failed to fetch user details");
        return;
      }
      const data = await response.json();
      setUserDetails(data);
    }

    fetchUserDetails();
  }, []);

  return (
    <div className='bg-black flex items-center justify-center h-screen w-full gap-[60px]'>
      <div className={styles.imageContainer}>
        <label htmlFor="profileImageUpload" className="cursor-pointer">
          <img src={imagePreview} alt="Profile" className={styles.circleImage} />
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
        <p className='text-white font-bold text-[30px]'>Edit Your Profile!</p>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <p className='text-[#6c757d] text-[13px]'>First Name</p>
            <CustomInputField
              type="text"
              name="first_name"
              id="firstname"
              value={userDetails.first_name}
              onChange={handleChange}
              className={styles.inputfield}
              placeholder="First Name"
            />
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-[#6c757d] text-[13px]'>Last Name</p>
            <CustomInputField
              type="text"
              name="last_name"
              id="lastname"
              value={userDetails.last_name}
              onChange={handleChange}
              className={styles.inputfield}
              placeholder="Last Name"
            />
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-[#6c757d] text-[13px]'>Username</p>

            <CustomInputField
              type="text"
              name="username"
              id="username"
              className={styles.inputfield}
              value={userDetails.username}
              placeholder="Username"
            />
          </div>
          <CustomButton className={styles.btnprimary} onClick={handleSubmit}>Save Changes</CustomButton>
        </div>
      </div>

    </div>
  );
}
