import apiService from "@/app/services/apiService";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const RoleNavBar = async (props) => {
    const pathname = usePathname
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

                    {
                        props.role === 'Gamer' && (
                            <Link href={"/home/library"}>
                                <p className={`text-white cursor-pointer hover:text-gray-300 font-poppins ${props.highlight === 'library' ? 'font-bold' : ''}`}>Library</p>
                            </Link>
                        )
                    }
                    <Link href={"/xpoarena"}>
                    <p className={`text-white cursor-pointer hover:text-gray-300 font-poppins ${props.highlight === 'xpoarena' ? 'font-bold' : ''}`}>XpoArena</p>
                    </Link>

                </div>
                <div className="flex flex-row gap-3">
                    <Image src={response.profile_picture || response.profile_picture_url || '/profile.png'} width={40} height={40} alt="hello" className="rounded-full" />
                </div>
            </div>

        </div>
    )
}
export default RoleNavBar;