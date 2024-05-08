import Image from "next/image";

const GamerEvents = ({ events }) => {

    const sortedEvents = events.sort((a, b) => {
        const dateA = new Date(`${a.dateOfEvent}T${a.startTime}`);
        const dateB = new Date(`${b.dateOfEvent}T${b.startTime}`);
        return dateA - dateB;
    });

    console.log(sortedEvents)
    return (
        <div className="px-[200px] py-[50px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {sortedEvents.map((event) => (
                    <div key={event.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <Image src={`http://localhost:8000/${event.image}`} alt="image" height={200} width={200} className="w-full object-cover"/>
                        <div className="flex flex-col">
                            <h3 className="text-xl font-semibold mb-2">{event.eventName}</h3>
                            <p className="text-gray-600 mb-2">{event.description}</p>
                            <p className="text-gray-500">{new Date(event.dateOfEvent).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
export default GamerEvents;