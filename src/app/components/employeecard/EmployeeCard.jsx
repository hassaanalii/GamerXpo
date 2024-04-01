import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt } from '@fortawesome/free-solid-svg-icons';


const EmployeeCard = ({ profile }) => {
    const imageSrc = profile.profile_picture_url && profile.profile_picture_url !== "null"
        ? profile.profile_picture_url
        : (profile.profile_picture ? `http://localhost:8000${profile.profile_picture}` : '/profile.png');


    return (
        <div className="bg-[#b0e1b5] py-3 px-3 rounded-lg shadow-md flex flex-col gap-5">
            <div className='bg-[#39573c] px-3 flex items-center justify-center py-5 rounded-tl-sm rounded-br-sm rounded-tr-2xl rounded-bl-2xl'>
                <img
                    src={imageSrc}
                    alt={`${profile.user.first_name} ${profile.user.last_name}`}
                    className="h-[150px] w-[150px] object-cover rounded-full border-2 border-white"
                />
            </div>
            <div className='flex bg-white rounded-md py-3 px-3 flex-col gap-5'>
                <div className='flex flex-col gap-2'>
                    <h3 className="text-2xl font-bold">{`${profile.user.first_name} ${profile.user.last_name}`}</h3>
                    <p className="text-gray-500 text-[12px]">{profile.user.username}</p>
                </div>
                {profile.user.email && (
                    <div className='flex flex-row'>
                        <div style={{ width: "30px" }}>
                            <FontAwesomeIcon icon={faAt} className="text-black text-md mt-0.5 flex  cursor-pointer hover:text-[#4F6F52]" />
                        </div>
                        <p className="text-gray-700 text-[13px]">{profile.user.email}</p>
                    </div>
                )}

            </div>

        </div>
    );
}

export default EmployeeCard
{/* <div className="card-header flex items-center space-x-4">
                <img
                    src={imageSrc}
                    alt={`${profile.user.first_name} ${profile.user.last_name}`}
                    className="h-14 w-14 object-cover rounded-full"
                />
                <div>
                    <h3 className="text-xl font-bold">{`${profile.user.first_name} ${profile.user.last_name}`}</h3>
                    <p className="text-gray-500">{profile.user.username}</p>
                </div>
            </div>
            <div className="card-body mt-4">
                <p className="text-gray-700">{profile.user.email}</p>
            </div> */}