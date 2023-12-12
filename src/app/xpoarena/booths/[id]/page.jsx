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
import ColorItem from "@/app/components/coloritem/ColorItem";
import Head from 'next/head';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = ({params, children}) => {
  const [boothData, setBoothData] = useState(null);
  const [boothError, setBoothError] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [gameError, setGameError] = useState(null);
  const [themeData, setThemeData] = useState(null);
  const [themeError, setThemeError] = useState(null);
  const [isCollapsedSidebar, setIsCollapsedSidebar] = useState(false);
  const [isDropDownShown, setIsDropDownShown] = useState(false);
  const [isDropDownShownForFont, setIsDropDownShownForFont] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#F9F9F9'); 
  const [fontColor, setFontColor] = useState('#000000');
  const [selectedTheme, setSelectedTheme] = useState("")



  const colorList = [
    "#606c38",
    "#fefae0",
    "#dda15e",
    "#cdb4db",
    "#ffc8dd",
    "#a2d2ff",
    "#ffb703",
    "#780000",
    "#dad7cd",
    "#3a5a40",
    "#d5bdaf",
    "#003049",
    "#264653",
    "#d6ccc2",
    "#ffd6ff",
    "#bc4749",
    "#6c757d",
    "#ffffff",
    "#000000",
  ]

  const toggleSideBarCollapsedHandler = () =>{
    setIsCollapsedSidebar(!isCollapsedSidebar);
  }
  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value);
    fetchThemeDetails(event.target.value);
  };

  const fetchThemeDetails = async(name) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/theme/?name=${name}`)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setThemeData(result);
    } catch (error) {
      setThemeError(error.message);
    }
  }
  const handleClick = () =>{
    setIsCollapsedSidebar(!isCollapsedSidebar)
  }
  const handleDropDown = () =>{
    setIsDropDownShown(!isDropDownShown)
  }
  const handleDropDownForFont = () =>{
    setIsDropDownShownForFont(!isDropDownShownForFont)
  }
  const decisionFunction = () =>{
    if (isCollapsedSidebar){
      handleClick();
    }
    else{
      handleDropDown();
    }
  }  

  const decisionFunctionForFont = () =>{
    if (isCollapsedSidebar){
      handleClick();
    }
    else{
      handleDropDownForFont();
    }
  } 
  console.log(backgroundColor)
  console.log(fontColor)
  const postBoothCustomizations = async () => {
    const formData = new FormData();
    formData.append('booth', params.id);
    formData.append('theme', themeData.id);
    formData.append('background_color', backgroundColor);
    formData.append('font_color', fontColor);

    try {
        const response = await fetch('http://127.0.0.1:8000/api/customizedbooth/', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            toast.success('Customizations Added Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });

        } else {
            const errorResult = await response.json();
            console.error('Error from server:', errorResult);
            toast.error('We encountered an unexpected issue while processing your request. Please try again later.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    } catch (error) {
        toast.error('Failed to submit form. Please try again later.');
    }
  };

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
    if (themeData?.font_name) {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css?family=${themeData.font_name.replace(/\s+/g, '+')}:wght@400;700&display=swap`;
      link.rel = 'stylesheet';
      
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [themeData]);

  if (gameError || boothError) {
    return <div>Error: {error}</div>;
  }

  if (!gameData || !boothData) {
    return <div>Loading...</div>;
  }
  {themeData &&
    console.log(themeData.font_name) 
  }

  return (
    <>
      <div>

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
              <li>
                <Link href={`${pathname}/manage`} className={styles.sidebar_link} >
                  <Image src="/editing.png" width={23} height={23} className={styles.link_icon}/>
                  <span className={styles.link_name}>Manage</span>
                </Link>
              </li>
              <li>
                <Link href={`${pathname}/aboutus`} className={styles.sidebar_link}>
                  <Image src="/editing.png" width={23} height={23} className={styles.link_icon}/>
                  <span className={styles.link_name}>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="" className={styles.sidebar_link} title="Background Color" onClick={decisionFunction}>
                  <Image src="/editing.png" width={23} height={23} className={styles.link_icon}/>
                  <span className={styles.link_name}>Background Color</span>
                  <Image src="/downarrow.png" width={14} height={14} className={styles.downArrow}/>
                </Link>
                <div className={`${styles.colors} ${isDropDownShown ? 'max-h-screen' : 'hidden'} overflow-hidden transition-max-height duration-300 ease-in-out`}>
                  <div className={styles.colorList}>
                      {colorList.map((color, index) => <ColorItem color={color} onColorClick={()=> setBackgroundColor(color)}/>)}
                  </div>
                </div>
              </li>
              <li>
                <Link href="" className={styles.sidebar_link} title="Font Color" onClick={decisionFunctionForFont}>
                  <Image src="/editing.png" width={23} height={23} className={styles.link_icon}/>
                  <span className={styles.link_name}>Font Color</span>
                  <Image src="/downarrow.png" width={14} height={14} className={styles.downArrow}/>
                </Link>
                <div className={`${styles.colors} ${isDropDownShownForFont ? 'max-h-screen' : 'hidden'} overflow-hidden transition-max-height duration-300 ease-in-out`}>
                  <div className={styles.colorList}>
                      {colorList.map((color, index) => <ColorItem color={color} onColorClick={()=> setFontColor(color)}/>)}
                  </div>
                </div>
              </li>
              <li>
                <div className={styles.themeSelector}>
                  <p>Select a Theme:</p>
                  <form>
                    <label>
                      <input type="radio" value="Adrenaline Rush" name="theme" onChange={handleThemeChange} checked={selectedTheme === 'Adrenaline Rush'} />
                      Adrenaline Rush
                    </label>
                    <label>
                      <input type="radio" value="Explorer's Realm" name="theme" onChange={handleThemeChange} checked={selectedTheme === "Explorer's Realm"} />
                      Explorer's Realm
                    </label>
                    <label>
                      <input type="radio" value="Mind Bender" name="theme" onChange={handleThemeChange} checked={selectedTheme === 'Mind Bender'} />
                      Mind Bender
                    </label>
                    <label>
                      <input type="radio" value="Champion's Field" name="theme" onChange={handleThemeChange} checked={selectedTheme === "Champion's Field"} />
                      Champion's Field
                    </label>
                    <label>
                      <input type="radio" value="Haunting Grounds" name="theme" onChange={handleThemeChange} checked={selectedTheme === 'Haunting Grounds'} />
                      Haunting Grounds
                    </label>
                    <label>
                      <input type="radio" value="Arcade Classics" name="theme" onChange={handleThemeChange} checked={selectedTheme === 'Arcade Classics'} />
                      Arcade Classics
                    </label>
                    <label>
                      <input type="radio" value="Bullet Storm" name="theme" onChange={handleThemeChange} checked={selectedTheme === 'Bullet Storm'} />
                      Bullet Storm
                    </label>
                  </form>
                </div>
              </li>
              <li>
                <div className="flex flex-row gap-2">
                  <button onClick={postBoothCustomizations}>Save</button>
                  <button>Reset</button>
                </div>
                
              </li>


              
            </ul>
          </aside>
        </div>
        <div className="middle col-span-5">
          <div className={styles.maindiv}>
              {themeData && themeData.theme_video && (
                <video
                  className={styles.backgroundVideo} 
                  src={`http://127.0.0.1:8000/${themeData.theme_video}`}
                  autoPlay
                  loop
                
                />
            )}
            <div className='w-full pt-28'>
              <div className='flex flex-col'>
                <div className='flex flex-col '>
                  <p className='text-[110px] font-bold' style={{ fontFamily: themeData?.font_name || 'defaultFontFamily', color: fontColor || '#000000'}}>
                    {boothData?.name}!
                  </p>
                </div>
                <div className='flex flex-col'>
                  
                  <Link href="/xpoarena">
                    <Button text="Explore Games" classname="myboothbutton" />
                  </Link>

                </div>
              </div>
             
            </div>
          </div>
        </div>
       
      </div>
      <div className={`${styles.maingame} container grid grid-cols-6 pb-16`} style={{backgroundColor: backgroundColor}}>
      <div className="first col-span-1"></div>
      <div className="middle col-span-4 flex flex-col mt-16">
        <div className='gap-5 flex flex-col'>
          <div>
            <p className='text-3xl font-bold' style={{color: backgroundColor === '#FFFFFF' ? '#000000' : backgroundColor === '#000000' ? '#FFFFFF' : 'initial' }}>Popular Games</p>
          </div>
          <div className="grid grid-cols-4 mt-5 gap-4">
            {gameData.map((game, index) => (
              <Link href={`${pathname}/${game.title}`}>
                <div
                  key={game.id}
                  className="flex flex-col bg-white overflow-hidden border border-gray-200 rounded-lg hover:shadow-lg hover:border-black transform hover:scale-105 transition duration-300 cursor-pointer"
                >
                  <Image
                    src={game.image_url}
                    alt={game.title}
                    width={160}
                    height={90}
                    layout="responsive"
                    objectFit="cover"
                    className="rounded-t-lg"
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
      <div className="last col-span-1"></div>
    </div>
      <Footer />
    </div>
    </>
  )
  
}

export default page