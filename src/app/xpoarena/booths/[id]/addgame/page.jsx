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
import { useRouter } from 'next/navigation';




const AddGame = (params) => {
    const [gameTitle, setGameTitle] = useState('');
    const [gameDescription, setGameDescription] = useState('');
    const [systemRequirements, setSystemRequirements] = useState('');
    const [gameDemoLink, setGameDemoLink] = useState('');
    const [gameDownloadLink, setGameDownloadLink] = useState('');
    const [imageUrlLink, setImageUrlLink] = useState('');

    const [releaseDate, setReleaseDate] = useState('');
    const [gameGenre, setGameGenre] = useState('Adventure');
    const [gameTechnology, setGameTechnology] = useState('HTML5');
    const [gamePrice, setGamePrice] = useState('');
    const [selectedVideo, setSelectedVideo] = React.useState(null);
    const [videoFileName, setVideoFileName] = React.useState('');

    const pathname = usePathname()
    const segments = pathname.split('/');
    const boothId = segments[3];


    const [selectedImage, setSelectedImage] = useState(null)
    const [fileName, setFileName] = useState('');

    const handleImageFile = (file) => {
        setSelectedImage(file);
        setFileName(file.name);
    }
    const handleVideoFile = (file) => {
        setSelectedVideo(file);
        setVideoFileName(file.name);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('booth', boothId);
        formData.append('title', gameTitle);
        formData.append('release_date', releaseDate);
        formData.append('game_iframe_src', gameDemoLink);
        formData.append('genre', gameGenre)
        formData.append('game_description', gameDescription);
        if (selectedImage) {
            formData.append('image', selectedImage);
        }
        formData.append('technology', gameTechnology);
        formData.append('system_requirements', systemRequirements);
        if (selectedVideo) {
            formData.append('game_trailer', selectedVideo);
        }
        formData.append('price', gamePrice);
        formData.append('game_download_link', gameDownloadLink);


        try {
            const response = await fetch('http://localhost:8000/api/games/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                toast.success('Game Added Successfully', {
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
                toast.error(`Error: ${errorResult.detail}`, { // Make sure 'detail' is the correct key
                    // toast options
                });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error(`Error: ${error.toString()}`, {
                // toast options
            });
        }
    };

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
                            <p className='text-3xl font-medium'>Add Game</p>
                            <p className={styles.description}>Set up your showcase by adding a new game to your virtual booth.</p>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <div>
                                <p className='text-xs font-semibold'>Game Title</p>
                                <input type="text" onChange={(e) => setGameTitle(e.target.value)} className={`${styles.inputfield} text-xs border-0 border-b border-solid border-black w-full focus:ring-0 `} />
                            </div>
                            <div>
                                <p className='text-xs font-semibold'>Game Description</p>
                                <textarea name="textarea" onChange={(e) => setGameDescription(e.target.value)} id="textarea" cols="5" rows="3" className={` text-xs pl-1 pr-1 pt-1 border-0 border-b border-solid border-black w-full `}></textarea>
                            </div>
                            <div>
                                <p className='text-xs font-semibold'>Game Demo Link</p>
                                <input type="text" onChange={(e) => setGameDemoLink(e.target.value)} className={`${styles.inputfield} text-xs border-0 border-b border-solid border-black w-full focus:ring-0 `} />
                            </div>
                            <div>
                                <p className='text-xs font-semibold'>Release Date</p>
                                <input
                                    type="date"
                                    value={releaseDate}
                                    onChange={(e) => setReleaseDate(e.target.value)}
                                    className={`${styles.inputfield} text-xs border-0 border-b border-solid border-black w-full focus:ring-0`}
                                />
                            </div>
                            <div className='flex flex-row gap-10'>
                                <div>
                                    <p className='text-xs font-semibold'>Genre</p>
                                    <select
                                        value={gameGenre}
                                        onChange={(e) => setGameGenre(e.target.value)}
                                        className={`${styles.inputfield} text-xs w-full`}
                                    >
                                        <option value="Action">Action</option>
                                        <option value="Adventure">Adventure</option>
                                        <option value="Puzzle">Puzzle</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Casual">Casual</option>
                                        <option value="Shooting">Shooting</option>
                                        <option value="Driving">Driving</option>
                                        <option value="Horror">Horror</option>

                                    </select>
                                </div>
                                <div>
                                    <p className='text-xs font-semibold'>Technology</p>
                                    <select
                                        value={gameTechnology}
                                        onChange={(e) => setGameTechnology(e.target.value)}
                                        className={`${styles.inputfield} text-xs w-full`}
                                    >
                                        <option value="HTML5">HTML5</option>
                                        <option value="Unity">Unity</option>
                                        <option value="Unreal Engine">Unreal Engine</option>
                                        <option value="Cocos2d">Cocos2d</option>
                                        <option value="Godot">Godot</option>

                                    </select>
                                </div>
                            </div>

                            <div>
                                <p className='text-xs font-semibold'>System Requirements</p>
                                <textarea name="textarea" onChange={(e) => setSystemRequirements(e.target.value)} id="textarea" cols="5" rows="3" className={` text-xs pl-1 pr-1 pt-1 border-0 border-b border-solid border-black w-full `}></textarea>
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

                            <div>
                                <p className='text-xs font-semibold'>Image URL</p>
                                <UploadButton onImageUpload={handleImageFile} />
                                {
                                    fileName && (
                                        <p>{fileName}</p>
                                    )
                                }

                            </div>
                            <div className="w-1/2">
                                <UploadGame onImageUpload={handleVideoFile} image="/video.png" accept="video/mp4" />
                                <p className="text-xs text-green-500">{videoFileName}</p>
                            </div>
                            <div>
                                <p className='text-xs font-semibold'>Game Download Link</p>
                                <input type="text" onChange={(e) => setGameDownloadLink(e.target.value)} className={`${styles.inputfield} text-xs border-0 border-b border-solid border-black w-full focus:ring-0 `} />
                            </div>
                        </div>
                        <div>
                            <Button text="Add Game" classname="reservebutton" onclick={handleSubmit} />
                        </div>
                    </div>


                </div>

            </div>
        </>
    )
}

export default AddGame