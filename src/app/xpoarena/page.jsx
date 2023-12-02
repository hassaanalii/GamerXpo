import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Button from '../components/button/Button'
import Link from 'next/link'
import SearchBar from '../components/searchbar/SearchBar'
import Navbar from '../components/navbar/Navbar'

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

  return (
    <>
    <Navbar />
    <div className={styles.parentdiv}>
      <div className={` ${styles.maindiv} flex`}>
        <div className='w-1/2 flex'>
          <div className='flex flex-col gap-3 mt-32'>
            <p className={styles.gradienttext}>Game MarketPlace</p>
            <p className={styles.maintext}>Reserve, Showcase, and Monetize Your Games</p>
            <p className={styles.desctext}>Connect with gamers and industry peers in our dynamic marketplace. Secure a virtual booth for your developer team and make your mark in the gaming world.</p>
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
                <SearchBar />
                <Button text="Best Seller" classname="bestseller" />
              </div>
          </div>
          <div className={` ${styles.mybooth} mt-10 flex justify-between `}>
            {data.slice(0,6).map((item, index)=>(
              <Link href={`/xpoarena/booths/${item.id}`}>
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
              </Link>
            ))}
          </div>
        </div>
        <Link href="/xpoarena/booths">
          <div className='h-16 flex flex-center justify-center'>
            <Button text="See All" classname="seeall" />
          </div>
        </Link>
      </div>
      
    </div>
    </>
  )
}



