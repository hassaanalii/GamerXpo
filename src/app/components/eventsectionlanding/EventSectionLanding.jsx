"use client"
import { useEffect, useState } from "react";
import EventCard from "../eventcard/EventCard";
import StyledButton from "../styledbuttons/StyledButton";
import apiService from "@/app/services/apiService";

const EventSectionLanding = () => {
    const [allEvents, setAllEvents] = useState([])
    const ViewAllEvents = () => {
        console.log("View All Events");
    }

    useEffect(() => {
        const allEvents = async () => {
            const response = await apiService.getWithoutToken(`/api/eventslanding/`)
            console.log(response)
            setAllEvents(response)
        }
        allEvents()
    }, [])

    return (
        <>
            {allEvents && (
                <div id="events" className="my-20 mx-48 flex flex-col gap-20">
                    <p className="text-white font-poppins text-center">
                        <span className="text-[#E7D700]">GamerXpo</span> provides an accessible and immersive ecosystem that defines how gamers
                        <span className="text-[#E7D700]"> discover, engage with, and influence </span>
                        the development of new games. For gamers, it offers a streamlined and user-friendly interface to explore a vast array of games, connect directly with developers, try out demos, provide valuable
                        <span className="text-[#E7D700]"> feedback, </span>
                        and <span className="text-[#E7D700]">purchase a wide range of games.</span>
                    </p>

                    <div className="flex flex-col items-center justify-center gap-10">
                        <p className="font-extracolombo text-white text-[50px]">UPCOMING EVENTS</p>
                        <div className="grid grid-cols-3 gap-5">
                            {allEvents.map((event, index) => (
                                <EventCard
                                    key={index}
                                    id={event.id}
                                    image={event.image}
                                    event_name={event.eventName}
                                    company={event.organization.name}
                                    desc={event.description}
                                    date={event.dateOfEvent}
                                    start={event.startTime}
                                    end={event.endTime}
                                />
                            ))}
                        </div>
                        {/* <StyledButton text="View All Events" className="text-black font-poppins text-[10px] font-semibold rounded-md py-3 px-3 bg-cyellow" onClick={ViewAllEvents} /> */}
                    </div>
                </div>
            )}
        </>
    );
}
export default EventSectionLanding;