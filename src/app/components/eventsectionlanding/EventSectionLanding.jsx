"use client"
import EventCard from "../eventcard/EventCard";
import StyledButton from "../styledbuttons/StyledButton";

const EventSectionLanding = () => {
    const ViewAllEvents = () =>{
        console.log("View All Events");
    }
    
    return (
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
                <div className="flex flex-row items-center justify-center gap-5">
                    <EventCard image="/tekken8.jpg" event_name="Tekken 8 Launch" company="Bandai Namco" desc="Along with the launch we willl give the user to play it before purchasing" date="5/10/2023"/>
                    <EventCard image="/pubg.jpg"  event_name="Pubg Mobile Update" company="Krafton Inc." desc="New features with new characters and alot of exciting stuff" date="5/10/2024"/>
                    <EventCard image="/godofwar5.jpg" event_name="God of War Ragnarok" company="Capcom" desc="God of War Ragnarok Game release" date="5/10/2022"/>
                </div>
                <StyledButton text="View All Events" className="text-black font-poppins text-[10px] font-semibold rounded-md py-3 px-3 bg-cyellow" onClick={ViewAllEvents}/>
            </div>

        </div>
    )
}
export default EventSectionLanding;