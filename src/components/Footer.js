import React from 'react'
import {Link} from 'react-router-dom'




const Footer = () => {
  return (
    <div className='footer'>
       
        <Link to='/new' className="footerLink">
            🍃 Add New Plant 🍃 
        </Link>
    </div>
  )
}

export default Footer