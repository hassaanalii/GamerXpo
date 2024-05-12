"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavBarLandingPage = () => {
    const router = useRouter()
    const handleGetStarted = () => {
        router.push("/signup")
    }
    return (
        <div className="flex flex-row justify-between py-9 px-20">
            <Link href="/">
                <Image src="/logolandingpage.svg" alt="logo" width={60} height={60} />
            </Link>
            <div className="flex items-center justify-center gap-16">
                <a href="#events" className="text-white hover:text-gray-300 font-poppins">Events</a>
                <a href="#marketplace" className="text-white hover:text-gray-300 font-poppins">Marketplace</a>
                <a href="#features" className="text-white hover:text-gray-300 font-poppins">Features</a>
                <a href="#arena" className="text-white hover:text-gray-300 font-poppins">Arena</a>
                <a href="#team" className="text-white hover:text-gray-300 font-poppins">Team</a>
            </div>
            <button onClick={handleGetStarted} className="px-10 py-1 border-2 border-white font-poppins hover:text-gray-300 hover:border-gray-300 rounded-lg text-white text-sm">
                Get Started
            </button>

        </div>
    )
}
export default NavBarLandingPage;