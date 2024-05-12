"use client"
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import UploadButton from '@/app/components/uploadbutton/UploadButton'
import Button from '@/app/components/button/Button'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/app/components/navbar/Navbar'
import { useRouter } from 'next/navigation'
import { getUsername } from '@/app/lib/actions'
import apiService from '@/app/services/apiService'



const Reserve = () => {
    const [errors, setErrors] = useState({});
    const [selectedImage, setSelectedImage] = useState(null)
    const [boothName, setBoothName] = useState('');
    const [boothDescription, setBoothDescription] = useState('');
    const [fileName, setFileName] = useState('');
    const router = useRouter()

    const handleImageFile = (file) => {
        setSelectedImage(file);
        setFileName(file.name);
    }

    const validateForm = () => {
        let formIsValid = true;
        let errors = {};

        if (!boothName.trim()) {
            errors.boothName = "Booth name is required";
            formIsValid = false;
        }
        if (!boothDescription.trim()) {
            errors.boothDescription = "Booth description is required";
            formIsValid = false;
        }
        if (!selectedImage) {
            errors.selectedImage = "Booth image is required";
            formIsValid = false;
        }

        setErrors(errors);
        return formIsValid;
    };
    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        const username = await getUsername()
        const response = await apiService.get(`/api/user/${username}`);
        const role = response.role;
        console.log(role)

        if (role !== "Lead") {
            toast.error('You donot have any permissions to reserve a booth!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setTimeout(() => {
                router.push("/xpoarena/booths");
            }, 1000);

        } else {
            const response = await apiService.get(`/api/userorganization`)
            const organization_id = response.organization_id;
            const associated = await apiService.get(`/api/check-booth-association/${organization_id}`)
            if (associated.is_associated) {
                toast.error('You have already reserved a booth!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setTimeout(() => {
                    router.push("/xpoarena/booths");
                }, 1000);


            } else {
                const formData = new FormData();
                formData.append('name', boothName);
                formData.append('description', boothDescription);
                if (selectedImage) {
                    formData.append('image', selectedImage);
                }
                formData.append('organization', organization_id);
                

                try {
                    const response = await fetch('http://localhost:8000/api/booth/', {
                        method: 'POST',
                        body: formData,
                    });

                    if (response.ok) {
                        toast.success('Booth Added Successfully', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                        setTimeout(() => {
                            router.push("/xpoarena/booths");
                        }, 1000);

                    } else {
                        toast.error('Booth with this name is already present!', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });

                    }
                } catch (error) {
                    toast.error('Failed to submit form. Please try again later.');
                }
            }
        }




    };

    return (
        <>
            <Navbar />
            <div class={` ${styles.top} grid grid-cols-[3fr_2fr] divide-x`}>
                <div className={styles.innerdiv}>
                    <Image src="/reserve.jpg" layout="fill"
                        objectFit="cover" />
                </div>
                <div className={` ${styles.innerdiv} flex justify-center `}>
                    <div className='flex flex-col align-center justify-center gap-10'>
                        <div>
                            <p className='text-3xl font-medium'>Reserve a Booth</p>
                            <p className={styles.description}>Showcase your game to the world at XpoArena</p>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <div>
                                <p className='text-xs'>Booth Name</p>
                                <input type="text" onChange={(e) => setBoothName(e.target.value)} className={`${styles.inputfield} text-xs border-0 border-b border-solid border-black w-full focus:ring-0 `} />
                                {errors.boothName && <p className="text-red-500 text-xs">{errors.boothName}</p>}

                            </div>
                            <div>
                                <p className='text-xs'>Booth Description</p>
                                <textarea name="textarea" onChange={(e) => setBoothDescription(e.target.value)} id="textarea" cols="10" rows="5" className={` text-xs pl-1 pr-1 pt-1 border-0 border-b border-solid border-black w-full `}></textarea>
                                {errors.boothDescription && <p className="text-red-500 text-xs">{errors.boothDescription}</p>}

                            </div>
                            <div className="">
                                <UploadButton onImageUpload={handleImageFile} />
                                {errors.selectedImage && <p className="text-red-500 text-xs">{errors.selectedImage}</p>}

                                <p className="text-xs text-green-500">{fileName}</p>
                            </div>
                        </div>
                        <div>
                            <Button text="Reserve Booth" classname="reservebutton" onclick={handleSubmit} />
                        </div>
                    </div>


                </div>

            </div>
        </>
    )
}

export default Reserve