"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


const GamerEventsCard = ({ event, role }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const pathname = usePathname()

    const [isLive, setIsLive] = useState(false);


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
            } else if (now >= eventStart && now <= eventEnd) {
                setIsLive(true);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                setIsLive(false);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [event.dateOfEvent, event.startTime, event.endTime]);



    return (
        <Link href={`${pathname}/${event.id}`}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden transition duration-500 hover:scale-105 cursor-pointer relative flex flex-col h-full">
                <div className="relative w-full h-60">
                    <Image
                        src={`http://localhost:8000${event.image}`}
                        alt="event image"
                        layout="fill"
                        objectFit="cover"
                        className="object-cover"
                    />
                    {isLive && (
                        <div className="absolute top-2 right-2 bg-red-800 text-white font-bold px-6 py-1 rounded-lg text-[12px] font-poppins">
                            LIVE
                        </div>
                    )}
                    {!isLive && (
                        <div className="absolute top-2 right-2 bg-cyellow text-black font-bold px-2 py-1 rounded-lg text-[12px] font-poppins">
                            {`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
                        </div>
                    )}
                </div>
                <div className="flex flex-col p-3 flex-grow gap-3">
                    <div className="flex flex-row items-center justify-between">
                        <p className="text-[18px] font-semibold text-black font-poppins">{event.eventName}</p>
                        {role === 'Gamer' && (
                            <Image
                                src={`http://localhost:8000${event.organization.logo}`}
                                alt="organization logo"
                                height={40}
                                width={40}
                                className="rounded-full object-cover"
                            />
                        )}
                    </div>
                    {role === 'Gamer' && (
                        <p className="mb-3 text-cgreen font-poppins font-semibold text-[14px]">
                            Organization: {event.organization.name}
                        </p>
                    )}
                    <div className="flex flex-col gap-2">
                        <p className="text-gray-600 font-poppins text-[12px]">{event.description}</p>
                        <p className="text-black font-poppins text-[12px]">
                            {new Date(event.dateOfEvent).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                
            </div>
        </Link>
    );
}
export default GamerEventsCard;
