import EventDetails from "@/app/components/eventdetails/EventDetails";
import RoleNavBar from "@/app/components/rolenavbar/RoleNavBar";
import { getUsername } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
const handleUsername = async () => {
    const username = await getUsername();
    return username;
}

const event = async ({ params }) => {
    const username = await handleUsername();
    const response = await apiService.get(`/api/user/${username}`);
    const getAuthenticatedUser = await apiService.get(`/api/getuser`)
    const myEvent = await apiService.get(`/api/getevent/${params.id}`);

    const role = response.role;
    const authenticatedUserId = getAuthenticatedUser.userId


    return (
        <div className="flex flex-col gap-5">
            <RoleNavBar role={role} username={username} highlight="events" />
            <EventDetails event={myEvent} role={role} username={username} authenticatedUserId={authenticatedUserId} />

        </div>
    )
}
export default event;