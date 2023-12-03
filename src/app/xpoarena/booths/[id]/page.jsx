'use client'
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
import { useContext, createContext} from "react"
import BoothNavBar from '@/app/components/boothnavbar/BoothNavBar';
import styles from "./page.module.css"
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/app/components/button/Button';
import Footer from '@/app/components/footer/Footer';
import { usePathname } from 'next/navigation';
import { useState, useEffect} from 'react';
const SidebarContext = createContext()

const page = ({params, children}) => {
  const [boothData, setBoothData] = useState(null);
  const [boothError, setBoothError] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [gameError, setGameError] = useState(null);
  const [expanded, setExpanded] = useState(true)
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
      <BoothNavBar showIcon={true} />
      <div className={` ${styles.parentdiv} container grid grid-cols-6`}>
        <div className="first col-span-1">
              <aside className="h-screen">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
              <div className="p-4 pb-2 flex justify-between items-center">
                <img
                  src="https://img.logoipsum.com/243.svg"
                  className={`overflow-hidden transition-all ${
                    expanded ? "w-32" : "w-0"
                  }`}
                  alt=""
                />
                <button
                  onClick={() => setExpanded((curr) => !curr)}
                  className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                >
                  {expanded ? <ChevronFirst /> : <ChevronLast />}
                </button>
              </div>

              <SidebarContext.Provider value={{ expanded }}>
                <ul className="flex-1 px-3">{children}</ul>
              </SidebarContext.Provider>

              <div className="border-t flex p-3">
                <img
                  src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                  alt=""
                  className="w-10 h-10 rounded-md"
                />
                <div
                  className={`
                    flex justify-between items-center
                    overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
                `}
                >
                  <div className="leading-4">
                    <h4 className="font-semibold">John Doe</h4>
                    <span className="text-xs text-gray-600">johndoe@gmail.com</span>
                  </div>
                  <MoreVertical size={20} />
                </div>
              </div>
            </nav>
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

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext)
  
  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}

export default page