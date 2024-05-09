import ChatNavBar from "@/app/components/chatnavbar/ChatNavBar";
import Conversation from "@/app/components/inbox/Conversation";


const Inbox = () => {
    return (
        <div className="flex flex-col gap-5">
            <ChatNavBar />
            <div className="flex flex-col px-[100px]">
                <p className="font-poppins text-[20px] text-black font-semibold">Inbox</p>
                <Conversation />
                <Conversation />
                <Conversation />
            </div>

        </div>

    )
}
export default Inbox;