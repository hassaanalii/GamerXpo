import apiService from "@/app/services/apiService";

const EventsList = async(props) => {
    console.log(props.role)
    const response = await apiService.get(`/api/user/${props.username}/leadevents`);
    console.log(response);

    return (
        <div>
           <p>hello</p>
        </div>
    )
}
export default EventsList;