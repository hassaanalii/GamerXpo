// ./src/app/subscribe/page.jsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { useRouter } from "next/navigation";
import apiService from "@/app/services/apiService";
import Image from "next/image";
const event = {
    id: 1,
    eventName: "Tect summit",
    description: "An annual event",
    dateOfEvent: "2023-12-01",
    startTime: "09:00:00",
    endTime: "10:00:00",
    image:
        "/media/posts/Soccer_Futsal_Tournament_Flyer_Poster_-_Made_with_PosterMyWall_c37MMfY.jpg",
    gold_sponsor: false,
    silver_sponsor: true,
    bronze_sponsor: false,
    organization: 1,
};

const SponsorEvent = ({ params }) => {
    const [eventData, setEventData] = useState(null);
    const mainDivRef = useRef(null);
    const [packages, setPackages] = useState([]);

    const handleScrollToMainDiv = () => {
        mainDivRef.current.scrollIntoView({ behavior: "smooth" });
    };
    

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await apiService.getWithoutToken(`/api/getevent/${params.id}`);
                setEventData(response);

                setTimeout(() => {
                    const sponsorPackages = [
                        {
                            title: "Bronze",
                            price: 500,
                            benefits: [
                                "Logo placement on the event website.",
                                "Mention during the event opening and closing remarks.",
                                "Social media mention.",
                            ],
                            isAvailable: response.bronze_sponsor,
                        },
                        {
                            title: "Silver",
                            price: 1000,
                            benefits: [
                                "All benefits of the Bronze Package.",
                                "Logo on event-related emails and marketing materials.",
                                "Social media feature (3 posts across all platforms).",
                            ],
                            isAvailable: response.silver_sponsor,
                        },
                        {
                            title: "Gold",
                            price: 2500,
                            benefits: [
                                "All benefits of the Silver Package.",
                                "Prominent logo placement on all event pages and main stage backdrop.",
                                "Opportunity to sponsor a specific part of the event (e.g., keynote session, networking session).",
                                "Dedicated email blast to attendees before and after the event.",
                            ],
                            isAvailable: response.gold_sponsor,
                        },
                    ];
                    setPackages(sponsorPackages);
                }, 2000);
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        };

        getData();
    }, [params.id]);


    
    console.log(eventData)


    return (
        <div className="eventdivfull">
            {eventData && (
                <>
                    <div className="subscribedivone">
                        <div className="insidesubscribe">
                            <div className="subscribeleft">
                                <h1 className="heading1 text-gradient">{eventData.eventName}</h1>
                                <p className="pbigger bold">Event Date: {eventData.dateOfEvent}</p>
                                <p className="pbigger bold">
                                    Starting Time: {eventData.startTime} | Ending Time: {eventData.endTime}
                                </p>
                                <p>{eventData.description}</p>
                                <button id="btn" onClick={handleScrollToMainDiv}>
                                    Sponsor
                                </button>
                            </div>
                            
                        </div>
                    </div>
                    <div className="eventsmaindiv" ref={mainDivRef}>
                        <h1 className="heading text-gradient">Sponsor Events</h1>
                        <div className="eventcardcontainer">
                            {packages.map((pkg) => renderCard(pkg, params.id))}
                        </div>
                    </div>
                </>
            )}


        </div>
    );
}
export default SponsorEvent;

function renderCard(pkg, eventId) {
    const router = useRouter();

    return (
        <div className={`card ${pkg.isAvailable ? "disabled" : ""}`}>
            <p className="pricetop text-gradient1">{pkg.title}</p>
            <p className="price">${pkg.price}</p>
            <ul className="lists">
                {pkg.benefits.map((benefit, index) => (
                    <li key={index} className="list">
                        <svg
                            className="icon"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="#ffffff"
                                d="M21.5821 5.54289C21.9726 5.93342 21.9726 6.56658 21.5821 6.95711L10.2526 18.2867C9.86452 18.6747 9.23627 18.6775 8.84475 18.293L2.29929 11.8644C1.90527 11.4774 1.89956 10.8443 2.28655 10.4503C2.67354 10.0562 3.30668 10.0505 3.70071 10.4375L9.53911 16.1717L20.1679 5.54289C20.5584 5.15237 21.1916 5.15237 21.5821 5.54289Z"
                                clipRule="evenodd"
                                fillRule="evenodd"
                            ></path>
                        </svg>
                        <span>{benefit}</span>
                    </li>
                ))}
            </ul>
            {/* <a href="#" className={`action ${!pkg.isAvailable ? "disabled" : ""}`}>
        Sponsor
      </a> */}
            <button
                type="submit"
                onClick={() => {
                    setTimeout(() => {
                        // router.push({
                        //   pathname: "/subscriptionDetails",
                        //   query: { price: pkg.price },
                        // });
                        router.push(
                            `/sponsorevents/${eventId}/subscriptiondetails/?price=${pkg.price}&package=${pkg.title}`
                        );
                    }, 1000);
                }}
                className={`action ${!pkg.isAvailable ? "disabled" : ""}`}
            >
                Sponsor
            </button>
        </div>
    );
}
