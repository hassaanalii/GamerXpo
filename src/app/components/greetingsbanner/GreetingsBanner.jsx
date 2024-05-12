import Image from "next/image";

const GreetingsBanner = ({ role, username }) => {
    return (
        <div className="bg-gradient-to-r flex items-center justify-between from-cgreen to-cgreen/60 px-[200px] py-4">
            <div className="flex flex-col">
                <div className="flex flex-row items-center justify-center gap-2">
                    <p className="font-poppins text-white text-[20px]">Welcome,</p>
                    <p className="font-poppins text-white text-[20px]">{username}
                    </p>
                </div>
                <div className="mt-2">
                    <p className="font-semibold font-poppins text-[14px] text-white"># {role}</p>

                </div>
                <div>
                    <p className="font-light font-poppins text-[14px] text-white">Let's see what's up today!</p>
                </div>
            </div>
            <div>
                <Image src="/hands.svg" width={50} height={50} />
            </div>




        </div>
    )
}
export default GreetingsBanner;