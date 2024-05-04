import { getAccessToken } from "../lib/actions";

const handleAccess = async() =>{
    const access = await getAccessToken()
    console.log("hhi")
    console.log(access)
}
const TempF = async() =>{
    await handleAccess();
    return (
        <p>hello</p>
    )
}
export default TempF;