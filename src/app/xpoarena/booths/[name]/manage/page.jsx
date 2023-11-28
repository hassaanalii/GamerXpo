'use client'
import React, { useEffect, useState } from 'react'
import styles from "../../../reserve/page.module.css"
import Image from 'next/image'
import UploadButton from '@/app/components/uploadbutton/UploadButton'
import Button from '@/app/components/button/Button'
import BoothNavBar from '@/app/components/boothnavbar/BoothNavBar'
import { usePathname } from 'next/navigation'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'


const page = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [boothName, setBoothName] = useState();
  const [boothDescription, setBoothDescription] = useState('');
  const [fileName, setFileName] = useState('')
  const [boothInfo, setBoothInfo] = useState([])
  const [boothId, setBoothId] = useState(0)
  const router = useRouter()

  const path = usePathname()
  const path_parts = path.split('/')
  const pathBoothName = path_parts[3]

  useEffect(() => {
    if (pathBoothName) {
      fetchData(pathBoothName);
    }
  }, []);

  const fetchData = async (name) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/booth/?name=${name}`);
      if (response.ok) {
        const data = await response.json();
        setBoothInfo(data);
        setBoothName(data.name)
        setBoothId(data.id)
        setBoothDescription(data['description']);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error); 
    }
  };

  const handleImageFile = (file) => {
    setSelectedImage(file);
    setFileName(file.name);
  }

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', boothName);
    formData.append('description', boothDescription);
    if (selectedImage) {
        formData.append('image', selectedImage);
    }

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/booth/${boothId}`, {
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
                  router.push(`/xpoarena/booths/${boothName}`);
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
 
  return (
    <>   
    <BoothNavBar showIcon={false} />
    <div class={` ${styles.top} grid grid-cols-[3fr_2fr] divide-x`}>
        <div className={styles.innerdiv}>
            <Image src="/reserve.jpg" layout="fill"
              objectFit="cover"/>
        </div>
        <div className={` ${styles.innerdiv} flex justify-center `}>
            <div className='flex flex-col align-center justify-center gap-10'>
                <div>
                    <p className='text-3xl font-medium'>Update your Booth</p>
                    <p className={styles.description}>Showcase your game to the world at XpoArena</p>
                </div>
                <div className='flex flex-col gap-4'>
                    <div>
                        <p className='text-xs'>Booth Name</p>
                        <input type="text" value={boothName} onChange={(e)=> setBoothName(e.target.value)} className={`${styles.inputfield} text-xs border-0 border-b border-solid border-black w-full focus:ring-0 `} />
                    </div>
                    <div>
                        <p className='text-xs'>Booth Description</p>
                        <textarea name="textarea" value={boothDescription} onChange={(e)=> setBoothDescription(e.target.value)} id="textarea" cols="10" rows="5" className={` text-xs pl-1 pr-1 pt-1 border-0 border-b border-solid border-black w-full `}></textarea>
                    </div>
                    <div className="">
                        <UploadButton onImageUpload={handleImageFile} />
                        <p className="text-xs text-red-500">{boothInfo.image}</p>
                        <p className="text-xs text-green-500">{fileName}</p>

                    </div>
                </div>
                <div>
                    <Button text="Update Booth" classname="reservebutton" onclick={handleSubmit} />
                </div>
            </div>
            

        </div>
        
    </div>
    </>
  )
}

export default page