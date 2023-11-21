import React from 'react'
import Navbar from '../components/navbar/Navbar'

const layout = ({children}) => {
  return (
    <div>
        <Navbar />
        {children}
    </div>
  )
}

export default layout