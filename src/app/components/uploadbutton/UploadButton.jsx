"use client"
import Image from 'next/image';
import React from 'react'
import styles from './page.module.css'

const UploadButton = (props) => {
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file){
            props.onImageUpload(file);
        }

      };
  return (
    <div>
       <label htmlFor="upload-button" className="upload-button">
            <div className={` ${styles.maindiv} flex gap-3 border border-black p-3 w-1/2 justify-center items-center`}>
                <Image src="/gallery.png" width={15} height={15}/>
                <p className="text-xs">Upload Image</p>
            </div>
        </label>
            
        <input
        id="upload-button"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
        />
  </div>
  )
}

export default UploadButton