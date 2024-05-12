"use client"
import React from 'react'

import styles from './page.module.css'
import Image from 'next/image'
import Button from '../components/button/Button'
import Link from 'next/link'
import SearchBar from '../components/searchbar/SearchBar'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos';
import { useEffect } from 'react';
import { getAccessToken } from '../lib/actions'
import { useRouter } from 'next/navigation'

// async function getData() {
//   const res = await fetch('http://localhost:8000/api/booth/', { next: { revalidate: 0 } })
//   //wait (Await) till the promise of fetch is resolved
//   if (!res.ok) {
//     throw new Error('Failed to fetch data')
//   }


//   return res.json()
// }
export default function XpoArena() {
  const router = useRouter()

  useEffect(() => {
    AOS.init({
      duration: 1500, // Animation duration
      once: true, // Whether animation should only happen once
      easing: 'ease', // Easing type
      // More options can be added here
    });

    const myFunc = async() =>{
      const access = await getAccessToken()
      if (!access) {
        router.push("/login")
      }
    }
    myFunc()
    
  }, []);
  // const data = await getData()


  return (
    <>
      <Navbar />
      <div className={styles.parentdiv}>
        <div className={` ${styles.maindiv} flex`}>
          <div className='w-1/2 flex'>
            <div className='flex flex-col gap-3 mt-32'>
              <p className={styles.gradienttext}>Game MarketPlace</p>
              <div className="aos-item" data-aos="fade-down">
                <p className={styles.maintext}>Reserve, Showcase, and Monetize Your Games</p>
              </div>
              <p className={styles.desctext}>Connect with gamers and industry peers in our dynamic marketplace. Secure a virtual booth for your developer team and make your mark in the gaming world.</p>
              <div className="aos-item" data-aos="fade-left">
                <div className='flex gap-4 mt-3'>
                  <Link href="/xpoarena/booths">
                    <div className={styles.but}>
                      <p>Explore</p>
                    </div>
                  </Link>
                  <Link href="/xpoarena/reserve">
                    <div className={styles.but2}>
                      <p>Reserve</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className='w-1/2 flex items-center justify-end'>
            <Image src="/animation.svg" width={320} height={260} />
          </div>
        </div>
        <div className="flex align-center justify-center mt-10">
          <hr className={styles.hr} />
        </div>
        <div className={styles.videoContainer}>
          <video
            className={styles.backgroundVideo}
            src="/landingpage.mp4"
            autoPlay
            loop
            muted

          />
          <div className={styles.textOverlay}>
            <p className={styles.maintext2}>Your Ultimate Destination for Gaming - Find, Experience, and Enjoy!</p>

          </div>
        </div>


      </div>

    </>

  )
}



