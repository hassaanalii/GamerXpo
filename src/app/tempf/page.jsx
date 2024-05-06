import { redirect } from "next/navigation";
import { getAccessToken } from "../lib/actions";

const handleAccess = async() =>{
    const access = await getAccessToken()
    if(!access){
        redirect("/login")
    }
}
const TempF = async() =>{
    await handleAccess();
    return (
        <p>hello</p>
    )
}
export default TempF;