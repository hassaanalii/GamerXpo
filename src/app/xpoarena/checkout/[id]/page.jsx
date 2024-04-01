"use client"
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

const stripePromise = loadStripe(
    "pk_test_51Ovwb2HJ4pSO9vPNebQM1upMTvaeOZ1FNmnVws7iPXhfHyHJQFdJcjTItGDSkAikbmxTJpFJzECpFhzPXSwzfRBm00pt1FjtgW"
);

const Checkout = () => {
    const pathname = usePathname()
    console.log(pathname)
    const segments = pathname.split('/');
    const id = segments[segments.length - 1];

    console.log(id);

    const [checkoutUrl, setCheckoutUrl] = useState("");

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8000/api/create-checkout-session/${id}/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ game_id: id }),
            })
                .then((res) => res.json())
                .then((data) => {
                    // Assuming data.url is the checkout URL you receive from your backend
                    setCheckoutUrl(data.url);
                });
        }
    }, [id]);

    useEffect(() => {
        // If we have the checkout URL, redirect to it
        if (checkoutUrl) {
            window.location.href = checkoutUrl;
        }
    }, [checkoutUrl]);

    return (
        <div className="container">
            <p>Loading checkout...</p>
        </div>
    );
};

export default Checkout;