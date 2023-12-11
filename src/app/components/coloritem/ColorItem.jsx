import React from 'react'
import styles from './page.module.css'

const ColorItem = (props) => {
  return (
    <div style={{'--bg-color': props.color}} className={styles.ColorItem} onClick={props.onColorClick}>

    </div>
  )
}

export default ColorItem