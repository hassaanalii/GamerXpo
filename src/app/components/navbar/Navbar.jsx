import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className={` ${styles.top} shadow-sm`}>
    <div className={`${styles.navbar} h-16 my-0 mx-auto flex items-center justify-between`}>
        <div className='flex gap-3'>
            <div className='flex items-center'>
              <Image src="/mainlogo.png" alt='mainlogo' width={12} height={12} />
            </div>
            <Link href="/xpoarena">
              <p className={styles.gradienttext}>XpoArena</p>
            </Link>
        </div>
        <div className='flex items-center gap-10'>
          <Link href="/xpoarena/booths">
            <div className={`${styles.navItemDiv} p-2`}>
              <p className={styles.navItems}>Explore</p>
            </div>
          </Link>
          <Link href="/xpoarena/reserve">
            <div className={`${styles.navItemDiv} p-2`}>
              <p className={styles.navItems}>Reserve</p>
            </div>
          </Link>
        </div>
    </div>
    </div>
    
  )
}

export default Navbar