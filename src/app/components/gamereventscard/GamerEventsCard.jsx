"use client"
import Image from "next/image";
import { useEffect, useState } from "react";


const GamerEventsCard = ({ event }) => {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const eventDate = new Date(`${event.dateOfEvent}T${event.startTime}`);
            const difference = eventDate - now;

            if (difference > 0) {
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setTimeLeft({ hours, minutes, seconds });
            } else {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [event.dateOfEvent, event.startTime]);

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden transition duration-500 hover:scale-105 cursor-pointer relative">
            <Image src={`http://localhost:8000/${event.image}`} alt="image" height={200} width={200} className="w-full object-cover" />
            <div className="absolute top-2 right-2 bg-cyellow text-black text-[12px] font-bold px-2 py-1 rounded-lg">
                {`${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
            </div>
            <div className="flex flex-col p-3">
                <div className="flex flex-row items-center justify-between">
                    <p className="text-[18px] font-semibold text-black font-poppins">{event.eventName}</p>
                    <Image src={`http://localhost:8000/${event.organization.logo}`} alt="organization logo" height={40} width={40} className="rounded-full object-cover" />
                </div>
                <p className="mb-3 text-cgreen font-poppins font-semibold text-[14px]">Organization: {event.organization.name}</p>
                <p className="text-gray-600 font-poppins text-[12px]">{event.description}</p>
                <p className="text-gray-500 font-poppins text-[12px]">{new Date(event.dateOfEvent).toLocaleDateString()}</p>
            </div>
        </div>
    );
}
export default GamerEventsCard;
