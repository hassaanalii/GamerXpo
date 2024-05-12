"use client"
import { useState } from "react";
import StyledButton from "../styledbuttons/StyledButton";
import Image from "next/image";

const FooterLanding = () => {
    const [email, setEmail] = useState('');

    const handleChange = (event) => {
        setEmail(event.target.value);
    };
    const onSubsClick = () => {
        setEmail("")
    }
    return (

        <div className="bg-gradient-to-b from-[#212c22] to-[#384d3b] flex flex-col">
            <div className="py-20 px-[300px] flex flex-row items-center justify-between">
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-2">
                        <p className="font-poppins text-white text-[18px] font-semibold">Subscribe to our newsletter</p>
                        <p className="font-poppins text-white text-[13px]">To get all updates and latest news</p>
                    </div>
                    <input
                        type="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-96 h-10 pl-4 pr-3 py-2 rounded-md text-[12px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white border border-gray-300"
                    />
                    <StyledButton text="Subscribe" onClick={onSubsClick} className="text-white font-poppins py-3 px-8 rounded-md border-2 border-white text-[12px] hover:border-gray-300 hover:text-gray-300" />


                </div>
                <div className="flex flex-col gap-3 items-center justify-center">
                    <Image src="/logolandingpage.svg" alt="logo" width={200} height={200} />
                    <p className="text-[30px] font-extracolombo text-white">GAMERXPO</p>

                </div>
            </div>
            <hr className="" />
            <div className="flex items-center justify-center py-8 font-poppins text-[12px] text-gray-300">
                © 2024 by GamerXpo. All rights reserved
            </div>


        </div>

    )
}
export default FooterLanding;