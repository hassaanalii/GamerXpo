"use client"
import { useRouter } from "next/navigation";
import StyledButton from "../styledbuttons/StyledButton";

const MarketplaceSectionLanding = () =>{
    const router = useRouter()
    const onExploreClick = () =>{
        router.push("/xpoarena")
    }
    const onReserveClick = () =>{
        router.push("/xpoarena")
    }
    return (
        <div id="marketplace" className="flex flex-col py-16 items-center justify-center bg-cover gap-10 " 
        style={{backgroundImage: "url('/marketplace.svg')"}}>
            <div className="flex flex-col justify-center items-center w-[70%] gap-6">
                <p className="font-extracolombo text-white text-[50px] leading-none">GAME MARKETPLACE</p>
                <p className="text-white font-poppins text-center"> <span className="font-poppins text-cyellow">Reserve, Showcase and Monetise </span>your Games. Connect with gamers and industry peers in our dynamic marketplace. Secure a virtual booth for your developer team and make your mark in the gaming world. </p>
            </div>
            <div className="flex items-center justify-center gap-10">
                <StyledButton text="Explore" className="text-[11px] bg-cyellow font-semibold text-black px-20 py-3 font-poppins rounded-md" onClick={onExploreClick}/>
                <StyledButton text="Reserve" className="text-[11px]  font-semibold text-white px-20 py-3 rounded-md font-poppins border-2 border-white " onClick={onReserveClick}/>

            </div>
        </div>
    )
}
export default MarketplaceSectionLanding;