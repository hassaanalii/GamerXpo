import { getUsername } from "@/app/lib/actions";
import RoleNavBar from "../rolenavbar/RoleNavBar";
import apiService from "@/app/services/apiService";

const handleUsername = async () => {
    const username = await getUsername();
    return username;
}

const ChatNavBar = async() =>{
    const username = await handleUsername();
    console.log(username);

    const response = await apiService.get(`/api/user/${username}`);
    const role = response.role;
    return (
        <RoleNavBar role={role} username={username} />
    )
}
export default ChatNavBar;