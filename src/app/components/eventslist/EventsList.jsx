import apiService from "@/app/services/apiService";
import GamerEvents from "../gamerevents/GamerEvents";
import OrganizationEvents from "../organizationevents/OrganizationEvents";

const EventsList = async(props) => {
    console.log(props.role)

    if (props.role === 'Lead'){
        const response = await apiService.get(`/api/user/${props.username}/leadevents`);
        console.log(response);
    }else if(props.role === 'Developer'){
        const response = await apiService.get(`/api/user/${props.username}/devevents`);
        console.log(response.message);
    }else if(props.role === 'Gamer'){
        const response = await apiService.get(`/api/getevents`);
        console.log(response)
    }
    

    return (
        <div>
        {
            props.role === 'Gamer' ? (
                <GamerEvents />
            ) : (
                <OrganizationEvents />
            )
        }
        </div>
    )
}
export default EventsList;