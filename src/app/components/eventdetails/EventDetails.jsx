"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const EventDetails = ({ event, role, username }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isLive, setIsLive] = useState(false);
    const [eventEnded, setEventEnded] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const eventStart = new Date(`${event.dateOfEvent}T${event.startTime}`);
            const eventEnd = new Date(`${event.dateOfEvent}T${event.endTime}`);
            const difference = eventStart - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setTimeLeft({ days, hours, minutes, seconds });
                setIsLive(false);
                setEventEnded(false);
            } else if (now >= eventStart && now <= eventEnd) {
                setIsLive(true);
                setEventEnded(false);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                setIsLive(false);
                setEventEnded(true);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [event.dateOfEvent, event.startTime, event.endTime]);

    const getStatusClassName = () => {
        if (isLive) {
            return "bg-red-800 text-white";
        } else if (eventEnded) {
            return "bg-gray-500 text-white";
        } else {
            return "bg-cyellow text-black";
        }
    };

    const formattedDate = new Date(event.dateOfEvent).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });


    return (
        <div className="flex flex-col bg-cover bg-center px-[200px]" style={{ backgroundImage: "url('/eventdetails.png')" }}>
            <div className="flex flex-col gap-6 pb-10">
                <div className="flex flex-row items-center justify-between">
                    <p className="font-extracolombo text-[40px] font-semibold ">{event.eventName}</p>
                    <div className={`font-poppins text-[16px] font-semibold py-3 rounded-lg w-[220px] text-center ${getStatusClassName()}`}>
                        {isLive ? "LIVE" : eventEnded ? "Event Ended" : `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
                    </div>
                </div>
                <div className="relative w-full h-80  ">
                    <Image
                        src={`http://localhost:8000/${event.image}`}
                        alt="event image"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md object-cover"
                    />
                </div>
                <div className="px-5 py-5 rounded-md border-2 border-gray-200 bg-gray-100 transition duration-500 hover:scale-105 cursor-pointer">
                    <div className="flex flex-col items-center justify-center gap-5">
                        <p className="text-[15px] font-poppins ">{event.description}</p>
                        <div className="flex flex-row items-center justify-center gap-7">
                            <div className="flex flex-row items-center gap-2 justify-center bg-green-800 text-yellow-400 font-bold px-4 py-2 rounded-lg text-[12px] font-poppins">
                                <span className="text-white">DATE:</span>
                                <p>
                                    {formattedDate.toUpperCase()}
                                </p>
                            </div>
                            <div className="flex flex-row gap-2 items-center justify-center bg-green-800 text-yellow-400 font-bold px-4 py-2 rounded-lg text-[12px] font-poppins">
                                <span className="text-white">TIME:</span>
                                <p>
                                    {event.startTime} - {event.endTime}
                                </p>
                            </div>

                        </div>

                    </div>
                </div>
                <div className="px-[60px] py-5 rounded-md border-2 border-gray-200 bg-gray-100 transition duration-500 hover:scale-105 cursor-pointer">
                    <div className="flex flex-col">
                        <div className="flex flex-row items-center justify-between">
                            <p className="font-poppins text-[18px] text-black font-bold">{event.organization.name}</p>
                            <Image src={`http://localhost:8000/${event.organization.logo}`} alt="hello" width={50} height={50} className="rounded-md"/>
                        </div>
                        <div className="mt-2">
                            <p className="font-poppins text-[14px] text-black"><strong>Website:</strong> <a href={event.organization.website_url} className="text-blue-500 underline">{event.organization.website_url}</a></p>
                            <p className="font-poppins text-[14px] text-black"><strong>Address:</strong> {event.organization.address}</p>
                            <p className="font-poppins text-[14px] text-black"><strong>Email:</strong> <a href={`mailto:${event.organization.email}`} className="text-blue-500 underline">{event.organization.email}</a></p>
                            <p className="font-poppins text-[14px] text-black"><strong>Description:</strong> {event.organization.description}</p>
                            <p className="font-poppins text-[14px] text-black"><strong>Founded Date:</strong> {new Date(event.organization.founded_date).toLocaleDateString()}</p>
                            <p className="font-poppins text-[14px] text-black"><strong>Country:</strong> {event.organization.country}</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventDetails;
