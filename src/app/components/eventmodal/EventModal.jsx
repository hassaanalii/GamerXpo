"use client"

import { useState } from "react";

const EventModal = ({ isOpen, close }) => {
    if (!isOpen) return null;
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [dateOfEvent, setDateOfEvent] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [image, setImage] = useState(null);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
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
                </div>


                <button onClick={close} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Close</button>
            </div>
        </div>
    );
}

export default EventModal;