import AboutUsNavBar from '@/app/components/aboutusnavbar/AboutUsNavBar'
import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/app/components/button/Button'
import Footer from '@/app/components/footer/Footer'

const page = () => {
  return (
    <>
    <AboutUsNavBar />
    <div className={styles.main}>
    <div className={` ${styles.maindiv}  pb-36`}>
          <div className='grid grid-cols-2 gap-x pt-32'>
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

                <Image
                  className="rounded-md mt-10"
                  src="/10pearls.png"
                  width={300}
                  height={300}
                  alt="Booth Image"
                />
              
            </div>
          </div>
        </div>
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
        <Footer name={"10 Pearls"}/>
    </div>
        
    </>
  )
}

export default page