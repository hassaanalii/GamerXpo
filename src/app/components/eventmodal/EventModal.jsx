"use client"

import { useState } from "react";
import StyledButton from "../styledbuttons/StyledButton";
import apiService from "@/app/services/apiService";
import { redirect, useRouter } from "next/navigation";

const EventModal = ({ isOpen, close }) => {
    const router = useRouter();
    if (!isOpen) return null;
        const [eventName, setEventName] = useState('');
        const [description, setDescription] = useState('');
        const [dateOfEvent, setDateOfEvent] = useState('');
        const [startTime, setStartTime] = useState('');
        const [endTime, setEndTime] = useState('');
        const [image, setImage] = useState(null);

    const [errors, setErrors] = useState({
        eventName: '',
        description: '',
        dateOfEvent: '',
        startTime: '',
        endTime: '',
        image: ''
    });

    const scheduleEvent = async() => {
        const newErrors = {
            eventName: eventName ? '' : 'Event name must be filled.',
            description: description ? '' : 'Description must be filled.',
            dateOfEvent: dateOfEvent ? '' : 'Date of event must be filled.',
            startTime: startTime ? '' : 'Start time must be filled.',
            endTime: endTime ? '' : 'End time must be filled.',
            image: image ? '' : 'Image must be uploaded.'
        };

        setErrors(newErrors);

        // If any of the fields are empty, prevent form submission
        if (Object.values(newErrors).some(error => error !== '')) return;

        const formData = new FormData();
        formData.append('eventName', eventName)
        formData.append('description', description)
        formData.append('dateOfEvent', dateOfEvent)
        formData.append('startTime', startTime)
        formData.append('endTime', endTime)
        formData.append('image', image);

        try {
            const response = await apiService.post('/api/createevent/', formData);
            console.log(response.data);
            isOpen(false)
            router.push('/events')

            
        } catch (error) {
            console.error('Error posting event:', error.response);
        }

        console.log("Event Scheduled!");

    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40 ">
            <div className="bg-white py-6 px-12 rounded flex flex-col items-center justify-center w-[500px] gap-3">
                <p className="text-black font-poppins text-[18px] font-bold">Enter Event Details</p>

                <div className="w-full">
                    <label className="text-black font-semibold font-poppins text-[12px]">
                        Event Name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Event Name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg block w-full p-2.5"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                    />
                    {errors.eventName && <p className="text-red-500  mt-1 text-[10px]">{errors.eventName}</p>}

                </div>
                <div className="w-full">
                    <label className="text-black font-semibold font-poppins text-[12px]">
                        Event Description
                    </label>
                    <input
                        type="text"
                        placeholder="Describe your Event"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg block w-full p-2.5"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && <p className="text-red-500 mt-1 text-[12px]">{errors.description}</p>}

                </div>

                <div className="w-full">
                    <label className="text-black font-semibold font-poppins text-[12px]">
                        Date of Event
                    </label>
                    <input
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg block w-full p-2.5"
                        onChange={(e) => setDateOfEvent(e.target.value)}
                    />
                    {errors.dateOfEvent && <p className="text-red-500 mt-1 text-[12px]">{errors.dateOfEvent}</p>}

                </div>

                <div className="w-full flex items-center justify-center gap-3">
                    <div className="w-full">
                        <label className="text-black font-semibold font-poppins text-[12px]">
                            Start Time
                        </label>
                        <input
                            type="time"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg block w-full p-2.5"
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                        {errors.startTime && <p className="text-red-500 mt-1 text-[12px]">{errors.startTime}</p>}

                    </div>
                    <div className="w-full">
                        <label className="text-black font-semibold font-poppins text-[12px]">
                            End Time
                        </label>
                        <input
                            type="time"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg block w-full p-2.5"
                            onChange={(e) => setEndTime(e.target.value)}  // Assuming you have a state variable `endTime`
                        />
                        {errors.endTime && <p className="text-red-500 mt-1 text-[12px]">{errors.endTime}</p>}

                    </div>

                </div>
                <div className="w-full">
                    <label className="text-black font-semibold font-poppins text-[12px]">
                        Image Poster
                    </label>
                    <input
                        type="file"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg block w-full p-2.5"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    {errors.image && <p className="text-red-500 text-[12px]">{errors.image}</p>}

                </div>

                <div className="mt-3 flex flex-row gap-3 items-center justify-center">
                    <StyledButton className="rounded-md border-2 border-red-500 text-red-500 text-[12px] font-poppins px-8 py-2" text="Close" onClick={close} />

                    <StyledButton className="rounded-md border-2 border-cgreen text-white text-[12px] font-poppins px-8 py-2 bg-cgreen" text="Schedule Event" onClick={scheduleEvent} />

                </div>
            </div>
        </div>
    );
}

export default EventModal;