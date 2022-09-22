import React from 'react'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Footer from '../components/Footer'
import Filter from '../components/Filter'

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
    <div className='allBody'>
      
       <div className="allPlantsHeader">
           
            <h1>  🍃 BasicBotanist 🍃 <br/>All Plants: </h1>
            <Filter />
        </div> 
    <div className='allCards'>
        {plants ? plants.map((plant, idx)=>{
           
            return(
                <div className='oneCard'>
                    <Link to={`/${plant._id}`} className="link">
                        <div>
                     <img  key={idx} src={plant.image} alt={plant.name} className='homeCardImage'/>
                     <h2>{plant.name}</h2>
                        </div>
                     </Link>
                </div >
            )
        }):
        <h1>Loading Plants...</h1>}
    </div>
        <Footer />
        {/* <Link to='/new'> Here</Link> */}
        {/* <New getPlants={getPlants} setPlants={setPlants}/> */}
    </div>
  )
}

export default AllPlants