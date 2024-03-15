'use client'
import AboutUsNavBar from '@/app/components/aboutusnavbar/AboutUsNavBar'
import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Button from '@/app/components/button/Button'
import { usePathname } from 'next/navigation'
import Link from 'next/link'


async function getData(title){
    const res = await fetch(`http://localhost:8000/api/games/?title=${title}`,  { next: { revalidate: 0 } })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
     
    return res.json()

}
export default async function Game({params}){
    const pathname = usePathname()
    const data = await getData(params.title)
    console.log(data)
    const requirementsList = data.system_requirements ? data.system_requirements.split(';').map((item, index) => (
        item.trim() && <li key={index}>{item.trim()}</li>
      )) : <li>No system requirements provided.</li>;
    return (
        <>
        <AboutUsNavBar classname={"game"} />
        <div className={` ${styles.parentdiv} `}>
            <div className={` ${styles.demo} container grid grid-cols-6`}>
                <div className='first col-span-5'>
                    <div className='mt-12 flex flex-col gap-10'>
                        <iframe src={data.game_iframe_src} width={900} height={600} frameborder="0"></iframe>
                        <div className={styles.info}>
                            <div className='p-10 flex flex-col gap-16'>
                                <div className='flex flex-col gap-3'>
                                    <p className='text-xl font-bold'>{data.title}</p>
                                    <div className='flex flex-row gap-3'>
                                    <Button text="Share" classname="share" />
                                    <Link href={`${pathname}/manage`}>
                                        <Button text="Manage" classname="manage" />
                                    </Link>
                                    
                                    </div>

                                </div>
                                <div className='flex flex-row gap-28'>
                                    <div className='flex flex-col gap-3'>
                                        <p className={styles.infotext}>Genre:</p>
                                        <p className={styles.infotext}>Release Date:</p>
                                        <p className={styles.infotext}>Technology:</p>
                                        <p className={styles.infotext}>Last Updated:</p>
                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <p className={styles.infotextvalue}>{data.genre}</p>
                                        <p className={styles.infotextvalue}>{data.release_date}</p>
                                        <p className={styles.infotextvalue}>{data.technology}</p>
                                        <p className={styles.infotextvalue}>{data.last_updated}</p>
                                    </div>
                                </div>
                                <div>
                                    <p>{data.game_description}</p>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-lg font-semibold'>System Requirements</p>
                                    <ul style={{ listStyleType: 'disc', padding: '0', marginLeft: '20px', marginTop: '12px' }}>
                                    {requirementsList}
                                    </ul>

                                </div>
                            </div>
                            
                        </div>
                        <div className='flex flex-col gap-3 mt-10'>
                            <p className="text-xl font-bold text-white">Game Trailer</p>
                            <video className={styles.video} controls autoplay loop>
                                <source src={`http://localhost:8000${data.game_trailer}`} type="video/mp4" />

                            </video>
                        </div>
                        <div className="mt-20 mb-24 align-center justify-center flex">
                            <button className={styles.purchase}>
                                <Image src="/download.png" width={30} height={30} />
                                <p className='font-semibold text-md text-white'>Purchase Now!</p>
                            </button>
                        </div>


                        
                    </div>
                </div>
                <div className='second col-span-1 '>
                    <div className="mt-12 flex flex-end">
                        <Image src="/advertisement.png" width={200} height={2000}  />
                    </div>
                </div>
                
                



            </div>
            
        </div>
        </>
        
    )
}
