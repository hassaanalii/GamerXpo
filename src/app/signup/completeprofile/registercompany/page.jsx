"use client"
import { useUserContext } from '@/app/context/userprofile'
import React, { useState } from 'react'
import styles from "./page.module.css"
import CustomInputField from '@/app/components/custominputfield/CustomInputField'
import CustomButton from '@/app/components/custombutton/CustomButton'

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
  const [fileName, setFileName] = useState('');


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
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setCompanyDetails(prevDetails => ({
        ...prevDetails,
        logo: file,
        logoName: file.name, // Store the file name in the state
      }));
      setFileName(file.name); // If you have a separate state for the file name
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData1 = new FormData();
    formData1.append('first_name', leadDetails.first_name);
    formData1.append('last_name', leadDetails.last_name);
    formData1.append('role', leadDetails.role);

    if (leadDetails.profile_picture) {
      formData1.append('profile_picture', leadDetails.profile_picture);
      formData1.append('profile_picture_url', null);
    } else if (leadDetails.profile_picture_url) {
      formData1.append('profile_picture_url', leadDetails.profile_picture_url);
      formData1.append('profile_picture', null);

    } else {
      formData1.append('profile_picture_url', null);
      formData1.append('profile_picture', null);

    }
    const csrfToken = getCookie('csrftoken');


    // Inside your handleSubmit function
    try {
      const response = await fetch('http://localhost:8000/api/setprofile/', {
        method: 'POST',
        body: formData1,
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
          'X-CSRFToken': csrfToken,
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
    <div className='bg-black flex items-center justify-center h-screen w-full gap-[60px]'>
      <div className={styles.imagecontainer}>
        <img
          src="/gamebg.jpg"
          alt="GamerXpo Sign Up"
          className={styles.logoimage}
        />
        <div className={styles.imageoverlay}>
          <p className={styles.imagetext}>GamerXpo</p>

        </div>

      </div>
      <div className='flex flex-col gap-3'>
        <p className='text-white font-bold text-[28px]'>Register Your Organization!</p>

        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-0.5'>
            <p className='text-[#6c757d] text-[13px]'>Organization Name</p>
            <CustomInputField
              type="text"
              id="organizationName"
              value={companyDetails.name}
              onChange={handleInputChange}
              placeholder="Name"
              className={styles.inputfield}
            />
          </div>
          <div className='flex flex-col gap-0.5'>
            <p className='text-[#6c757d] text-[13px]'>Website Url</p>
            <CustomInputField
              type="url"
              id="website_url"
              value={companyDetails.website_url}
              onChange={handleInputChange}
              placeholder="Url"
              className={styles.inputfield}
            />
          </div>
          <div className='flex flex-col gap-0.5'>
            <p className='text-[#6c757d] text-[13px]'>Organization Address</p>
            <CustomInputField
              type="address"
              id="address"
              value={companyDetails.address}
              onChange={handleInputChange}
              placeholder="Address"
              className={styles.inputfield}
            />
          </div>
          <div className='flex flex-col gap-0.5'>
            <p className='text-[#6c757d] text-[13px]'>Organization Email</p>
            <CustomInputField
              type="email"
              id="email"
              value={companyDetails.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className={styles.inputfield}
            />
          </div>
          <div className='flex flex-col gap-0.5'>
            <p className='text-[#6c757d] text-[13px]'>Organization Description</p>
            <CustomInputField
              type="text"
              id="description"
              value={companyDetails.description}
              onChange={handleInputChange}
              placeholder="Description"
              className={styles.inputfield}
            />
          </div>
          <div className='flex flex-col gap-0.5'>
            <p className='text-[#6c757d] text-[13px]'>Founded Date</p>
            <CustomInputField
              type="date"
              id="founded_date"
              value={companyDetails.founded_date}
              onChange={handleInputChange}
              placeholder=""
              className={styles.inputfield}
            />
          </div>
          <div className='flex flex-col gap-0.5'>
            <p className='text-[#6c757d] text-[13px]'>Country</p>
            <CustomInputField
              type="text"
              id="country"
              value={companyDetails.country}
              onChange={handleInputChange}
              placeholder="Country"
              className={styles.inputfield}
            />
          </div>

          <div className='flex flex-col gap-0.5'>
            <p className='text-[#6c757d] text-[13px]'>Upload Logo</p>
            <div className='flex items-center gap-4'>
              <label className="block w-[50%] text-center text-sm font-semibold py-2 px-4 rounded-md text-white bg-[#39573c] hover:bg-[#39573c]/50 cursor-pointer">
                <span className="cursor-pointer">Choose file</span>
                <input
                  type="file"
                  name="logo"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {fileName && <p className='text-[#6c757d] text-[13px]'>{fileName}</p>}
            </div>
          </div>
          <CustomButton onClick={handleSubmit} className={styles.btnprimary}>
            Submit
          </CustomButton>
        </div>
      </div>
    </div>

    // <div>
    //   <h1>Register Your Company</h1>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       name="name"
    //       placeholder="Company Name"
    //       value={companyDetails.name}
    //       onChange={handleInputChange}
    //       required
    //     />
    //     <input
    //       type="url"
    //       name="website_url"
    //       placeholder="Website URL"
    //       value={companyDetails.website_url}
    //       onChange={handleInputChange}
    //     />
    //     <input
    //       type="text"
    //       name="address"
    //       placeholder="Address"
    //       value={companyDetails.address}
    //       onChange={handleInputChange}
    //     />
    //     <input
    //       type="email"
    //       name="email"
    //       placeholder="Email"
    //       value={companyDetails.email}
    //       onChange={handleInputChange}
    //     />
    //     <textarea
    //       name="description"
    //       placeholder="Description"
    //       value={companyDetails.description}
    //       onChange={handleInputChange}
    //     ></textarea>
    //     <input
    //       type="date"
    //       name="founded_date"
    //       placeholder="Founded Date"
    //       value={companyDetails.founded_date}
    //       onChange={handleInputChange}
    //     />
    //     <input
    //       type="text"
    //       name="country"
    //       placeholder="Country"
    //       value={companyDetails.country}
    //       onChange={handleInputChange}
    //     />
    //     <input
    //       type="file"
    //       name="logo"
    //       onChange={handleFileChange}
    //     />
    //     <button type="submit">Register Company</button>
    //   </form>
    // </div>

  )
}

export default page