// Filters on right hand side of the screen
import GameNavBar from '@/app/components/gamenavbar/GameNavBar'
import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import next from 'next'
import Link from 'next/link'


async function getData(id) {
  const res = await fetch(`http://127.0.0.1:8000/api/games/?id=${id}`,  { next: { revalidate: 0 } })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function page({params}){
  const data = await getData(params.id)
  return (
    <>
    <GameNavBar showIcon={true} />
    <div className={`${styles.main} container grid grid-cols-6 pb-16`}>
      <div className="first col-span-1"></div>
      <div className="middle col-span-4 flex flex-col">
        <div className='mt-16 gap-5 flex flex-col'>
          <div>
            <p className='text-xl font-bold'>Popular Games</p>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {data.map((game, index) => (
              <Link href={`games/${game.title}`}>
                <div
                  key={game.id}
                  className="flex flex-col overflow-hidden border border-gray-200 rounded-lg hover:shadow-lg hover:border-black transform hover:scale-105 transition duration-300 cursor-pointer"
                >
                  <Image
                    src={game.image_url}
                    alt={game.title}
                    width={160}
                    height={90}
                    layout="responsive"
                    objectFit="cover"
                    className="rounded-t-lg" // Top rounded corners for the image
                  />
                  <div className="p-5 flex flex-col gap-4">
                    <div>
                      <p className="text-center text-md font-semibold">{game.title}</p>
                    </div>
                  
                  </div>

                  <div className="flex justify-between p-3 items-center text-sm">
                      <p className='text-[12px] font-green-500 font-semibold'>{`${game.genre}`}</p>
                      <p className='text-[12px] font-green-500'>{`$${game.price}`}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="last col-span-1">Last Div (20%)</div>
    </div>
    </>
  )
}

