"use client";
import Image from "next/image";
import StyledButton from "../styledbuttons/StyledButton";
import { useRouter } from "next/navigation";

const EventCard = (props) => {
    const router = useRouter()
    const onDetailsClick = () => {
        router.push(`/sponsorevents/${props.id}`)
    };
    return (
        <div
            className="py-5 px-3 bg-[#2d3f2f] rounded-md flex flex-col gap-3 transition duration-500 hover:scale-105 cursor-pointer"
            style={{ width: '300px', height: '500px' }}
        >
            <div className="flex flex-col items-center justify-center">
                <div className="relative" style={{ width: '250px', height: '250px' }}>
                    <Image
                        src={`http://localhost:8000${props.image}`}
                        alt={props.event_name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                    />
                </div>
            </div>
            <div className="flex flex-col flex-grow">
                <p className="font-poppins text-cyellow font-semibold text-[17px]">
                    {props.event_name}
                </p>
                <p className="font-poppins text-white text-[11px]">{props.company}</p>
                <p className="font-poppins my-2 text-white text-[11px] text-justify">
                    {props.desc}
                </p>
                <p className="font-poppins text-white text-[11px]">{props.date}</p>
                <p className="font-poppins text-white text-[11px]">
                    {props.start} - {props.end}
                </p>
            </div>
            <StyledButton
                text="Sponsor Event"
                onClick={onDetailsClick}
                className="mt-auto text-white font-poppins text-[10px] border-2 border-white rounded-md py-2"
            />
        </div>
    );
};
export default EventCard;
