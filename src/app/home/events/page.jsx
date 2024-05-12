import Banner from "@/app/components/banner/Banner";
import ButtonBanner from "@/app/components/buttonbanner/ButtonBanner";
import EventsList from "@/app/components/eventslist/EventsList";
import RoleNavBar from "@/app/components/rolenavbar/RoleNavBar";
import { getAccessToken, getUsername } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import { redirect } from "next/navigation";

const handleAccess = async () => {
    const access = await getAccessToken();
    if (!access) {
        redirect("/login")
    }
}
const handleUsername = async () => {
    const username = await getUsername();
    return username;
}

const events = async () => {
    await handleAccess();
    const username = await handleUsername();
    console.log(username);

    const response = await apiService.get(`/api/user/${username}`);
    const role = response.role;

    return (
        <div className="flex flex-col gap-5">
            <RoleNavBar role={role} username={username} highlight="events" />
            <Banner role={role} />
            <ButtonBanner role={role} username={username} />
            <EventsList username={username} role={role}/>
        </div>
    )
}
export default events;