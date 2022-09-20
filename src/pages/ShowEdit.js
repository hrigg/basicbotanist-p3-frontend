import React from 'react'
import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import EditForm from './EditForm'



const ShowEdit = () => {
    const [plant, setPlant]=useState(null)
    const {id}= useParams()
    const showURL= `https://p3-plants.herokuapp.com/plants/${id}`
    const navigate= useNavigate()
    const [editForm, setEditForm]=useState(null)

    const getPlant= async ()=>{
        try{
            const response= await fetch(showURL)
            const result= await response.json()
            setPlant(result)
            setEditForm(result)
        }catch(err){
            console.log(err)
        }
    }

    const loaded= () =>(
        <div className='showResult'>
            <h1>Current Plant:</h1>
            <h2> {plant.name}</h2>
            <img src={plant.image} className="showImage showImageOne"/>
            <img src={plant.imageTwo} className="showImage showImagetwo"/>
            <h3> {plant.type}</h3>
            <p> {plant.description}</p>
        </div>
    )
    const loading =() =>{
        <h1>Loading.....</h1>
    }
    const updatePlant = async (e) => {
        e.preventDefault()
        // console.log(editForm)
        try {
            const options = {
                method: "PUT",
                headers: { "Content-Type": "application/json",
                 },
                body: JSON.stringify(editForm)
            }
            const response = await fetch(showURL, options)
            const updatedPlant = await response.json()

            setPlant(updatedPlant)
            console.log(updatedPlant)
            setEditForm(updatedPlant)

        } catch (err) {
            console.log(err)
            navigate(showURL)
        }
    }

    
    const handleChange=(e)=>{
        setEditForm({...editForm, [e.target.name]: e.target.value})
        console.log(editForm)
    }
    // const handleSubmit= async (e)=> {
    //     try{ e.preventDefault()
    //     //  const updatedPlant={...editForm}
    //     //  const options={
    //     //    method:'PUT',
    //     //    headers:{
    //     //     "Content-Type": "application/json"
    //     // },
    //     //    body: JSON.stringify(updatedPlant)
    //     //    }
    //     //    const response= await fetch(showURL, options)
    //     //    console.log('fetch repsonse', response)
    //     //    console.log(updatedPlant)
       
    //     //    //getWizards(setWizards)
    //     //    setEditForm(updatedPlant)
    //        }catch(err){
    //         console.log(err)
    //     }
    //    }
    const removePlant = async ()=>{
        try{
            const options={method: "DELETE"}
            const response= await fetch(showURL, options)
            const deletedPlant= await response.json()
            navigate('/')

        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getPlant()
    },[])

  return(
    <div>
        {  plant ? loaded() : loading()}
        <button className='deleteButton' onClick={removePlant}>
            Remove Plant
        </button>
        {editForm? <>
            <EditForm plantData={editForm} handleChange={handleChange} updatePlant={updatePlant}/>
        </>: <h1> Loading....</h1>}
      
    </div>
  )
       
     
  
}

export default ShowEdit