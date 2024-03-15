"use client"
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import UploadButton from '@/app/components/uploadbutton/UploadButton'
import Button from '@/app/components/button/Button'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/app/components/navbar/Navbar'
import UploadGame from '@/app/components/uploadbuttonforgame/UploadGame'
import AboutUsNavBar from '@/app/components/aboutusnavbar/AboutUsNavBar'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'






const AddGame = (params) => {
    const [gameDescription, setGameDescription] = useState('');
    const [systemRequirements, setSystemRequirements] = useState('');
    const [gamePrice, setGamePrice] = useState(''); 
    const [gameInfo, setGameInfo] = useState(null)
    const router = useRouter()  
  
    const pathname = usePathname()
    const segments = pathname.split('/'); 
    const gameName= segments[4];
    const boothid = segments[3];

    useEffect(() =>{
        if (gameName){
            fetchData(gameName)
        }
    }, []);

    const fetchData = async (gameName) =>{
        try {
            const response = await fetch(`http://localhost:8000/api/games/?title=${gameName}`);
            if (response.ok) {
              const data = await response.json();
              setGameInfo(data);
              setGamePrice(data.price)
              setSystemRequirements(data.system_requirements)
              setGameDescription(data.game_description);
            } else {
              console.error('Failed to fetch data');
            }
          } catch (error) {
            console.error('Error fetching data:', error); 
          }
    }
    
    
    
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('game_description', gameDescription);
        formData.append('system_requirements', systemRequirements);
        formData.append('price', gamePrice);

        try {
            const response = await fetch(`http://localhost:8000/api/games/${gameName}`, {
                method: 'PATCH',
                body: formData,
            });
    
            if (response.ok) {
                toast.success('Booth Updated Successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                  setTimeout(() => {
                      router.push(`/xpoarena/booths/${boothid}`);
                  }, 1000);
                
    
            } else {
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

    const handleSubmitSecond = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/games/${gameName}`, {
                method: 'DELETE',
            });
    
            if (response.status === 204) {
                toast.success('Game Deleted Successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                  setTimeout(() => {
                      router.push(`/xpoarena/booths/${boothid}`);
                  }, 1000);

            } else if (response.status === 404) {
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
            } else {
                // Handle other response status codes or errors
                console.error(`Failed to delete game ${gameName}`);
            }
        } catch (error) {
            // Handle network errors or exceptions
            console.error('Error occurred:', error);
        }
    }

    return (
        <>
            <AboutUsNavBar />
            <div class={` ${styles.top} grid grid-cols-[3fr_2fr] divide-x`}>
                <div className={styles.innerdiv}>
                    <Image src="/mario2.jpg" layout="fill"
                        objectFit="cover" />
                </div>
                <div className={` ${styles.innerdiv} flex justify-center mt-10 mb-10`}>
                    <div className='flex flex-col align-center justify-center gap-10'>
                        <div>
                            <p className='text-3xl font-medium'>{gameInfo ? gameInfo.title : "Games"}</p>
                            <p className={styles.description}>Maintain your Game's Details to showcase it to the world!</p>
                        </div>
                        <div className='flex flex-col gap-4'>
                            
                            <div>
                                <p className='text-xs font-semibold'>Game Description</p>
                                <textarea name="textarea" value={gameDescription} onChange={(e) => setGameDescription(e.target.value)} id="textarea" cols="5" rows="3" className={` text-xs pl-1 pr-1 pt-1 border-0 border-b border-solid border-black w-full `}></textarea>
                            </div>

                            <div>
                                <p className='text-xs font-semibold'>System Requirements</p>
                                <textarea name="textarea"  value={systemRequirements} onChange={(e) => setSystemRequirements(e.target.value)} id="textarea" cols="5" rows="3" className={` text-xs pl-1 pr-1 pt-1 border-0 border-b border-solid border-black w-full `}></textarea>
                            </div>
                            <div>
                                <p className='text-xs font-semibold'>Price</p>
                                <input 
                                type="number"
                                placeholder='0' 
                                value={gamePrice}
                                onChange={(e) => setGamePrice(e.target.value)} 
                                step="1"
                                min="0" 
                                className={`${styles.inputfield} text-xs w-full`} 
                                />
                            </div>

                            
                           
                            
                        </div>
                        <div className='flex flex-col gap-2'> 
                            <Button text="Update Game" classname="reservebutton" onclick={handleSubmit} />
                            <Button text="Delete Game" classname="deletebutton" onclick={handleSubmitSecond} />

                        </div>
                    </div>


                </div>

            </div>
        </>
    )
}

export default AddGame