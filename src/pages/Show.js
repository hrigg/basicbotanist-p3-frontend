import React from 'react'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'



const Show = () => {
    const [plant, setPlant]=useState(null)
    const {id}= useParams()
    const showURL= `https://p3-plants.herokuapp.com/plants/${id}`


    const getPlant= async ()=>{
        try{
            const response= await fetch(showURL)
            const result= await response.json()
            setPlant(result)
        }catch(err){
            console.log(err)
        }
    }

    const loaded= () =>(
        <div className='showResult'>
            <h1>Current Plant:</h1>
            <h2> {plant.name}</h2>
            <img src={plant.image} />
        </div>
    )
    const loading =() =>{
        <h1>Loading.....</h1>
    }
    useEffect(()=>{
        getPlant()
    },[])

  return(
    <div>
        {  plant ? loaded() : loading()}
    </div>
  )
       
     
  
}

export default Show