import apiService from "@/app/services/apiService";
import Image from "next/image";
import Link from "next/link";
import ProfileMenu from "../profilemenu/ProfileMenu";


const RoleNavBar = async (props) => {

    const response = await apiService.get(`/api/user/${props.username}/profile_picture`)
    console.log(response)
    return (
        <div className="bg-gradient-to-r from-cgreen to-cgreen/60 py-6 px-36">
            <div className="flex flex-row items-center justify-between">
                <Image src="/logolandingpage.svg" alt="hello" height={50} width={50} />
                <div className="flex items-center justify-center gap-16">
                    <Link href={"/home"}>
                        <p className={`text-white cursor-pointer hover:text-gray-300 font-poppins ${props.highlight === 'home' ? 'font-bold' : ''}`}>Home</p>
                    </Link>

                    <Link href={"/home/events"}>
                        <p className={`text-white cursor-pointer hover:text-gray-300 font-poppins ${props.highlight === 'events' ? 'font-bold' : ''}`}>Events</p>
                    </Link>

                    {/* {
                        props.role === 'Gamer' && (
                            <Link href={"/home/library"}>
                                <p className={`text-white cursor-pointer hover:text-gray-300 font-poppins ${props.highlight === 'library' ? 'font-bold' : ''}`}>Library</p>
                            </Link>
                        )
                    } */}
                    <Link href={"/xpoarena"}>
                        <p className={`text-white cursor-pointer hover:text-gray-300 font-poppins ${props.highlight === 'xpoarena' ? 'font-bold' : ''}`}>XpoArena</p>
                    </Link>
                    <Link href={"/home/inbox"}>
                        <p className={`text-white cursor-pointer hover:text-gray-300 font-poppins ${props.highlight === 'xpoarena' ? 'font-bold' : ''}`}>Inbox</p>

                    </Link>

                </div>
                <div className="flex flex-row gap-3">
                    <ProfileMenu profilePicture={response.profile_picture || response.profile_picture_url} />
                </div>
            </div>

        </div>
    )
}
export default RoleNavBar;