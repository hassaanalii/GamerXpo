'use client'
import BoothNavBar from '@/app/components/boothnavbar/BoothNavBar';
import styles from "./page.module.css"
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/app/components/button/Button';
import Footer from '@/app/components/footer/Footer';
import { usePathname } from 'next/navigation';


async function getData(id) {
  const res = await fetch(`http://127.0.0.1:8000/api/games/?id=${id}`,  { next: { revalidate: 0 } })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

async function fetchData(id){
  const res = await fetch(`http://127.0.0.1:8000/api/booth/?id=${id}`,  { next: { revalidate: 0 } })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function page ({params}) {
  const pathname = usePathname()
  const boothInfo = await fetchData(params.id);
  const gameData = await getData(params.id)
  
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
        <hr className='mt-10 w-1/2 text-center ml-auto mr-auto'/>
      </div>
      <div className={`${styles.maingame} container grid grid-cols-6 pb-16`}>
      <div className="first col-span-1"></div>
      <div className="middle col-span-4 flex flex-col">
        <div className='mt-16 gap-5 flex flex-col'>
          <div>
            <p className='text-xl font-bold'>Popular Games</p>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {gameData.map((game, index) => (
              <Link href={`${pathname}/${game.title}`}>
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
      <Footer />
    </>
  )
}

