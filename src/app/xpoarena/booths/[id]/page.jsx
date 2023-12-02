'use client'
import BoothNavBar from '@/app/components/boothnavbar/BoothNavBar';
import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/app/components/button/Button';
import Footer from '@/app/components/footer/Footer';



const page = ({params}) => {
  const [boothInfo, setBoothInfo] = useState([])
  useEffect(() => {
    if (params && params.id) {
      fetchData(params.id);
    }
  }, []);

  const fetchData = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/booth/?id=${id}`);
      if (response.ok) {
        const data = await response.json();
        setBoothInfo(data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <BoothNavBar showIcon={true} />
      <div className={styles.parentdiv}>
        <div className={styles.maindiv}>
          <div className='grid grid-cols-2 gap-x pt-28'>
            <div className='flex flex-col gap-5 pt-20'>
              <div className='flex flex-col'>
                <p className='text-[45px] font-bold'>
                  Welcome to
                </p>
                <p className='text-[45px] font-bold'>
                  {`${boothInfo.name}!`}
                </p>
              </div>
              <div className='flex flex-col gap-8'>
                <p>{boothInfo.description}</p>
                <Link href="/xpoarena">
                  <Button text="Explore Games" classname="exploregames" />
                </Link>

              </div>
            </div>
            <div className='flex align-center justify-end'>
              {boothInfo.image && (
                <Image
                  className="rounded-md"
                  src={`http://127.0.0.1:8000/${boothInfo.image}`}
                  width={300}
                  height={300}
                  alt="Booth Image"
                />
              )}
              {!boothInfo.image && <p>No image available</p>}
            </div>
          </div>
        </div>
        <hr className='mt-44 w-1/2 text-center ml-auto mr-auto'/>
        <div className={styles.developers}>
          <div className={styles.innerdev}>
            <p className="text-xl font-bold">Developers</p>
            <div className='flex flex-row mt-10 gap-32'>
                <div className={styles.info}>
                    <div className='pt-4 pr-10 pl-10'>
                      <Image src="/profile.png" width={200} height={200} />
                    </div>
                    <div className='mt-5 flex justify-center'>
                      <p className='font-semibold'>Muhammad Hassaan Ali</p>
                    </div>
                    <div className='mt-6 mb-9 w-1/3 ml-7 flex flex-col gap-1'>
                      <p className='text-xs'>Game Designer</p>
                      <p className='text-xs'>Gender: Male</p>
                      <p className='text-xs'>Age: 21</p>
                    </div>
                </div>
                <div className={styles.info}>
                    <div className='pt-4 pr-10 pl-10'>
                      <Image src="/profile.png" width={200} height={200} />
                    </div>
                    <div className='mt-5 flex justify-center'>
                      <p className='font-semibold'>Muhammad Hassaan Ali</p>
                    </div>
                    <div className='mt-6 mb-9 w-1/3 ml-7 flex flex-col gap-1'>
                      <p className='text-xs'>Game Designer</p>
                      <p className='text-xs'>Gender: Male</p>
                      <p className='text-xs'>Age: 21</p>
                    </div>
                </div>
                <div className={styles.info}>
                    <div className='pt-4 pr-10 pl-10'>
                      <Image src="/profile.png" width={200} height={200} />
                    </div>
                    <div className='mt-5 flex justify-center'>
                      <p className='font-semibold'>Muhammad Hassaan Ali</p>
                    </div>
                    <div className='mt-6 mb-9 w-1/3 ml-7 flex flex-col gap-1'>
                      <p className='text-xs'>Game Designer</p>
                      <p className='text-xs'>Gender: Male</p>
                      <p className='text-xs'>Age: 21</p>
                    </div>
                </div>
                
            </div>

          </div>
        </div>
        <hr className='mt-32 w-1/2 text-center ml-auto mr-auto'/>
        <div className={` ${styles.maindiv} pb-56`}>
          <div className='grid grid-cols-2 gap-x pt-20'>
            <div className='flex flex-col gap-5 pt-20'>
              <div className='flex flex-col'>
                <p className='text-[45px] font-bold'>
                  10 Pearls
                </p>
              </div>
              <div className='flex flex-col gap-8'>
                <p>10Pearls was founded in 2004 by brothers Imran and Zeeshan Aftab. What began as a two-person operation is now a global business with offices in the United States, Costa Rica, Colombia, United Kingdom, Pakistan and Peru.</p>
                <Link href="/xpoarena">
                  <Button text="Get In Touch" classname="exploregames" />
                </Link>

              </div>
            </div>
            <div className='flex align-center justify-end'>
              {boothInfo.image && (
                <Image
                  className="rounded-md mt-10"
                  src="/10pearls.png"
                  width={300}
                  height={300}
                  alt="Booth Image"
                />
              )}
              {!boothInfo.image && <p>No image available</p>}
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  )
}

export default page