'use client'
import AboutUsNavBar from '@/app/components/aboutusnavbar/AboutUsNavBar'
import React, { useState, useEffect } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Button from '@/app/components/button/Button'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Feedbacks from '@/app/components/feedbacks/Feedbacks'
import apiService from '@/app/services/apiService'
import { getAccessToken, getUsername } from '@/app/lib/actions'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Game({ params }) {
    const pathname = usePathname();
    const [feedbacks, setFeedbacks] = useState([]);
    const router = useRouter();
    const [data, setData] = useState(null);
    const [gameData, setGameData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isNew, setIsNew] = useState(false);

    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        const getFeedback = async () => {
            const access = await getAccessToken()
            if (!access) {
                router.push("/login")
            }
            const response = await apiService.get(`/api/get-game-id/${params.title}`)

            const game_id = response.game_id
            console.log(game_id)

            const getresponse = await apiService.get(`/api/games/${game_id}/feedbacks/`)
            console.log(getresponse)
            setFeedbacks(getresponse)


        }

        getFeedback();
    }, [params.id, isNew])

    const handleFeedbackSubmit = async () => {
        const access = await getAccessToken()
        if (!access) {
            router.push("/login")
        }
        const username = await getUsername()
        const responseofuser = await apiService.get(`/api/user/${username}`);
        console.log(responseofuser.role);


        if (responseofuser.role !== 'Gamer') {
            toast.error('You donot have the permissions to submit a feedback!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setFeedback('');
        } else {
            console.log(params.title)
            console.log("Feedback submitted:", feedback);

            setFeedback('');

            const response = await apiService.get(`/api/get-game-id/${params.title}`)

            const game_id = response.game_id

            const formData = new FormData();
            formData.append('feedback_text', feedback);
            formData.append('game_id', game_id);

            const feedbackres = await apiService.post(`/api/games/${game_id}/feedbacks/create/`, formData)
            console.log(feedbackres.data)
            toast.success('Your response has been submitted succesfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setIsNew(!isNew)


        }


    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:8000/api/games/?title=${params.title}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await res.json();
                setData(data);
                const gameRes = await fetch(`http://localhost:8000/api/getgamesbybooth/?booth_id=${params.id}&genre=${data.genre}`);
                if (!gameRes.ok) {
                    throw new Error('Failed to fetch data');
                }
                const gameData = await gameRes.json();
                setGameData(gameData);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [params.title, params.id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const requirementsList = data.system_requirements ? data.system_requirements.split(';').map((item, index) => (
        item.trim() && <li key={index}>{item.trim()}</li>
    )) : <li>No system requirements provided.</li>;

    const navigateToGame = (gameTitle) => {
        const url = `/xpoarena/booths/${params.id}/${encodeURIComponent(gameTitle)}`;
        router.push(url);
    };

    const onPurchaseClick = async () => {
        const username = await getUsername()
        const responseofuser = await apiService.get(`/api/user/${username}`);
        console.log(responseofuser.role);

        if (responseofuser.role === 'Gamer') {
            router.push(`/xpoarena/checkout/${data.id}`)
        }else{
            toast.error('You donot have the permissions to purchase this game!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }


    return (
        <>
            <AboutUsNavBar classname={"game"} />
            <div className={` ${styles.parentdiv} `}>
                <div className={` ${styles.demo} container grid grid-cols-6`}>
                    <div className='first col-span-5'>
                        <div className='mt-12 flex flex-col gap-10'>
                            <iframe src={data.game_iframe_src} width={900} height={600} frameBorder="0"></iframe>
                            <div className={styles.info}>
                                <div className='p-10 flex flex-col gap-16'>
                                    <div className='flex flex-col gap-3'>
                                        <p className='text-xl font-bold'>{data.title}</p>
                                        <div className='flex flex-row gap-3'>
                                            {/* <Button text="Share" classname="share" /> */}
                                            <Link href={`${pathname}/manage`}>
                                                <Button text="Manage" classname="manage" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className='flex flex-row gap-28'>
                                        <div className='flex flex-col gap-3'>
                                            <p className={styles.infotext}>Genre:</p>
                                            <p className={styles.infotext}>Release Date:</p>
                                            <p className={styles.infotext}>Technology:</p>
                                            <p className={styles.infotext}>Last Updated:</p>
                                            <p className={styles.infotext}>Price:</p>
                                        </div>
                                        <div className='flex flex-col gap-3'>
                                            <p className={styles.infotextvalue}>{data.genre}</p>
                                            <p className={styles.infotextvalue}>{data.release_date}</p>
                                            <p className={styles.infotextvalue}>{data.technology}</p>
                                            <p className={styles.infotextvalue}>{data.last_updated}</p>
                                            <p className={styles.infotextvalue}>{data.price}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p>{data.game_description}</p>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <p className='text-lg font-semibold'>System Requirements</p>
                                        <ul style={{ listStyleType: 'disc', padding: '0', marginLeft: '20px', marginTop: '12px' }}>
                                            {requirementsList}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {data.game_trailer && (
                                <div className='flex flex-col gap-3 mt-10'>
                                    <p className="text-xl font-bold text-white">Game Trailer</p>
                                    <video className={styles.video} controls autoPlay loop>
                                        <source src={`http://localhost:8000${data.game_trailer}`} type="video/mp4" />
                                    </video>
                                </div>
                            )}

                            <div className="mt-10 flex flex-col gap-3">
                                <h2 className="text-[25px] font-bold font-poppins text-white">Feedback</h2>
                                <div className="flex flex-col gap-2 items-start">
                                    <input
                                        type="text"
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        className="border p-2 w-full rounded-md shadow-sm text-[12px] font-poppins"
                                        placeholder="Write your feedback here..."
                                        required
                                    />
                                    <button
                                        onClick={handleFeedbackSubmit}
                                        className="bg-cgreen px-5 py-2 rounded-md mt-2 hover:bg-cgreen/90"
                                    >
                                        <p className="font-semibold text-[12px] font-poppins text-white">
                                            Submit Feedback
                                        </p>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-10 flex flex-col gap-3">
                                {feedbacks.length > 0 ? (

                                    feedbacks.map((feedback) => (
                                        <div key={feedback.id} className="bg-gray-800 p-4 rounded-md shadow-sm">
                                            <p className="text-white text-[15px] font-poppins">{feedback.feedback_text}</p>
                                            <p className="text-gray-500 text-[12px] font-poppins">Submitted by: {feedback.submitted_by_username}</p>
                                            <p className="text-gray-500 text-[12px] font-poppins">{new Date(feedback.created_at).toLocaleString()}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-white text-sm">No feedbacks yet.</p>
                                )}
                            </div>

                            <div className="mt-20 mb-24 align-center justify-center flex">
                                <div onClick={onPurchaseClick} className={` bg-cgreen rounded-md cursor-pointer ${styles.purchase}`}>
                                    <Image src="/download.png" width={20} height={20} alt="Purchase Now!" />
                                    <p className='font-semibold text-[12px] font-poppins text-white'>Purchase Now!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='second col-span-1 '>
                        <div className='text-white mt-5 flex flex-col'>
                            {gameData.map((game) => (
                                data.title !== game.title && (
                                    <div key={game.id} onClick={() => navigateToGame(game.title)} style={{ cursor: 'pointer' }}>
                                        {
                                            game.image_url ? (
                                                <Image
                                                    src={game.image_url}
                                                    alt={game.title}
                                                    width={160}
                                                    height={90}
                                                    className='mb-6 rounded-md'
                                                />
                                            ) : (
                                                <Image
                                                    src={`http://localhost:8000/${game.image}`}
                                                    alt={game.title}
                                                    width={160}
                                                    height={90}
                                                    className='mb-6 rounded-md'
                                                />
                                            )
                                        }
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
