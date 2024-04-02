"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css'
import Image from 'next/image';
import { faEdit, faU } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faLink, faAddressCard, faAt, faInfo, faCalendar, faFlag, faExclamationTriangle, faSignOut } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '../components/custombutton/CustomButton';
import EmployeeCard from '../components/employeecard/EmployeeCard';
import Modal from '../components/modal/modal';


export default function Profile() {
  const router = useRouter();
  const [userId, setUserId] = useState()
  const [organizationId, setOrganizationId] = useState()
  const [secretKey, setSecretKey] = useState('');

  const handleKeyChange = (event) => {
    setSecretKey(event.target.value);
  };
  const [developerProfiles, setDeveloperProfiles] = useState([]);


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

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const handleDeleteIconClick = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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

  const handleJoinClick = async () => {
    const formData = new FormData();
    formData.append('secret_key', secretKey);

    try {
      const response = await fetch('http://localhost:8000/api/joinorganization/', {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Organization ID:", data.organization_id);
        try {
          const response = await fetch('http://localhost:8000/api/updateorganizationinuserprofile/', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': getCookie('csrftoken'),
            },
            credentials: 'include',
            body: JSON.stringify({ organization_id: data.organization_id }),
          });

          if (response.ok) {
            console.log("User profile updated successfully.");
          } else {
            const errorData = await response.json();
            console.error("Failed to update user profile:", errorData.error);
          }
        } catch (error) {
          console.error("Error updating user profile:", error);
        }


      } else {
        const errorData = await response.json();
        console.error("Join organization failed:", errorData.error);
        setSecretKey("");
      }
    } catch (error) {
      console.error("Error joining organization:", error);
    }
  }

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

      } else if (data.role === "Developer") {

        const response = await fetch("http://localhost:8000/api/userorganization/", {
          credentials: 'include',
        });
        if (!response.ok) {
          console.error("Failed to fetch organization details");
          return;
        }
        const userorganization = await response.json()
        console.log(userorganization)

        if (!userorganization.organization_id) {
          console.log("Doesnot exist")
        } else {
          const response = await fetch(`http://localhost:8000/api/organizationbyid/${userorganization.organization_id}/`, {
            credentials: 'include',
          });

          if (!response.ok) {
            throw new Error('Failed to load organization details');
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
        }
      }

    }
    const fetchDeveloperProfiles = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/getdevelopers/', {
          method: 'GET',
          credentials: 'include', // for cookies to be sent
          headers: {
            'Content-Type': 'application/json',
            // Other headers like Authorization if you use it
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch developer profiles');
        }

        const data = await response.json();
        console.log(data);
        setDeveloperProfiles(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchUserDetails()
    fetchDeveloperProfiles();

  }, [])

  const handleLogoutClick = async () => {
    try {
      const response = await fetch('http://localhost:8000/accounts/logout/', {
        method: 'POST',
        headers: {
          'X-CSRFToken': getCookie('csrftoken'), // function to get the CSRF token from cookies
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This is important to include cookies
      });

      if (response.ok) {
        // Successfully logged out
        console.log('Logout successful');
        // Redirect to homepage or login page
        router.push('/login'); // or whatever your login route is
      } else {
        // Handle any errors
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('There was an error logging out:', error);
    }
  }


  // console.log(userDetails)
  // console.log(secretKey)

  const profileImageSrc = userDetails.profile_picture_url === "null" ? (userDetails.profile_picture === "/profile.png"
    ? '/profile.png'
    : `http://localhost:8000/${userDetails.profile_picture}`) : userDetails.profile_picture_url;

  const organizationImageSrc = `http://localhost:8000/${organizationDetails.logo}`
  const areOrganizationDetailsSet = Object.values(organizationDetails).some(detail => detail);

  // console.log(areOrganizationDetailsSet)

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/removeuserfromorg/${selectedEmployeeId}/`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
      });

      if (response.ok) {
        console.log('User removed successfully');
      } else {
        throw new Error('Failed to remove the user');
      }
    } catch (err) {
      console.error(err.message);
    }
    setModalOpen(false);
  };

  return (
    <div className='bg-black h-screen overflow-auto'>
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
          <div className='flex items-center justify-center gap-8'>
            <FontAwesomeIcon icon={faEdit} onClick={handleEditClick} className="text-white text-xl cursor-pointer hover:text-[#4F6F52]" />
            <FontAwesomeIcon icon={faSignOut} onClick={handleLogoutClick} className="text-red-800 text-xl cursor-pointer hover:text-white" />

          </div>
        </div>
        <div className='flex flex-col gap-2 pl-5 pt-5'>
          <div className='flex flex-row gap-2'>
            <FontAwesomeIcon icon={faUser} className="text-white text-md hover:text-[#4F6F52] cursor-pointer" />
            <p className='text-white text-[12px]'>: {userDetails.username}</p>
          </div>
          {userDetails.email && (
            <div className='flex flex-row gap-2'>
              <FontAwesomeIcon icon={faEnvelope} className="text-white text-md hover:text-[#4F6F52] cursor-pointer" />
              <p className='text-white text-[12px]'>: {userDetails.email}</p>

            </div>
          )}

          {userDetails.role === "Developer" && !areOrganizationDetailsSet && (
            <div className='flex flex-row gap-2'>
              <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 text-md hover:text-white cursor-pointer" />
              <p className='text-red-500 font-bold text-[12px]'>You are not a part of any organization!</p>

            </div>
          )}


        </div>

        {userDetails.role === "Developer" && !areOrganizationDetailsSet && (
          <div className='mt-10 flex flex-col'>
            <div>
              <p className='font-bold text-[30px] text-white'>Join an Organization</p>
            </div>
            <div className='flex items-center justify-center mt-3 gap-5'>
              <input
                type="password"
                value={secretKey}
                onChange={handleKeyChange}
                className="w-[90%] p-3 mb-4 border border-gray-700 bg-gray-800 text-white rounded-lg h-9"
                placeholder="Enter Secret Key"
              />
              <CustomButton onClick={handleJoinClick} className={styles.btnprimary}>
                Join
              </CustomButton>
            </div>
          </div>
        )}

        {
          (userDetails.role === "Lead" || userDetails.role === "Developer") && areOrganizationDetailsSet && (
            <div className='bg-white mt-10 rounded-lg py-7 px-10'>
              <div className='flex flex-row  justify-between'>
                <div className='flex flex-col gap-2'>
                  <div className='flex flex-row items-center justify-between'>
                    <p className='font-bold text-[30px]'>{organizationDetails.name}</p>
                    {userDetails.role === "Lead" && (
                      <FontAwesomeIcon icon={faEdit} onClick={handleEditOrganization} className="text-black text-xl cursor-pointer hover:text-[#4F6F52]" />
                    )}
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

        {
          userDetails.role === "Lead" && developerProfiles.length > 0 && (
            <div className='flex flex-col py-4 mt-5'>
              <p className='text-white font-bold text-[26px]'>Employees</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {developerProfiles.map((profile, index) => (
                  <EmployeeCard key={index} profile={profile} onDeleteIconClick={handleDeleteIconClick} />
                ))}
              </div>
            </div>
          )
        }

      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onConfirm={handleConfirmDelete} />


    </div>
  );
}

