"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomInputField from '@/app/components/custominputfield/CustomInputField';
import CustomButton from '@/app/components/custombutton/CustomButton';
import styles from './page.module.css'

export default function Profile() {
  const router = useRouter();
  const [usernames, setUsernames] = useState([]);
  useEffect(() => {
    async function getVerification() {
      const res = await fetch("http://localhost:8000/api/verify/", {
        method: 'GET',
        credentials: 'include', // Important for cookies if using sessions
      });
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated) {
          router.push("/profile/edit");
        } else {
          router.push("/login")
        }
      }
    }

    getVerification();
  }, [router]);

  const [userDetails, setUserDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
  });




  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const isUsernamePresent = usernames.includes(userDetails.username);

    if (isUsernamePresent) {
      console.log("Username already present");
      return;
    }
    else {
      const formData = new FormData();
      formData.append('first_name', userDetails.first_name);
      formData.append('last_name', userDetails.last_name);
      formData.append('username', userDetails.username);

      console.log(userDetails)

    }


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
    const fetchUsernames = async () => {
      try {
        // Update the URL to match your API endpoint
        const response = await fetch('http://localhost:8000/api/usernames/', {
          credentials: 'include', // If your API requires authentication
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsernames(data.usernames);
        console.log(data.usernames);
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    };
    fetchUsernames();

    fetchUserDetails();
  }, []);

  return (
    <div className='bg-black flex items-center justify-center h-screen w-full gap-[60px]'>
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
              onChange={handleChange}
              placeholder="Username"
            />
          </div>
          <CustomButton className={styles.btnprimary} onClick={handleSubmit}>Save Changes</CustomButton>
        </div>
      </div>

    </div>
  );
}
