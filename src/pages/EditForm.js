import React from 'react'
import Show from './Show'
import {useState, useEffect} from 'react'
const EditForm = ({updatePlant, handleChange, plantData}) => {
  return (
    <div>
       {/* /// <Show /> */}
        Edit This Plant: 
        <section>
             <form onSubmit={updatePlant}>
            <label> Name:</label>
            <input
            type="text"
                required
                value={plantData.name}
                name="name"
                placeholder="Plant's Name"
                onChange={handleChange}
            />
            <label> Image:</label>
            <input
            type="text"
                required
                value={plantData.image}
                name="image"
                placeholder="image"
                onChange={handleChange}
            />
            <label> Second Image:</label>
            <input
            type="text"
                required
                value={plantData.imageTwo}
                name="imageTwo"
                placeholder="Image 2"
                onChange={handleChange}
            />
            <label> Description</label>
            <input
            type="text"
                required
                value={plantData.description}
                name="description"
                placeholder="Description"
                onChange={handleChange}
            />
            {/* <textarea  value={plantData.description} onChange={handleChange} /> */}
            <label> Type:</label>
            <select value={plantData.type} name='type'
            onChange={handleChange}>
                <option value='Tree'onChange={handleChange}> Tree</option>
                <option value='Indoor Plant'onChange={handleChange}> Indoor</option>
                <option value='Shrub Bush'onChange={handleChange}> Shrub/Bush</option>
                <option value='Flowering Plant'onChange={handleChange}> Flower</option>
                <option value='Cactus/Succulent'onChange={handleChange}> Cactus/ Succulent</option>
                <option value='Other'> Other</option>
            </select>
            <input type="Submit" />
        </form>

        </section>
    </div>
  )
}

export default EditForm