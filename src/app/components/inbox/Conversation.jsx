'use client'

import { useRouter } from "next/navigation";
import Image from "next/image";

const Conversation = ({ userId, conversation }) => {
    const router = useRouter()
    console.log(conversation)

    const otherUser = conversation.users.find((user) => user.id != userId)
    console.log(otherUser)
    return (

        <div onClick={() => router.push(`/home/inbox/${conversation.id}`)} className="flex flex-col border-b-2 border-gray-300  mt-3 gap-3 px-5 py-4  transition duration-500 hover:scale-105 cursor-pointer">
            <div>
                <p className="font-poppins text-[18px] font-semibold">{otherUser.first_name + " " + otherUser.last_name}</p>
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2 items-center">
                    <Image src="/usernamelogo.png" width={20} height={20} />
                    <p className="font-poppins font-light text-[12px]">{otherUser.username}</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <Image src="/gmaillogo.png" width={20} height={20} />
                    <p className="font-poppins font-light text-[12px]">{otherUser.email}</p>
                </div>
            </div>
        </div>
    )
}
export default Conversation;