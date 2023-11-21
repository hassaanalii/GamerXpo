  import React from 'react'
  import styles from './page.module.css'
import Image from 'next/image'

  const XpoArena = () => {
    const handleClick = () =>{
      console.log("sadsad")
    }
    return (
      <div className={styles.parentdiv}>
        <div className={` ${styles.maindiv} flex`}>
          <div className='w-1/2 flex'>
            <div className='flex flex-col gap-3 mt-32'>
              <p className={styles.gradienttext}>Game MarketPlace</p>
              <p className={styles.maintext}>Reserve, Showcase, and Monetize Your Games</p>
              <p className={styles.desctext}>Connect with gamers and industry peers in our dynamic marketplace. Secure a virtual booth for your developer team and make your mark in the gaming world.</p>
              <div className='flex gap-4 mt-3'>
                <div className={styles.but}>
                  <p>Explore</p>
                </div>
                <div className={styles.but2}>
                  <p>Reserve</p>
                </div>
              </div>
            </div>
          </div>
          <div className='w-1/2 flex items-center justify-end'>
            <Image src="/animation.svg" width={320} height={260} />
          </div>
        </div>
      </div>
    )
  }

  export default XpoArena