import React from 'react'
import {Routes, Route, Outlet} from 'react-router-dom'
import AllPlants from '../pages/AllPlants'
import Show from '../pages/Show'
import New from '../pages/New'
import ShowEdit from '../pages/ShowEdit'
const Main = () => {
  return (
    <div>
        <Outlet />
        <Routes>
            <Route path='/' element={<AllPlants />} />
            <Route path='/:id' element={<Show />} />
            <Route path='/:id/edit' element={<ShowEdit />} />
            <Route path='/new' element={<New />} />
        </Routes>

    </div>
  )
}

export default Main