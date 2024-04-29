import Image from "next/image";

const NavBarLandingPage = () =>{
    return(
        <div className="flex flex-row justify-between py-9 px-20">
            <Image src="/logolandingpage.svg" alt="logo" width={60} height={60}/>
            <div className="flex items-center justify-center gap-16">
                <a href="#events" className="text-white hover:text-gray-300 font-poppins">Events</a>
                <a href="#marketplace" className="text-white hover:text-gray-300 font-poppins">Marketplace</a>
                <a href="#features" className="text-white hover:text-gray-300 font-poppins">Features</a>
                <a href="#arena" className="text-white hover:text-gray-300 font-poppins">Arena</a>
                <a href="#team" className="text-white hover:text-gray-300 font-poppins">Team</a>

            </div>
            
        </div>
    )
}
export default NavBarLandingPage;