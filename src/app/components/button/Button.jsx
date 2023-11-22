'use client'
import React from 'react'
import styles from './page.module.css'

const Button = (props) => {
  return (
    <div>
        <button className={styles[props.classname]} onClick={props.onclick}>{props.text}</button>
    </div>
  )
}

export default Button