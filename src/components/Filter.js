import React from 'react'
import {Link} from 'react-router-dom'



const Filter = () => {
    return (
      <div className='header'>
         
         Sort By Category     
         <select>
            <option> Trees</option>
            <option> Indoor</option>
            <option> Shrubs/ Bushes</option>
            <option> Flowering Plants</option>
            <option> Cactus/ Succulent</option>
            <option> Other</option>
         </select>
      </div>
    )
  }

export default Filter