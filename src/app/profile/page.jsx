"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const router = useRouter();

  useEffect(() => {
    async function getVerification() {
      const res = await fetch("http://localhost:8000/api/verify/", {
        method: 'GET',
        credentials: 'include', // Important for cookies if using sessions
      });
      if (res.ok) {
        const data = await res.json();
         console.log("not")
        if (data.authenticated) {
          console.log("not")
          router.push("/profile");
        } else {
          console.log("not")
          router.push("/login");
        }
      }
    }

    getVerification();
  }, [router]);

  return (
    <div>Hello</div>
  );
}
