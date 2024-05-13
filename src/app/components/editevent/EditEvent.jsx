"use client"
import { useEffect, useState } from "react";
import StyledButton from "../styledbuttons/StyledButton";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";

const EditEvent = ({event, isOpen, close }) => {
    const router = useRouter();
    if (!isOpen) return null;

    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [dateOfEvent, setDateOfEvent] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');


    const [errors, setErrors] = useState({
        eventName: '',
        description: '',
        dateOfEvent: '',
        startTime: '',
        endTime: '',
        
    });
    useEffect(() => {
        if (event) {
            setEventName(event.eventName || '');
            setDescription(event.description || '');
            setDateOfEvent(event.dateOfEvent || '');
            setStartTime(event.startTime || '');
            setEndTime(event.endTime || '');
           
        }
    }, [event]);

    const validateForm = () => {
        const today = new Date().toISOString().split('T')[0];
        const nowTime = new Date().toTimeString().split(' ')[0];

        const newErrors = {
            eventName: eventName ? '' : 'Event name must be filled.',
            description: description ? '' : 'Description must be filled.',
            dateOfEvent: dateOfEvent ? '' : 'Date of event must be filled.',
            startTime: startTime ? '' : 'Start time must be filled.',
            endTime: endTime ? '' : 'End time must be filled.',
     
        };

        if (dateOfEvent && dateOfEvent < today) {
            newErrors.dateOfEvent = "Event date cannot be in the past.";
        } else if (dateOfEvent === today && (startTime <= nowTime || endTime <= nowTime || endTime <= startTime)) {
            newErrors.startTime = "Start time must be later than the current time.";
            newErrors.endTime = "End time must be later than the start time and current time.";
        } else if (endTime && startTime && endTime <= startTime) {
            newErrors.endTime = "End time must be later than the start time.";
        }

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === '');
    };

    const editEvent = async () => {
        if (!validateForm()) return;

        const formData = {
            eventName: eventName,
            description: description,
            dateOfEvent: dateOfEvent,
            startTime: startTime,
            endTime: endTime
        };
    
        try {
            const response = await apiService.patch(`/api/editevent/${event.id}/`, formData);
            console.log('Updated event:', response);
            close();
            window.location.reload();
        } catch (error) {
            console.error('Error updating event:', error.response);
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
            <div className="bg-white py-6 px-12 rounded flex flex-col items-center justify-center w-[500px] gap-3">
                <p className="text-black font-poppins text-[18px] font-bold">Edit Event Details</p>
                <div className="w-full">
                    <label className="text-black font-semibold font-poppins text-[12px]">Event Name</label>
                    <input
                        type="text"
                        placeholder="Enter Event Name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg block w-full p-2.5"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                    />
                    {errors.eventName && <p className="text-red-500 mt-1 text-[10px] font-poppins">{errors.eventName}</p>}
                </div>
                <div className="w-full">
                    <label className="text-black font-semibold font-poppins text-[12px]">Event Description</label>
                    <input
                        type="text"
                        placeholder="Describe your Event"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg block w-full p-2.5"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && <p className="text-red-500 mt-1 text-[10px] font-poppins">{errors.description}</p>}
                </div>
                <div className="w-full">
                    <label className="text-black font-semibold font-poppins text-[12px]">Date of Event</label>
                    <input
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg block w-full p-2.5"
                        value={dateOfEvent}
                        onChange={(e) => setDateOfEvent(e.target.value)}
                    />
                    {errors.dateOfEvent && <p className="text-red-500 mt-1 text-[10px] font-poppins">{errors.dateOfEvent}</p>}
                </div>
                <div className="w-full flex items-center justify-center gap-3">
                    <div className="w-full">
                        <label className="text-black font-semibold font-poppins text-[12px]">Start Time</label>
                        <input
                            type="time"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg block w-full p-2.5"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                        {errors.startTime && <p className="text-red-500 mt-1 text-[10px] font-poppins">{errors.startTime}</p>}
                    </div>
                    <div className="w-full">
                        <label className="text-black font-semibold font-poppins text-[12px]">End Time</label>
                        <input
                            type="time"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg block w-full p-2.5"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                        {errors.endTime && <p className="text-red-500 mt-1 text-[10px] font-poppins">{errors.endTime}</p>}
                    </div>
                </div>
                {/* <div className="w-full">
                    <label className="text-black font-semibold font-poppins text-[12px]">Image Poster</label>
                    <input
                        type="file"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] rounded-lg block w-full p-2.5"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    {errors.image && <p className="text-red-500 text-[10px] font-poppins">{errors.image}</p>}
                </div> */}
                <div className="mt-3 flex flex-row gap-3 items-center justify-center">
                    <StyledButton className="rounded-md border-2 border-red-500 text-red-500 text-[12px] font-poppins px-8 py-2" text="Close" onClick={close} />
                    <StyledButton className="rounded-md border-2 border-cgreen text-white text-[12px] font-poppins px-8 py-2 bg-cgreen" text="Confirm Edit" onClick={editEvent} />
                </div>
            </div>
        </div>
    );
}

export default EditEvent;
