"use client"
import { useUserContext } from '@/app/context/userprofile'
import React from 'react'

const page = () => {
    const {leadDetails, updateLeadDetails} = useUserContext()
  return (
    <div>
    <p>First Name: {leadDetails.firstname}</p>
    <p>Last Name: {leadDetails.lastname}</p>
    <p>Role: {leadDetails.role}</p>
    {leadDetails.profile_picture_url && (
      <div>
        <p>Profile Picture URL:</p>
        {/* Using an <img> tag for simplicity; you can use Next.js's <Image> if preferred */}
        <img src={leadDetails.profile_picture_url} alt="Profile" style={{ maxWidth: '200px' }} />
      </div>
    )}
    {/* Displaying the "profile_picture" depends on how you manage file objects */}
  </div>
  )
}

export default page