import apiService from "@/app/services/apiService";
import GamerEvents from "../gamerevents/GamerEvents";
import OrganizationEvents from "../organizationevents/OrganizationEvents";

const EventsList = async(props) => {
    console.log(props.role)
    let response = []

    if (props.role === 'Lead'){
        response = await apiService.get(`/api/user/${props.username}/leadevents`);
        console.log(response);
    }else if(props.role === 'Developer'){
        response = await apiService.get(`/api/user/${props.username}/devevents`);
    }else if(props.role === 'Gamer'){
        response = await apiService.get(`/api/getevents`);
        console.log("nene")
       
    }
    

    return (
        <div>
        {
            props.role === 'Gamer' ? (
                <GamerEvents events={response} role={props.role} />
            ) : (
                <OrganizationEvents events={response} role={props.role}/>
            )
        }
        </div>
    )
}
export default EventsList;