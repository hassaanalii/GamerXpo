import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from "./page.module.css"
const Footer = () => {
  return (
    <footer class={` ${styles.footer} text-white py-8`}>
        <div class="container mx-auto flex flex-col lg:flex-row justify-between items-center px-4">
            <div class="flex items-center mb-4 lg:mb-0">
                <Image className="h-8 w-auto mr-2" src="/mainlogo.png" width={500} height={300}/>
                <h2 class="text-xl font-bold">XpoArena</h2>
            </div>

            <div class="flex flex-col lg:flex-row items-center"> 
                <a href="#" class="text-gray-300 hover:text-white py-2 px-4 lg:py-0 lg:px-2">Privacy</a>
                <a href="#" class="text-gray-300 hover:text-white py-2 px-4 lg:py-0 lg:px-2">About us</a>
            </div>

            <div class="flex items-center">
                <Link href="#">
                    <Image className="h-8 w-auto mr-2 hover:text-white mx-2" src="/twitter.png" width={500} height={300}/>
                </Link>
                <Link href="#">
                    <Image className="h-8 w-auto mr-2 hover:text-white mx-2" src="/facebook.png" width={500} height={300}/>
                </Link>
                <Link href="#">
                    <Image className="h-8 w-auto mr-2 hover:text-white mx-2" src="/linkedin.png" width={500} height={300}/>
                </Link>
            </div>
        </div>

        <div class="container mx-auto mt-4 text-center">
            <p class="text-gray-500 text-sm">© 2023 XpoArena. All Rights Reserved.</p>
        </div>
    </footer>

  )
}

export default Footer