import React from 'react'
import styles from './page.module.css'
import Button from '../../components/button/Button'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/app/components/navbar/Navbar'




async function getData() {
    const res = await fetch('http://127.0.0.1:8000/api/booth/', { next: { revalidate: 0 } })
    //wait (Await) till the promise of fetch is resolved
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }

export default async function Booths() {
    const data = await getData()

    return (
      <>
      <Navbar />
        <div className={styles.parentdiv}>
            <div className={styles.booths}>
          <div className={` ${styles.innerbooth} flex flex-row align-center justify-between pt-6 `}> 
              <div className="flex justify-center items-center">
                <p className='text-lg font-semibold'>Game Booths</p>
              </div>
              <div className="flex align-center justify-center gap-6">
                
                <Button text="Best Seller" classname="bestseller" />
              </div>
          </div>
          <div className={` ${styles.mybooth} mt-10 flex justify-between `}>
            {data.map((item, index)=>(
            <Link href={`/xpoarena/booths/${item.name}`}>
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
          <div className='pt-16 pb-16'>
            Pagination here
          </div>
        </div>
        </div>
    </>
  )
}
