import EventCard from "../eventcard/EventCard";

const EventSectionLanding = () => {
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
                    <EventCard image="/demoimage.svg"/>
                </div>
            </div>

        </div>
    )
}
export default EventSectionLanding;