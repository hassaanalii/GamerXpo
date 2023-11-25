import Image from 'next/image'
import React from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import SearchBar from '../searchbar/SearchBar'


const BoothNavBar = () => {
  return (
    <div className={` ${styles.top} shadow-sm`}>
        <div>
            <Image className={styles.settings} src="/setting-lines.png" width={22} height={22} />
        </div>
    <div className={`${styles.navbar} h-16 my-0 mx-auto flex items-center justify-between`}>
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
        <div className='flex items-center gap-10'>
  
          <Link href="/xpoarena/booths">
            <div className={`${styles.navItemDiv} p-2`}>
              <p className={styles.navItems}>Games</p>
            </div>
          </Link>
          <Link href="/xpoarena/manage">
            <div className={`${styles.navItemDiv} p-2`}>
              <p className={styles.navItems}>Manage</p>
            </div>
          </Link>
          <Link href="/xpoarena/manage">
            <div className={`${styles.navItemDiv} p-2`}>
              <p className={styles.navItems}>About Us</p>
            </div>
          </Link>
        </div>
    </div>
    </div>
  )
}

export default BoothNavBar