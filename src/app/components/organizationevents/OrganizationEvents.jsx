import GamerEventsCard from "../gamereventscard/GamerEventsCard";

const OrganizationEvents = ({ events, role }) => {

    console.log("here");
    console.log(events)


    const now = new Date();
    const filteredEvents = events.filter(event => {
        const eventEnd = new Date(`${event.dateOfEvent}T${event.endTime}`);
        return eventEnd > now;
    });

    const sortedEvents = filteredEvents.sort((a, b) => {
        const dateA = new Date(`${a.dateOfEvent}T${a.startTime}`);
        const dateB = new Date(`${b.dateOfEvent}T${b.startTime}`);
        return dateA - dateB;
    });
    console.log("sorted")
    console.log(sortedEvents)

    return (
        <>
            {
                events.message ? (
                    <p className="text-center text-red-500 font-poppins text-[20px] mt-24">Kindly get yourself registered with any organization first!</p>

                ) : (
                    <div className="px-[200px] py-[50px]">
                        {sortedEvents.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {sortedEvents.map((event) => (
                                    <GamerEventsCard key={event.id} event={event} role={role}/>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 font-poppins text-[30px] mt-24">No events scheduled.</p>
                        )}

                    </div>
                )
            }
        </>
    )
}
export default OrganizationEvents;