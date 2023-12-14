"use client"
import Image from 'next/image';
import React from 'react'
import styles from './page.module.css'

const UploadGame = ({onImageUpload, image, accept}) => {
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file){
            console.log('Selected file type:', file.type);
            onImageUpload(file);
        }

    };
    const title = accept === "image/*" ? "Upload Image" : "Upload Video";


  return (
    <div className={styles.maindiv}>
        <label htmlFor="upload-button">
            <Image src={image} width={20} height={20} className="cursor-pointer" title={title} />    
        </label>
        
        <input
            id="upload-button"
            type="file"
            accept={accept}
            onChange={handleImageUpload}
            style={{ display: 'none' }}
        />
    </div>
  )
}

export default UploadGame