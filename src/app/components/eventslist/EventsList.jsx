import apiService from "@/app/services/apiService";
import GamerEvents from "../gamerevents/GamerEvents";
import OrganizationEvents from "../organizationevents/OrganizationEvents";

const EventsList = async(props) => {
    console.log(props.role)
    let response = []

    if (props.role === 'Lead'){
        response = await apiService.get(`/api/user/${props.username}/leadevents`);
    }else if(props.role === 'Developer'){
        response = await apiService.get(`/api/user/${props.username}/devevents`);
    }else if(props.role === 'Gamer'){
        response = await apiService.get(`/api/getevents`);
    }
    

    return (
        <div>
        {
            props.role === 'Gamer' ? (
                <GamerEvents events={response} />
            ) : (
                <OrganizationEvents />
            )
        }
        </div>
    )
}
export default EventsList;