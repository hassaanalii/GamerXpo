import Image from 'next/image'
import React from 'react'
import styles from './page.module.css'
import Link from 'next/link'


const AboutUsNavBar = () => {
  return (
    <div className={` ${styles.top} shadow-sm`}>
    
    <div className={`${styles.navbar} h-16 my-0 mx-auto flex items-center justify-center`}>
        <div className='flex gap-10'>
            
            <div className='flex gap-3'>
                <div className='flex items-center'>
                <Image src="/mainlogo.png" alt='mainlogo' width={12} height={12} />
                </div>
                <Link href="/xpoarena">
                <p className={styles.gradienttext}>XpoArena</p>
                </Link>
            </div>
            
        </div>
       
    </div>
    </div>
  )
}

export default AboutUsNavBar