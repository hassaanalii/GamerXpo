import { redirect } from "next/navigation";
import { getAccessToken, getUsername } from "../lib/actions";
import apiService from "../services/apiService";
import RoleNavBar from "../components/rolenavbar/RoleNavBar";


const handleAccess = async() =>{
    const access = await getAccessToken();
    if(!access){
        redirect("/login")
    }
}
const handleUsername = async() =>{
    const username = await getUsername();
    return username;
}

const Home = async() =>{
    await handleAccess();
    const username = await handleUsername();
    console.log(username);

    const response= await apiService.get(`/api/user/${username}`);
    const role = response.role;
    return(
        <div className="flex flex-col">
            <RoleNavBar role={role} username={username}/>

        </div>   
    )
}
export default Home;