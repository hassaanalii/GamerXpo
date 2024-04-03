"use client"
import CustomInputField from '@/app/components/custominputfield/CustomInputField';
import React, { useEffect, useState } from 'react'
import styles from '../edit/page.module.css'
import CustomButton from '@/app/components/custombutton/CustomButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter()
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


    const [logoPreview, setLogoPreview] = useState('');


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Assuming you want to replace the logo attribute with the file for submission
            setOrganizationDetails({ ...organizationDetails, logo: file });
            // Create a URL for the new image file for preview
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    async function fetchOrganizationDetails() {
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


    }

    useEffect(() => {
        fetchOrganizationDetails();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrganizationDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };
    useEffect(() => {
        if (organizationDetails.logo && typeof organizationDetails.logo === 'string') {
            setLogoPreview(organizationImageSrc);
        }
    }, [organizationDetails.logo]);

    const organizationImageSrc = `http://localhost:8000/${organizationDetails.logo}`

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

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', organizationDetails.name);
        formData.append('website_url', organizationDetails.website_url);
        formData.append('address', organizationDetails.address);
        formData.append('email', organizationDetails.email);
        formData.append('description', organizationDetails.description);
        formData.append('founded_date', organizationDetails.founded_date);
        formData.append('country', organizationDetails.country);

        // Append the logo file if a new one has been selected, otherwise skip
        if (organizationDetails.logo && typeof organizationDetails.logo !== 'string') {
            formData.append('logo', organizationDetails.logo);
        }

        try {
            const response = await fetch('http://localhost:8000/api/updateorganization/', {
                method: 'PATCH',
                body: formData,
                credentials: 'include',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            });

            if (response.ok) {
                const updatedData = await response.json();
                console.log('Organization updated successfully:', updatedData);
                toast.success('Organization Updated Successfully', {
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
                // Handle errors
                console.error('Failed to update organization details');
                toast.error(`Organization with this name already exists!`, {
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
            console.error('There was a problem with your fetch operation:', error);
        }
    }

    return (
        <div className='bg-black flex items-center justify-center h-screen w-full gap-[60px]'>
            <div className='flex flex-row gap-24 items-center justify-center'>
                <label htmlFor="logoUpload" className={styles.imageContainer}>
                    <img
                        src={logoPreview} // Show the logo preview or a default image
                        alt="Organization Logo"
                        className={styles.image2}
                    />
                </label>
                <input
                    type="file"
                    id="logoUpload"
                    name="logo"
                    onChange={handleImageChange}
                    className="hidden" // Hide the input but keep it functional
                    accept="image/*" // Accept only images
                />
                <div className='flex flex-col gap-5'>
                    <p className='text-white font-bold text-[30px]'>Edit Your Organization Details!</p>

                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-1'>
                            <p className='text-[#6c757d] text-[13px]'>Name</p>
                            <CustomInputField
                                type="text"
                                name="name"
                                value={organizationDetails.name}
                                onChange={handleChange}
                                className={styles.inputfield}

                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='text-[#6c757d] text-[13px]'>Website Url</p>
                            <CustomInputField
                                type="url"
                                name="website_url"
                                value={organizationDetails.website_url}
                                onChange={handleChange}
                                className={styles.inputfield}

                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='text-[#6c757d] text-[13px]'>Address</p>
                            <CustomInputField
                                type="address"
                                name="address"
                                value={organizationDetails.address}
                                onChange={handleChange}
                                className={styles.inputfield}

                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='text-[#6c757d] text-[13px]'>Email</p>
                            <CustomInputField
                                type="email"
                                name="email"
                                value={organizationDetails.email}
                                onChange={handleChange}
                                className={styles.inputfield}

                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='text-[#6c757d] text-[13px]'>Description</p>
                            <CustomInputField
                                type="text"
                                name="description"
                                value={organizationDetails.description}
                                onChange={handleChange}
                                className={styles.inputfield}

                            />
                        </div>


                        <CustomButton className={styles.btnprimary} onClick={handleSubmit}>Save Changes</CustomButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page