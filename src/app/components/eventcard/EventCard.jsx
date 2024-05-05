"use client"
import Image from "next/image"
import StyledButton from "../styledbuttons/StyledButton"

const EventCard = (props) =>{
    const onDetailsClick = () =>{
        console.log("onDetailsClick")
    }
    return(
        <div className="py-5 px-3 bg-[#2d3f2f] rounded-md flex flex-col gap-4" style={{ width: '300px' }}>
            <div className="flex flex-col items-center justify-center">
                <Image src={props.image} alt="hello" width={250} height={250}/>
            </div>
            <div className="flex flex-col">
                <p className="font-poppins text-cyellow font-semibold text-[17px]">Event Name</p>
                <p className="font-poppins text-white text-[11px]">Company Name</p>
            </div>
            <div>
                <p className="font-poppins text-white text-[11px] text-justify">Event Description Event Description Event DescriptionEvent Description Event Description Event Description</p>
            </div>
            <div>
                <p className="font-poppins text-white text-[11px] ">11/11/2024</p>
            </div>
            <StyledButton text="See Details" onClick={onDetailsClick} className="text-white font-poppins text-[10px] border-2 border-white rounded-md py-2"/>


        </div>
    )
}
export default EventCard