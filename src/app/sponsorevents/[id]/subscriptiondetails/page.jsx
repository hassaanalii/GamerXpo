"use client";
import React, { useState } from "react";
import "./style.css";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import apiService from "@/app/services/apiService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubscriptionDetails = ({ params }) => {
    const [companyName, setCompanyName] = useState("");
    const [companyDetails, setCompanyDetails] = useState("");
    const [image, setImage] = useState(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const price = searchParams.get("price");
    const packageType = searchParams.get("package");

    console.log("Subscription price:", price);
    console.log("Package type:", packageType);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const onSubmitClick = async (event) => {
        event.preventDefault(); 
        console.log("Company Name:", companyName);
        console.log("Company Details:", companyDetails);
        console.log("Image File:", image);

        const formData = new FormData();
        formData.append("event", parseInt(params.id));
        formData.append("name", companyName);
        formData.append("details", companyDetails);
        formData.append("price", price);
        formData.append("package", packageType);
        if (image) {
            formData.append("logo", image);
        }

        try {
            const response = await fetch('http://localhost:8000/api/sponsorship/create/', {
                method: 'POST',
                body: formData,
                
                
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            toast.success('Sponsored the Event Successfully', {
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
                window.location.href = 'http://localhost:3000/';
            }, 3000);

            const responseData = await response.json();
            console.log('Success:', responseData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="eventsmaindiv">
            <h1 className="heading text-gradient">Subscription Details</h1>

            <div className="form-container">
                <form className="form" onSubmit={onSubmitClick}>
                    <div className="form-group">
                        <label htmlFor="companyName">Company Name</label>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="companyDetails">Company Details</label>
                        <textarea
                            name="companyDetails"
                            id="companyDetails"
                            rows="10"
                            cols="50"
                            value={companyDetails}
                            onChange={(e) => setCompanyDetails(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="companyLogo">Company Logo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            multiple={false}
                        />
                    </div>
                    <button className="form-submit-btn" type="submit">
                        Become a Sponsor
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SubscriptionDetails;
