import React from 'react'
import {useState, useEffect} from 'react'


const AllPlants = (props) => {
const [plants, setPlants]= useState([])
const URL= 'https://p3-plants.herokuapp.com/plants'

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

useEffect(()=>{getPlants()}, [])
  return (
    <div>
        <h1> All Plants: </h1>
        {plants ? plants.map((plant, idx)=>{
            return(
                <div className='oneCard'>
                     <img src={plant.image} alt={plant.name} className='homeCardImage'/>
                     <h2>{plant.name}</h2>
                </div >
            )
        }):
        <h1>Loading Plants...</h1>}
    </div>
  )
}

export default AllPlants