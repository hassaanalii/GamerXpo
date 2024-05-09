import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import RoleNavBar from "@/app/components/rolenavbar/RoleNavBar";
import { getAccessToken, getUsername } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import { redirect } from "next/navigation";

const handleUsername = async () => {
    const username = await getUsername();
    return username;
}
const ConversationPage = async({params}) =>{
    const access = await getAccessToken();
    if (!access) {
        redirect("/login")
    }
    const response1 = await apiService.get('/api/getuser')

    const username = await handleUsername();
    console.log(username);

    const response = await apiService.get(`/api/user/${username}`);
    const role = response.role;

    const conversation = await apiService.get(`/api/conversations/${params.id}`);

    const token = await getAccessToken()

    return(
        <div className="flex flex-col gap-5">
            <RoleNavBar role={role} username={username} />
            <ConversationDetail token={token} userId={response1.userId} messages={conversation.messages} conversation={conversation.conversation} />
    
        </div>
    )
}
export default ConversationPage;