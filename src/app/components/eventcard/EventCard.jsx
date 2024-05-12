"use client";
import Image from "next/image";
import StyledButton from "../styledbuttons/StyledButton";

const EventCard = (props) => {
    const onDetailsClick = () => {
        console.log("onDetailsClick");
    };
    return (
        <div
            className="py-5 px-3 bg-[#2d3f2f] rounded-md flex flex-col gap-4  transition duration-500 hover:scale-105 cursor-pointer"
            style={{ width: "300px", height: "500px" }}
        >
            <div className="flex flex-col items-center justify-center">
                <div className="relative" style={{ width: "250px", height: "250px" }}>
                    <Image
                        src={props.image}
                        alt="hello"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                    />
                </div>
            </div>
            <div className="flex flex-col">
                <p className="font-poppins text-cyellow font-semibold text-[17px]">
                    {props.event_name}
                </p>
                <p className="font-poppins text-white text-[11px]">{props.company}</p>
            </div>
            <div>
                <p className="font-poppins text-white text-[11px] text-justify">
                    {props.desc}
                </p>
            </div>
            <div>
                <p className="font-poppins text-white text-[11px] ">{props.date}</p>
            </div>
            <StyledButton
                text="See Details"
                onClick={onDetailsClick}
                className="text-white font-poppins text-[10px] border-2 border-white rounded-md py-2"
            />
        </div>
    );
};
export default EventCard;
