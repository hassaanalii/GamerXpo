"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css'
import Image from 'next/image';
import { faEdit, faU } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faLink, faAddressCard, faAt, faInfo, faCalendar, faFlag } from '@fortawesome/free-solid-svg-icons';


export default function Profile() {
  const router = useRouter();
  const [userId, setUserId] = useState()
  const [organizationId, setOrganizationId] = useState()

  const [userDetails, setUserDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    role: '',
    profile_picture: null,
    profile_picture_url: '',
  });
  const [organizationDetails, setOrganizationDetails] = useState({
    name: '',
    website_url: '',
    address: '',
    email: '',
    logo: '',
    description: '',
    founded_date: '',
    country: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch('http://localhost:8000/api/getuserid/', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setUserId(data.userId);
      }
    };
    fetchUserData();


  }, []);

  if (userId) {
    const fetchOrganizationId = async () => {
      const response = await fetch(`http://localhost:8000/api/getorganizationid/${userId}`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setOrganizationId(data.organization_id);
      }
    };
    fetchOrganizationId()
  }
  if (organizationId) {

  }


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
  const handleEditOrganization = () => {
    router.push("/profile/editorganization")
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

      if (data.role === 'Lead') {
        const response = await fetch("http://localhost:8000/api/organization/", {
          credentials: 'include',
        });
        if (!response.ok) {
          console.error("Failed to fetch organization details");
          return;
        }
        const orgData = await response.json();
        setOrganizationDetails({
          name: orgData.name || '',
          website_url: orgData.website_url || '',
          address: orgData.address || '',
          email: orgData.email || '',
          logo: orgData.logo || '/profile.png',
          description: orgData.description || '',
          founded_date: orgData.founded_date || '',
          country: orgData.country || '',

        });

      }else if (data.role === "Developer"){

        const response = await fetch("http://localhost:8000/api/userorganization/", {
          credentials: 'include',
        });
        if (!response.ok) {
          console.error("Failed to fetch organization details");
          return;
        }
        const userorganization = await response.json()

        if(!userorganization.organization_id) {
          console.log("hello")
        }else{
          console.log("bye")
        }
      }

    }

    fetchUserDetails()

  }, [])
  console.log(userDetails)
  const profileImageSrc = userDetails.profile_picture_url === "null" ? (userDetails.profile_picture === "/profile.png"
    ? '/profile.png'
    : `http://localhost:8000/${userDetails.profile_picture}`) : userDetails.profile_picture_url;

  const organizationImageSrc = `http://localhost:8000/${organizationDetails.logo}`
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
                <div className='p-2 rounded-md border-2 border-[#4F6F52] bg-[#4F6F52]/50 w-[80%] text-center'>
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
        {
          userDetails.role === "Lead" && (
            <div className='bg-white mt-10 rounded-lg py-7 px-10'>
              <div className='flex flex-row  justify-between'>
                <div className='flex flex-col gap-2'>
                  <div className='flex flex-row items-center justify-between'>
                    <p className='font-bold text-[30px]'>{organizationDetails.name}</p>
                    <FontAwesomeIcon icon={faEdit} onClick={handleEditOrganization} className="text-black text-xl cursor-pointer hover:text-[#4F6F52]" />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex gap-2'>
                      <div style={{ width: "30px" }}>
                        <FontAwesomeIcon icon={faLink} className="text-black text-md mt-0.5 flex  cursor-pointer hover:text-[#4F6F52]" />
                      </div>
                      <a href={organizationDetails.website_url} className='text-[13px] underline'>{organizationDetails.website_url}</a>
                    </div>
                    <div className='flex gap-2'>
                      <div style={{ width: "30px" }}>
                        <FontAwesomeIcon icon={faAddressCard} className="text-black text-md mt-0.5 flex  cursor-pointer hover:text-[#4F6F52]" />
                      </div>
                      <p className='text-[13px]'>{organizationDetails.address}</p>
                    </div>
                    <div className='flex gap-2'>
                      <div style={{ width: "30px" }}>
                        <FontAwesomeIcon icon={faAt} className="text-black text-md mt-0.5 flex  cursor-pointer hover:text-[#4F6F52]" />
                      </div>
                      <p className='text-[13px]'>{organizationDetails.email}</p>
                    </div>
                    <div className='flex gap-2'>
                      <div style={{ width: "30px" }}>
                        <FontAwesomeIcon icon={faInfo} className="text-black text-md mt-0.5 flex  cursor-pointer hover:text-[#4F6F52]" />
                      </div>
                      <p className='text-[13px]'>{organizationDetails.description}</p>
                    </div>
                    <div className='flex gap-2'>
                      <div style={{ width: "30px" }}>
                        <FontAwesomeIcon icon={faCalendar} className="text-black text-md mt-0.5 flex  cursor-pointer hover:text-[#4F6F52]" />
                      </div>
                      <p className='text-[13px]'>{organizationDetails.founded_date}</p>
                    </div>
                    <div className='flex gap-2'>
                      <div style={{ width: "30px" }}>
                        <FontAwesomeIcon icon={faFlag} className="text-black text-md mt-0.5 flex  cursor-pointer hover:text-[#4F6F52]" />
                      </div>
                      <p className='text-[13px]'>{organizationDetails.country}</p>
                    </div>

                  </div>

                </div>
                <img
                  src={organizationImageSrc}
                  alt="Profile"
                  className={styles.image2}
                  layout="responsive"
                />

              </div>

            </div>
          )
        }

      </div>

    </div>
  );
}

