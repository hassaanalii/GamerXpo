import React from 'react'
import styles from './page.module.css'
import Button from '../../components/button/Button'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/app/components/navbar/Navbar'
import SearchBar from '@/app/components/searchbar/SearchBar'

async function getData(query) {
  let url = 'http://localhost:8000/api/booth/';
  if (query) {
    url += `?query=${encodeURIComponent(query)}`;  // Construct URL with query if it exists
  }
  const res = await fetch(url, { next: { revalidate: 0 } });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Booths({ searchParams }) {

  const query = searchParams.query || "";
  console.log(query)
  const data = await getData(query)
  console.log(data)

  return (
    <>
      <Navbar />
      <div className={styles.parentdiv}>
        <div className={styles.booths}>
          <div className={` ${styles.innerbooth} flex flex-row align-center justify-between pt-7 `}>
            <div className="flex justify-center items-center">
              <p className='text-lg font-semibold'>Game Booths</p>
            </div>
            {/* <div className="flex align-center justify-center gap-6">
                <Button text="Best Seller" classname="bestseller" />
              </div> */}
            <SearchBar />
          </div>
          {data.length > 0 ? ( // Check if the data array is not empty
            <div className={` ${styles.mybooth} mt-5 mb-5 flex justify-between `}>
              {data.map((item, index) => (
                <Link href={`/xpoarena/booths/${item.id}`} key={item.id}> {/* Move key to Link component for better performance */}
                  <div className={`transition duration-500 hover:scale-105 cursor-pointer ${styles.boothdiv} `} >
                    <div className={styles.imageContainer}>
                      <div className={styles.imageWrapper}>
                        <Image
                          src={`http://localhost:8000${item.image}`}
                          alt={item.name}
                          className={styles.image}
                          width={360}
                          height={240}
                          objectFit='cover'
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
          ) : (
            <div className='flex items-center justify-center mt-56'>
              <p className=" font-bold text-xl text-red-700 text-center">No booths available. Please check back later.</p>
            </div>
          )}

        </div>
      </div>
    </>
  )
}

