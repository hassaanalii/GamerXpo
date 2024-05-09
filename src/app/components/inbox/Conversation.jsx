'use client'

import { useRouter } from "next/navigation";

const Conversation = ({userId, conversation}) =>{
    const router = useRouter()
   
    const otherUser = conversation.users.find((user)=> user.id != userId)
    console.log(otherUser)
    return(
        
        <div className="flex flex-col border-2 border-gray-300 rounded-md mt-3 gap-4 px-5 py-4">
            <p>{otherUser.username}</p>
            <p onClick={()=> router.push(`/home/inbox/${conversation.id}`)}>Go to Conversation</p>
        </div>
    )
}
export default Conversation;