'use client'
import BoothNavBar from '@/app/components/boothnavbar/BoothNavBar';
import React, { useEffect, useState } from 'react'
import styles from "./page.module.css"
import Image from 'next/image'


const page = ({params}) => {
  const [boothInfo, setBoothInfo] = useState([])
  useEffect(() => {
    if (params && params.name) {
      fetchData(params.name);
    }
  }, []);

  const fetchData = async (name) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/booth/?name=${name}`);
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
      <BoothNavBar />
      <div className={styles.parentdiv}>
        <div className={styles.maindiv}>
          <div className='grid grid-cols-2 gap-x pt-20'>
            <div className='flex flex-col gap-5 pt-20'>
              <div className='flex flex-col'>
                <p className='text-[45px] font-bold'>
                  Welcome to
                </p>
                <p className='text-[45px] font-bold'>
                  {`${boothInfo.name}!`}
                </p>
              </div>
              <div>
                <p>{boothInfo.description}</p>
              </div>
            </div>
            <div className='flex align-center justify-end'>
              <Image className="rounded-md" src={`http://127.0.0.1:8000/${boothInfo.image}`} width={300} height={300}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page