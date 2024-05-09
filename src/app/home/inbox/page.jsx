import ChatNavBar from "@/app/components/chatnavbar/ChatNavBar";
import Conversation from "@/app/components/inbox/Conversation";
import { getAccessToken, getUsername } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import { redirect } from "next/navigation";


const Inbox = async () => {
    const access = await getAccessToken();
    if (!access) {
        redirect("/login")
    }
    const response = await apiService.get('/api/getuser')

    const conversations = await apiService.get('/api/conversations')
    return (
        <div className="flex flex-col gap-5">
            <ChatNavBar />
            <div className="flex flex-col px-[100px]">
                <p className="font-poppins text-[20px] text-black font-semibold">Inbox</p>
               
                {conversations.map(conversation =>{
                    return (
                        <Conversation userId={response.userId} key={conversation.id} conversation={conversation} />
                    )
                })}
            </div>

        </div>

    )
}
export default Inbox;