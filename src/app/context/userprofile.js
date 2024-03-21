"use client"
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserContextWrapper({ children }) {
  const [leadDetails, setLeadDetails] = useState({
    firstname: '',
    lastname: '',
    role: '',
    profile_picture: null,
    profile_picture_url: '',
  });

  // Function to update user details in context
  const updateLeadDetails = (details) => {
    setLeadDetails((prevDetails) => ({
      ...prevDetails,
      ...details,
    }));
  };

  return (
    <UserContext.Provider value={{ leadDetails, updateLeadDetails }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
