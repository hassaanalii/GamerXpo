"use client"

import apiService from "@/app/services/apiService";
import { useEffect, useState } from "react";

const EventsList = ({role, username}) => {
    const [eventsList, setEventsList] = useState([])

    useEffect(async()=>{
        const response = await apiService.get(`/api/user/${username}/events`) 
    }, [])

    return (
        <div></div>
    )
}
export default EventsList;