"use client"
import { useUserContext } from '@/app/context/userprofile'
import React, { useState } from 'react'

const page = () => {
  const { leadDetails } = useUserContext()
  const [companyDetails, setCompanyDetails] = useState({
    name: '',
    website_url: '',
    address: '',
    email: '',
    description: '',
    founded_date: '',
    country: '',
    logo: null,
  });

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



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setCompanyDetails(prevDetails => ({
      ...prevDetails,
      logo: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
   
    // const formData = new FormData();
    // formData.append('first_name', leadDetails.first_name);
    // formData.append('last_name', leadDetails.last_name);
    // formData.append('role', leadDetails.role);

    // if (leadDetails.profile_picture) {
    //   formData.append('profile_picture', leadDetails.profile_picture);
    //   formData.append('profile_picture_url', null);
    // } else if (leadDetails.profile_picture_url) {
    //   formData.append('profile_picture_url', leadDetails.profile_picture_url);
    //   formData.append('profile_picture', null);

    // } else {
    //   formData.append('profile_picture_url', null);
    //   formData.append('profile_picture', null);

    // }
    // const csrfToken = getCookie('csrftoken');


    // // Inside your handleSubmit function
    // try {
    //   const response = await fetch('http://localhost:8000/api/setprofile/', {
    //     method: 'POST',
    //     body: formData,
    //     credentials: 'include',
    //     headers: {
    //       'X-CSRFToken': csrfToken,
    //     },

    //   });

    //   if (response.ok) {
    //     console.log("Profile updated successfully.");

    //   } else {

    //     console.error("Failed to update profile.");
    //   }
    // } catch (error) {
    //   console.error("Error updating profile:", error);
    // }


    e.preventDefault();
    const formData = new FormData();
    Object.keys(companyDetails).forEach(key => {
      if (key !== 'logo') {
        formData.append(key, companyDetails[key]);
      }
    });
    if (companyDetails.logo) {
      formData.append('logo', companyDetails.logo);
    }

    try {
      const response = await fetch('http://localhost:8000/api/registerorganization/', {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
        },
      });

      if (response.ok) {
        console.log("Company registered successfully.");
        // Additional logic upon success
      } else {
        console.error("Failed to register company.");
        // Handle failure
      }
    } catch (error) {
      console.error("Error registering company:", error);
    }


  };

  return (
    <>
      <div>
        <p>First Name: {leadDetails.firstname}</p>
        <p>Last Name: {leadDetails.lastname}</p>
        <p>Role: {leadDetails.role}</p>

        {leadDetails.profile_picture_url && (
          <div>
            <p>Profile Picture URL:</p>
            {/* Using an <img> tag for simplicity; you can use Next.js's <Image> if preferred */}
            <img src={leadDetails.profile_picture_url} alt="Profile" style={{ maxWidth: '200px' }} />
          </div>
        )}

      </div>

      <div>
        <h1>Register Your Company</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Company Name"
            value={companyDetails.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="url"
            name="website_url"
            placeholder="Website URL"
            value={companyDetails.website_url}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={companyDetails.address}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={companyDetails.email}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={companyDetails.description}
            onChange={handleInputChange}
          ></textarea>
          <input
            type="date"
            name="founded_date"
            placeholder="Founded Date"
            value={companyDetails.founded_date}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={companyDetails.country}
            onChange={handleInputChange}
          />
          <input
            type="file"
            name="logo"
            onChange={handleFileChange}
          />
          <button type="submit">Register Company</button>
        </form>
      </div>
    </>
  )
}

export default page