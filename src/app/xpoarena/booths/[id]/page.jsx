'use client'
import { useContext, createContext} from "react"
import BoothNavBar from '@/app/components/boothnavbar/BoothNavBar';
import styles from "./page.module.css"
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/app/components/button/Button';
import Footer from '@/app/components/footer/Footer';
import { usePathname } from 'next/navigation';
import { useState, useEffect} from 'react';

const page = ({params, children}) => {
  const [boothData, setBoothData] = useState(null);
  const [boothError, setBoothError] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [gameError, setGameError] = useState(null);
  const [isCollapsedSidebar, setIsCollapsedSidebar] = useState(true);

  const toggleSideBarCollapsedHandler = () =>{
    setIsCollapsedSidebar(!isCollapsedSidebar);
  }
  
  const pathname = usePathname()

  useEffect(() => {
    const fetchBoothData = async (id) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/booth/?id=${id}`,  { next: { revalidate: 0 } })
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setBoothData(result);
      } catch (error) {
        setBoothError(error.message);
      }
    };

    const fetchGameData = async (id) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/games/?id=${id}`,  { next: { revalidate: 0 } })
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setGameData(result);
      } catch (error) {
        setGameError(error.message);
      }
    };

    fetchBoothData(params.id);
    fetchGameData(params.id);
  }, []);

  if (gameError || boothError) {
    return <div>Error: {error}</div>;
  }

  if (!gameData || !boothData) {
    return <div>Loading...</div>;
  }

  
  return (
    <>
      
      <div className={` ${styles.parentdiv} container grid grid-cols-6`}>
        <div className="first col-span-1">
       
        <button className={`${styles.btn} ${isCollapsedSidebar ? styles.btnCollapsed : ''}`} onClick={toggleSideBarCollapsedHandler}>
            <Image src="/back.png" width={22} height={22}/>
        </button>
    

          <aside className={isCollapsedSidebar ? styles.collapsed : styles.sidebar}>
            <div className={styles.sidebar_top}>
              <Image src="/mainlogo.png" width={30} height={30} className={styles.sidebar_img} />
              <p className={styles.logo_name}>XpoArena</p>
            </div>
            <ul className={styles.sidebar_list}>
              <li className={styles.sidebar_item}>
                <Link href={`${pathname}/games`} className={styles.sidebar_link} title="Games">
                  <Image src="/games.png" width={23} height={23} className={styles.link_icon}/>
                  <span className={styles.link_name}>Games</span>
              </Link>
              </li>
    

                <Link href={`${pathname}/manage`} className={styles.sidebar_link} >
                  <Image src="/editing.png" width={23} height={23} className={styles.link_icon}/>
                  <span className={styles.link_name}>Manage</span>
                </Link>
                <Link href={`${pathname}/aboutus`} className={styles.sidebar_link}>
                  <Image src="/editing.png" width={23} height={23} className={styles.link_icon}/>
                  <span className={styles.link_name}>About Us</span>
                </Link>

              
            </ul>
          </aside>
        </div>
        <div className="middle col-span-4">
          <div className={styles.maindiv}>
            <div className='grid grid-cols-2 gap-x pt-28'>
              <div className='flex flex-col gap-5 pt-20'>
                <div className='flex flex-col'>
                  <p className='text-[45px] font-bold'>
                    Welcome to
                  </p>
                  <p className='text-[45px] font-bold'>
                    {`${boothData.name}!`}
                  </p>
                </div>
                <div className='flex flex-col gap-8'>
                  <p>{boothData.description}</p>
                  <Link href="/xpoarena">
                    <Button text="Explore Games" classname="exploregames" />
                  </Link>

                </div>
              </div>
              <div className='flex align-center justify-end'>
                {boothData.image && (
                  <Image
                    className="rounded-md"
                    src={`http://127.0.0.1:8000/${boothData.image}`}
                    width={300}
                    height={300}
                    alt="Booth Image"
                  />
                )}
                {!boothData.image && <p>No image available</p>}
              </div>
            </div>
          </div>
        </div>
        <div className='last col-span-1'></div>
      </div>
      <div className={`${styles.maingame} container grid grid-cols-6 pb-16`}>
      <div className="first col-span-1"></div>
      <div className="middle col-span-4 flex flex-col">
        <div className='gap-5 flex flex-col'>
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

export default page