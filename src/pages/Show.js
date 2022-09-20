import React from 'react'
import {useState, useEffect} from 'react'
import {useParams, useNavigate, Link} from 'react-router-dom'
import EditForm from './EditForm'



const Show = () => {
    const [plant, setPlant]=useState(null)
    const {id}= useParams()
    const showURL= `https://p3-plants.herokuapp.com/plants/${id}`
    const commentURL= `https://p3-plants.herokuapp.com/comments`
    const navigate= useNavigate()
    const [editForm, setEditForm]=useState(null)
    const [comments, setComments]= useState(null)
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
    const getComments= async ()=> {
        try{
            const res= await fetch(commentURL)
            const allComments= await res.json()
            setComments(allComments)
            console.log(allComments)
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
        <Link to={`/${id}/edit`} > Edit Plant Entry</Link>
        {/* {editForm? <>
            <EditForm plantData={editForm} handleChange={handleChange} updatePlant={updatePlant}/>
        </>: <h1> Loading....</h1>} */}
      
    </div>
  )
       
     
  
}

export default Show