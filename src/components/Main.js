import React from 'react'
import {Routes, Route, Outlet} from 'react-router-dom'
import AllPlants from '../pages/AllPlants'
import Show from '../pages/Show'



const Main = () => {
  return (
    <div>
        <Outlet />
        <Routes>
            <Route path='/' element={<AllPlants />} />
            <Route path='/:id' element={<Show />} />
        </Routes>

    </div>
  )
}

export default Main