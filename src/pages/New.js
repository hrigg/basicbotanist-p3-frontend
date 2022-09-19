import React from 'react'
import {useState, useEffect} from 'react'
import AllPlants from './AllPlants'


const New = () => {
const URL= 'https://p3-plants.herokuapp.com/plants'
const initForm={name: '', image:'', imageTwo:'', type:'', description:''}
const [newForm, setNewForm]= useState(initForm)
const [plants, setPlants]= useState([])
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
    <div>
        New Plant form 
        <form onSubmit={handleSubmit} >
            <input
                type='text'
                value={newForm.name}
                name='name'
                placeholder='Plant Name'
                onChange={handleChange} />
            <input
                type='text'
                value={newForm.image}
                name='image'
                placeholder='First Picture'
                onChange={handleChange} />
            <input
                type='text'
                value={newForm.imageTwo}
                name='imageTwo'
                placeholder='Second Picture'
                onChange={handleChange} />
            <input
                type='text'
                value={newForm.type}
                name='type'
                placeholder='Type'
                onChange={handleChange} />
            <input
                type='text'
                value={newForm.description}
                name='description'
                placeholder='Description'
                onChange={handleChange} />
            
            <input type='submit' value='Add Plant' />
        </form>


    </div>
  )
}

export default New