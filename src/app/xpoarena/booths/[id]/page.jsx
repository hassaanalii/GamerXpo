'use client'
import { useContext, createContext } from "react"
import BoothNavBar from '@/app/components/boothnavbar/BoothNavBar';
import styles from "./page.module.css"
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/app/components/button/Button';
import Footer from '@/app/components/footer/Footer';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import ColorItem from "@/app/components/coloritem/ColorItem";
import Head from 'next/head';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = ({ params, children }) => {
  const [boothData, setBoothData] = useState(null);
  const [boothError, setBoothError] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [gameError, setGameError] = useState(null);
  const [themeData, setThemeData] = useState(null);
  const [themeError, setThemeError] = useState(null);
  const [isCollapsedSidebar, setIsCollapsedSidebar] = useState(true);
  const [isDropDownShown, setIsDropDownShown] = useState(false);
  const [isDropDownShownForFont, setIsDropDownShownForFont] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");

  const [fontColor, setFontColor] = useState('#000000');
  const [selectedTheme, setSelectedTheme] = useState("")
  const [boothCustomizations, setBoothCustomizations] = useState(null)



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

  const toggleSideBarCollapsedHandler = () => {
    setIsCollapsedSidebar(!isCollapsedSidebar);
  }
  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value);
    fetchThemeDetails(event.target.value);
  };

  const fetchThemeDetails = async (name) => {
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
  const handleClick = () => {
    setIsCollapsedSidebar(!isCollapsedSidebar)
  }
  const handleDropDown = () => {
    setIsDropDownShown(!isDropDownShown)
  }
  const handleDropDownForFont = () => {
    setIsDropDownShownForFont(!isDropDownShownForFont)
  }
  const decisionFunction = () => {
    if (isCollapsedSidebar) {
      handleClick();
    }
    else {
      handleDropDown();
    }
  }

  const decisionFunctionForFont = () => {
    if (isCollapsedSidebar) {
      handleClick();
    }
    else {
      handleDropDownForFont();
    }
  }

  const postBoothCustomizations = async () => {
    const customizationData = {
      booth: params.id,
      theme: themeData === null ? 8 : themeData.id,
      background_color: backgroundColor,
      font_color: fontColor
    };


    const existingCustomizations = await fetch(`http://127.0.0.1:8000/api/customizedbooth/?id=${customizationData.booth}`)

    if (existingCustomizations.ok) {
      const customizations = await existingCustomizations.json()


      try {
        const response = await fetch(`http://127.0.0.1:8000/api/customizedbooth/${customizations.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(customizationData)
        });

        if (response.ok) {
          toast.success('Customizations Updated Successfully', {
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



    } else {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/customizedbooth/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(customizationData)
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
    }
  }
  const pathname = usePathname()

  useEffect(() => {
    const fetchBoothData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/booth/?id=${params.id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setBoothData(result);
      } catch (error) {
        setBoothError(error.message);
      }
    };

    fetchBoothData();
  }, [params.id]);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/games/?id=${params.id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setGameData(result);
        
      } catch (error) {
        setGameError(error.message);
      }
    };

    fetchGameData();
  }, [params.id]);

  useEffect(() => {
    const fetchBoothCustomizations = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/customizedbooth/?id=${params.id}`);
        if (response.ok) {
          const result = await response.json();
          setBoothCustomizations(result);
          if (result && result.theme) {
            fetchThemeDetails(result.theme);
          }
        } else {
          if (response.status === 500) {
            setBoothCustomizations({
              background_color: "#FFFFFF",
              font_color: "#000000",
            });

            setSelectedTheme('nothing');
          } else {
            throw new Error(`Server responded with status: ${response.status}`);
          }
        }
      } catch (error) {
        setBoothError(error.message);
      }
    };

    fetchBoothCustomizations();
  }, [params.id]);


  useEffect(() => {
    if (themeData?.font_name) {
      const fontNameFormatted = themeData.font_name.replace(/\s+/g, '+');
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css?family=${fontNameFormatted}:wght@400;700&display=swap`;
      link.rel = 'stylesheet';

      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
    // This effect depends on themeData.font_name, so it should be listed in the dependencies array
  }, [themeData?.font_name]);

  useEffect(() => {
    if (boothCustomizations) {
      if (boothCustomizations['background_color']) {
        setBackgroundColor(boothCustomizations['background_color']);
      }
      if (boothCustomizations['font_color']) {
        setFontColor(boothCustomizations['font_color']);
      }
    }
  }, [boothCustomizations]);


  useEffect(() => {
    const fetchThemeDetails = async (themeIdentifier) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/theme/?id=${themeIdentifier}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setThemeData(result);
        setSelectedTheme(result.name); // Set the theme name for the radio button to be checked
      } catch (error) {
        setThemeError(error.message);
      }
    };

    // Call fetchThemeDetails if you have the theme identifier
    if (boothCustomizations && boothCustomizations.theme) {
      fetchThemeDetails(boothCustomizations.theme);
    }
  }, [boothCustomizations]);

  if (gameError || boothError) {

    return <div>Error:  </div>;
  }


  if (!gameData || !boothData) {
    return <div>Loading...</div>;
  }
  {
    themeData &&
      console.log(themeData.font_name)
  }


  return (
    <>
      <div>

        <div className={` ${styles.parentdiv} container grid grid-cols-6`}>
          <div className="first col-span-1">
            <button className={`${styles.btn} ${isCollapsedSidebar ? styles.btnCollapsed : ''}`} onClick={toggleSideBarCollapsedHandler}>
              <Image src="/back.png" width={14} height={14} />
            </button>
            <aside className={isCollapsedSidebar ? styles.collapsed : styles.sidebar}>
              <div className={styles.sidebar_top}>
                <Image src="/mainlogo.png" width={30} height={30} className={styles.sidebar_img} />
                <p className={styles.logo_name}>XpoArena</p>
              </div>
              <ul className={styles.sidebar_list}>

                <li>
                  <Link href={`${pathname}/manage`} className={styles.sidebar_link} >
                    <Image src="/verified.png" width={20} height={20} className={styles.link_icon} />
                    <span className={styles.link_name}>Manage</span>
                  </Link>
                </li>
                <li>
                  <Link href={`${pathname}/aboutus`} className={styles.sidebar_link}>
                    <Image src="/abot.png" width={20} height={20} className={styles.link_icon} />
                    <span className={styles.link_name}>About Us</span>
                  </Link>
                </li>
                <li>
                  <Link href="" className={styles.sidebar_link} title="Background Color" onClick={decisionFunction}>
                    <Image src="/color.png" width={23} height={23} className={styles.link_icon} />
                    <span className={styles.link_name}>Background</span>
                    <Image src="/downarrow.png" width={14} height={14} className={styles.downArrow} />
                  </Link>
                  <div className={`${styles.colors} ${isDropDownShown ? 'max-h-screen' : 'hidden'} overflow-hidden transition-max-height duration-300 ease-in-out`}>
                    <div className={styles.colorList}>
                      {colorList.map((color, index) => <ColorItem color={color} onColorClick={() => setBackgroundColor(color)} />)}
                    </div>
                  </div>
                </li>
                <li>
                  <Link href="" className={styles.sidebar_link} title="Font Color" onClick={decisionFunctionForFont}>
                    <Image src="/color.png" width={23} height={23} className={styles.link_icon} />
                    <span className={styles.link_name}>Font</span>
                    <Image src="/downarrow.png" width={14} height={14} className={styles.downArrow} />
                  </Link>
                  <div className={`${styles.colors} ${isDropDownShownForFont ? 'max-h-screen' : 'hidden'} overflow-hidden transition-max-height duration-300 ease-in-out`}>
                    <div className={styles.colorList}>
                      {colorList.map((color, index) => <ColorItem color={color} onColorClick={() => setFontColor(color)} />)}
                    </div>
                  </div>
                </li>
                <li>
                  <div className={styles.themeSelector}>
                    <p className={styles.themeP}>Select a Theme:</p>
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
                  <div className={`flex flex-row gap-2 ${styles.butts}`}>
                    <button className={styles.savebutton} onClick={postBoothCustomizations}>Save</button>
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
                  muted

                />
              )}
              <div className='w-full pt-28'>
                <div className='flex flex-col'>
                  <div className='flex flex-col '>
                    <p className='text-[110px] font-bold' style={{ fontFamily: themeData?.font_name || 'defaultFontFamily', color: fontColor || '#000000' }}>
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
        <div className={`${styles.maingame} container grid grid-cols-6 pb-16`} style={{ backgroundColor: backgroundColor }}>
          <div className="first col-span-1"></div>
          <div className="middle col-span-4 flex flex-col mt-16">
            <div className='gap-5 flex flex-col'>
              <div className="flex flex-row justify-between">
                <p className='text-3xl font-bold' style={{ color: backgroundColor === '#FFFFFF' ? '#000000' : backgroundColor === '#000000' ? '#FFFFFF' : 'initial' }}>Popular Games</p>
                <Link href={`${pathname}/addgame`} className={styles.addgame}>Add Game</Link>
              </div>
              <div className="grid grid-cols-4 mt-5 gap-4">
                {console.log(gameData)}
                {gameData.map((game, index) => (
                  
                  <Link href={`${pathname}/${game.title}`}>
                    <div
                      key={game.id}
                      className="flex flex-col bg-white overflow-hidden border border-gray-200 rounded-lg hover:shadow-lg hover:border-black transform hover:scale-105 transition duration-300 cursor-pointer"
                    >
                      {game.image_url ? (
                        <Image
                          src={game.image_url}
                          alt={game.title}
                          width={160}
                          height={90}
                          layout="responsive"
                          objectFit="cover"
                          className="rounded-t-lg"
                        />
                      ) : (
                        <Image
                          src={`http://127.0.0.1:8000/${game.image}`}
                          alt={game.title}
                          width={160}
                          height={90}
                          layout="responsive"
                          objectFit="cover"
                          className="rounded-t-lg"
                        />
                      )}

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