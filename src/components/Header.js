import React from 'react'
import {Link} from 'react-router-dom'




const Header = () => {
  return (
    <div className='header'>
       
        <Link to='/' className="link">
            🍃 BasicBotanist 🍃 
        </Link>
        <Link to='/new' className="footerLink">
            🍃 Add New Plant 🍃 
        </Link>
    </div>
  )
}

export default Header