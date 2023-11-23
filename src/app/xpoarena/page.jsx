import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Button from '../components/button/Button'

async function getData() {
  const res = await fetch('http://127.0.0.1:8000/api/booth/', { next: { revalidate: 0 } })
  //wait (Await) till the promise of fetch is resolved
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
export default async function XpoArena(){
  const data = await getData()
  console.log(data)
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
      <div className="flex align-center justify-center mt-10">
        <hr className={styles.hr} />
      </div>
      <div className='mt-10'>
        <div className={styles.booths}>
          <div className='flex flex-row align-center justify-between pt-6'> 
              <div className="flex justify-center items-center">
                <p className='text-lg font-semibold'>Game Booths</p>
              </div>
              <div className="flex align-center justify-center gap-6">
                <div class="flex items-center rounded-full bg-white shadow-md"> 
                  <svg class="w-5 h-5 ml-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10a4 4 0 11-2 3.464m2-3.464v-4m0 4H6" />
                  </svg>
                  <input class="w-full text-sm rounded-full py-2 pl-2 pr-4 bg-white focus:outline-none" type="search" placeholder="Search by Name" />
                </div>
                <Button text="Best Seller" classname="bestseller" />
                <Button text="See All" classname="element-with-half-border" />
              </div>
          </div>
          <div className={` ${styles.mybooth} mt-10 flex justify-between `}>
            {data.map((item, index)=>(
              <div key={index} className={` ${styles.boothdiv} `} >
               <div className={styles.imageContainer}>
                  <div className={styles.imageWrapper}>
                    <Image 
                      src={`http://127.0.0.1:8000${item.image}`} 
                      alt={item.name} 
                      className={styles.image}
                      width={360} /* Adjust the width to maintain the aspect ratio */
                      height={240} /* Adjust the height to maintain the aspect ratio */
                      objectFit='cover' /* Will cover the area of the div, may crop the image */
                    />
                  </div>
                </div>
                <div className='pl-5 flex flex-col gap-0.5'>
                  <h1 className="text-lg font-semibold">{item.name}</h1>
                  <h1 className="text-xs ">Company's Name</h1>
                </div>
                <div className='flex mt-6 align-center justify-between pr-3 pl-3'>
                  <h1 className='text-[10px] text-center'>Star Based Reviews</h1>
                  <h1 className='text-[10px] text-center'>Total Games</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}



