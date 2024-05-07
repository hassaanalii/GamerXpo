"use client"
import { useState } from "react";
import StyledButton from "../styledbuttons/StyledButton";
import EventModal from "../eventmodal/EventModal";

const ButtonBanner = ({ role }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const showFavEvents = () => {
        console.log("Show Fav Events");
    }
    const scheduleAnEvent = () => {
        console.log("Schedule");
        setModalOpen(true);
    }

    return (
        <>
            <div className={`flex flex-col ${isModalOpen ? 'filter blur-sm' : ''}`}>
                <div className="flex flex-row px-[200px] justify-end">
                    {
                        role === 'Gamer' ? (
                            <StyledButton className="px-10 py-3 text-white font-poppins text-[12px] rounded-md bg-cgreen" text="View Favourites" onClick={showFavEvents} />
                        ) : (role === 'Lead') ? (
                            <StyledButton className="px-10 py-3 text-white font-poppins text-[12px] rounded-md bg-cgreen" text="Schedule an Event" onClick={scheduleAnEvent} />

                        ) : null
                    }
                </div>

            </div>
            <EventModal isOpen={isModalOpen} close={() => setModalOpen(false)} />
               

        </>
    )
}
export default ButtonBanner;