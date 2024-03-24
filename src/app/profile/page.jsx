"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css'
import Image from 'next/image';
import { faEdit, faU } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';


export default function Profile() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    role: '',
    profile_picture: null,
    profile_picture_url: '',
  });

  useEffect(() => {
    async function getVerification() {
      const res = await fetch("http://localhost:8000/api/verify/", {
        method: 'GET',
        credentials: 'include', // Important for cookies if using sessions
      });
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated) {
          router.push("/profile");
        } else {
          router.push("/login")
        }
      }
    }

    getVerification();
  }, [router]);


  const handleEditClick = () => {
    router.push("/profile/edit")
  }

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
      console.log(data);
      setUserDetails({
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        email: data.email || '',
        username: data.username || '',
        role: data.role || '',
        profile_picture: data.profile_picture || '/profile.png',
        profile_picture_url: data.profile_picture_url || '',
      });

    }
    fetchUserDetails()

  }, [])
  console.log(userDetails)
  const profileImageSrc = userDetails.profile_picture_url ==="null" ? (userDetails.profile_picture === "/profile.png"
    ? '/profile.png'
    : `http://localhost:8000/${userDetails.profile_picture}`) : userDetails.profile_picture_url;

  return (
    <div className='bg-black'>
      <div className={styles.maindiv}>
        <div className='flex flex-row items-center justify-between'>
          <div className='flex flex-row pt-5 items-center gap-5'>
            {userDetails.profile_picture && (
              <img
                src={profileImageSrc}
                alt="Profile"
                className={styles.image}
                layout="responsive" // or fixed, depending on your layout needs
              />
            )}
            <div className='flex flex-col gap-2'>
              <p className='text-white font-bold text-[30px]'>{userDetails.first_name} {userDetails.last_name}</p>
              <div>
                <div className='p-2 rounded-md border-2 border-[#4F6F52] bg-[#4F6F52]/50 w-[40%] text-center'>
                  <p className='text-white text-[10px]'>Role: {userDetails.role}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <FontAwesomeIcon icon={faEdit} onClick={handleEditClick} className="text-white text-xl cursor-pointer hover:text-[#4F6F52]" />
          </div>
        </div>
        <div className='flex flex-col gap-2 pl-5 pt-5'>
          <div className='flex flex-row gap-2'>
            <FontAwesomeIcon icon={faUser} className="text-white text-md hover:text-[#4F6F52] cursor-pointer" />
            <p className='text-white text-[12px]'>: {userDetails.username}</p>
          </div>
          <div className='flex flex-row gap-2'>
            <FontAwesomeIcon icon={faEnvelope} className="text-white text-md hover:text-[#4F6F52] cursor-pointer" />
            <p className='text-white text-[12px]'>: {userDetails.email}</p>

          </div>

        </div>

      </div>

    </div>
  );
}

