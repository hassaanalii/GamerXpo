"use client"
import { useUserContext } from '@/app/context/userprofile'
import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import CustomInputField from '@/app/components/custominputfield/CustomInputField'
import CustomButton from '@/app/components/custombutton/CustomButton'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
  const { leadDetails } = useUserContext()
  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState()

  const router = useRouter()
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

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = companyDetails.name ? "" : "Organization Name is required";
    tempErrors.website_url = companyDetails.website_url ? "" : "Website URL is required";
    tempErrors.address = companyDetails.address ? "" : "Address is required";
    tempErrors.email = (/^\S+@\S+\.\S+$/).test(companyDetails.email) ? "" : "Email is invalid";
    tempErrors.description = companyDetails.description ? "" : "Description is required";
    tempErrors.founded_date = companyDetails.founded_date ? "" : "Founded Date is required";
    tempErrors.country = companyDetails.country ? "" : "Country is required";
    tempErrors.logo = companyDetails.logo ? "" : "Logo is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

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
    console.log(`Setting ${name} to ${value}`); // Add a log to debug
    setCompanyDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
    setErrors({ ...errors, [name]: "" });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompanyDetails(prevDetails => ({
        ...prevDetails,
        logo: file,
        logoName: file.name, // Store the file name in the state
      }));
      setFileName(file.name);
      setErrors({ ...errors, logo: "" });// If you have a separate state for the file name
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      console.error("Validation failed.");
      return;
    }
    else {


      const formData1 = new FormData();
      formData1.append('first_name', leadDetails.firstname);
      formData1.append('last_name', leadDetails.lastname);
      console.log(leadDetails.role)
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
          const userProfile = await response.json();

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
          const orgData = await response.json(); // Assuming this contains the organization ID
          const organizationId = orgData.id;
          console.log(organizationId);
          const userUpdateResponse = await fetch(`http://localhost:8000/api/updateuserprofilewithorganization/${userId}/`, {
            method: 'PATCH',
            body: JSON.stringify({ organization: organizationId }),
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': getCookie('csrftoken'),
            },
            credentials: 'include',
          });

          if (userUpdateResponse.ok) {
            console.log("UserProfile updated with organization ID.");
            toast.success('Company Registered Successfully', {
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
            console.error("Failed to update UserProfile with organization ID.");
            toast.error(`Failed to update UserProfile with organization ID`, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }

        } else {
          console.error("Failed to register company.");
          // Handle failure
          toast.error(`Organization Name Already Exists!`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } catch (error) {
        console.error("Error registering company:", error);
      }

    }
  };
  console.log(leadDetails)

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
              name="name"
              value={companyDetails.name}
              onChange={handleInputChange}
              placeholder="Name"
              className={styles.inputfield}
            />
            {errors.name && <p className="text-red-800 text-[10px]">{errors.name}</p>}

          </div>
          <div className='flex flex-col gap-0.5'>
            <p className='text-[#6c757d] text-[13px]'>Website Url</p>
            <CustomInputField
              type="url"
              id="website_url"
              name="website_url"
              value={companyDetails.website_url}
              onChange={handleInputChange}
              placeholder="Url"
              className={styles.inputfield}

            />
            {errors.website_url && <p className="text-red-800 text-[10px]">{errors.website_url}</p>}

          </div>
          <div className='flex flex-col gap-0.5'>
            <p className='text-[#6c757d] text-[13px]'>Organization Address</p>
            <CustomInputField
              type="address"
              id="address"
              name="address"
              value={companyDetails.address}
              onChange={handleInputChange}
              placeholder="Address"
              className={styles.inputfield}
            />
            {errors.address && <p className="text-red-800 text-[10px]">{errors.address}</p>}

          </div>
          <div className='flex flex-col gap-0.5'>
            <p className='text-[#6c757d] text-[13px]'>Organization Email</p>
            <CustomInputField
              type="email"
              id="email"
              name="email"
              value={companyDetails.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className={styles.inputfield}
            />
            {errors.email && <p className="text-red-800 text-[10px]">{errors.email}</p>}

          </div>
          <div className='flex flex-col gap-0.5'>
            <p className='text-[#6c757d] text-[13px]'>Organization Description</p>
            <CustomInputField
              type="text"
              id="description"
              name="description"
              value={companyDetails.description}
              onChange={handleInputChange}
              placeholder="Description"
              className={styles.inputfield}
            />
            {errors.description && <p className="text-red-800 text-[10px]">{errors.description}</p>}

          </div>
          <div className='flex flex-col gap-0.5'>
            <p className='text-[#6c757d] text-[13px]'>Founded Date</p>
            <CustomInputField
              type="date"
              id="founded_date"
              name="founded_date"
              value={companyDetails.founded_date}
              onChange={handleInputChange}
              placeholder=""
              className={styles.inputfield}
            />
            {errors.date && <p className="text-red-800 text-[10px]">{errors.date}</p>}

          </div>
          <div className='flex flex-col gap-0.5'>
            <p className='text-[#6c757d] text-[13px]'>Country</p>
            <CustomInputField
              type="text"
              id="country"
              name="country"
              value={companyDetails.country}
              onChange={handleInputChange}
              placeholder="Country"
              className={styles.inputfield}
            />
            {errors.country && <p className="text-red-800 text-[10px]">{errors.country}</p>}

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
              {errors.logo && <p className="text-red-800 text-[10px]">{errors.logo}</p>}

            </div>
          </div>
          <CustomButton onClick={handleSubmit} className={styles.btnprimary}>
            Submit
          </CustomButton>
        </div>
      </div>
    </div>

  )
}

export default page