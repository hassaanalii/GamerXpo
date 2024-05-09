import Conversation from "@/app/components/inbox/Conversation";
import RoleNavBar from "@/app/components/rolenavbar/RoleNavBar";
import { getUsername } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";

const handleUsername = async () => {
    const username = await getUsername();
    return username;
}
const Inbox = async() =>{
    const username = await handleUsername();
    console.log(username);

    const response = await apiService.get(`/api/user/${username}`);
    const role = response.role;

    return(
        <div className="flex flex-col gap-5">
            <RoleNavBar role={role} username={username} />
            <Conversation />
            <Conversation />
            <Conversation />
    
        </div>
      
    )
}
export default Inbox;