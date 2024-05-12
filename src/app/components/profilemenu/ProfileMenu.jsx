"use client";

import { useState } from "react";
import Image from "next/image";
import { resetAuthCookies } from "@/app/lib/actions";

const ProfileMenu = ({ profilePicture }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }


    const handleLogoutClick = async () => {
        try {
            const response = await fetch('http://localhost:8000/accounts/logout/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'), // function to get the CSRF token from cookies
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // This is important to include cookies
            });

            if (response.ok) {
                // Successfully logged out
                console.log('Logout successful');
                resetAuthCookies();
                router.push('/');

            } else {
                // Handle any errors
                console.error('Failed to log out');
            }
        } catch (error) {
            console.error('There was an error logging out:', error);
        }
    }

    return (
        <div className="relative">
            <Image
                src={profilePicture || '/profile.png'}
                width={40}
                height={40}
                alt="Profile"
                className="rounded-full cursor-pointer"
                onClick={toggleDropdown}
            />
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <a href="/profile" className="block px-4 py-2 text-[12px] font-poppins text-gray-700 hover:bg-gray-100" role="menuitem">Profile</a>
                        <p onClick={handleLogoutClick} className="block px-4 py-2 text-[12px] font-poppins text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem">Log Out</p>
                    </div>
                </div>
            )}
            {isOpen && <div className="fixed inset-0 z-40" onClick={closeDropdown}></div>}
        </div>
    );
};

export default ProfileMenu;
