import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
//import AllPlants from './AllPlants'


const New = () => {
const URL= 'https://p3-plants.herokuapp.com/plants'
const initForm={name: '', image:'', imageTwo:'', type:'', description:''}
const [newForm, setNewForm]= useState(initForm)
const [plants, setPlants]= useState([])
const navigate= useNavigate()
const getPlants= async ()=> {
    try{
        const response= await fetch(URL)
        const allPlants= await response.json()
        setPlants(allPlants)
        console.log(allPlants)
    }catch(err){
        console.log(err)
    }
}

const handleSubmit= async (e)=>{
   try{e.preventDefault()
    const newPlant= {...newForm}
    console.log(newPlant)
    const res= await fetch(URL, {
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPlant)
    })
    getPlants(setPlants)
    setNewForm(initForm)
    navigate('/')
}catch(err){
    console.log(err)
}
}
function handleChange(e){
    setNewForm({...newForm, [e.target.name]:e.target.value})
    console.log(newForm)
}
// const createPlant= async (plantData)=>{
//     try{
//         const newPlant= await fetch(URL, {
//             method: 'POST',
//             headers:{
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(plantData)
//         })
//         getPlants()
//     }catch(err){
//         console.log(err)
//     }
// }
  return (
    <div className='newForm'>
      <div className='titleForm'> Add a New Plant to Basic Botanist Collection</div>
      <div className='inputContainer'>
        <form onSubmit={handleSubmit} >
        <label  className='label'> Name:</label>
            <input
                className='input'
                type='text'
                value={newForm.name}
                name='name'
                placeholder='Plant Name'
                onChange={handleChange} />
            <label  className='label'> First Image:</label>
            <input
                className='input'
                type='text'
                value={newForm.image}
                name='image'
                placeholder='First Picture URL'
                onChange={handleChange} />
             <label  className='label'> Second Image:</label>
            <input
                className='input'
                type='text'
                value={newForm.imageTwo}
                name='imageTwo'
                placeholder='Second Picture URL'
                onChange={handleChange} />
            <label  className='label'> Category:</label>
            <select value={newForm.type} name='type'
            onChange={handleChange}
            className='input'>
                <option value='Tree'onChange={handleChange}> Tree</option>
                <option value='IndoorPlant'onChange={handleChange}> Indoor</option>
                <option value='Shrub/Bush'onChange={handleChange}> Shrub/Bush</option>
                <option value='FloweringPlant'onChange={handleChange}> Flower</option>
                <option value='Cactus/Succulent'onChange={handleChange}> Cactus/ Succulent</option>
                <option value='Other'> Other</option>
            </select>
            <label  className='label'> Description:</label>
            <input
                type='text'
                className='input descriptionInput'
                value={newForm.description}
                name='description'
                placeholder='Description'
                onChange={handleChange} />
             {/* <textarea  value={newForm.description} onChange={handleChange} /> */}
            <input type='submit' value='Add Plant' className='submitNew' />
        </form>

        </div>
    </div>
  )
}

export default New