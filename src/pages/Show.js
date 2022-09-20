import React from 'react'
import {useState, useEffect} from 'react'
import {useParams, useNavigate, Link} from 'react-router-dom'
import EditForm from './EditForm'



const Show = () => {
    const [plant, setPlant]=useState(null)
    const {id}= useParams()
    console.log(id)
    const showURL= `https://p3-plants.herokuapp.com/plants/${id}`
    const commentURL= `https://p3-plants.herokuapp.com/comments`
    const commentDeleteURL= `https://p3-plants.herokuapp.com/comments/${id}`

    const navigate= useNavigate()
    const initComment={title:'', comment:''}
    //const [editForm, setEditForm]=useState(null)
    const [comments, setComments]= useState([])
    const [commentForm, setCommentForm] = useState(initComment)
    const getPlant= async ()=>{
        try{
            const response= await fetch(showURL)
            const result= await response.json()
            setPlant(result)
            //setEditForm(result)
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
            <h3> Type: {plant.type}</h3>
            <p> About: {plant.description}</p>
        </div>
    )
    const loading =() =>{
        <h1>Loading.....</h1>
    }
    const handleSubmit= async (e)=>{
        try{e.preventDefault()
         const newComment= {...commentForm}
         console.log(newComment)
         const res= await fetch(commentURL, {
             method: 'POST',
             headers:{
                 "Content-Type": "application/json"
             },
             body: JSON.stringify(newComment)
         })
         getComments(setComments)
         setCommentForm(initComment)
         navigate('/')
     }catch(err){
         console.log(err)
     }
     }
    
    const handleChange=(e)=>{
        setCommentForm({...commentForm, [e.target.name]: e.target.value})
       
    }
    const handleChangeId=(e)=>{
        setCommentForm({...commentForm, [e.target.name]:id})
       
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
    const removeComment = async ()=>{
        try{
            const options={method: "DELETE"}
            const res= await fetch(commentDeleteURL, options)
            const deletedComment= await res.json()
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
        getComments()
    },[])

  return(
    <div>
        {  plant ? loaded() : loading()}
        <button className='deleteButton' onClick={removePlant}>
            Remove Plant
        </button>
        <Link to={`/${id}/edit`} > Edit Plant Entry</Link>
      
      <div className='commentForm'>
        <form onSubmit={handleSubmit} >
           <label> Title:</label>
            <input
                    type='text'
                    value={commentForm.title}
                    name='title'
                    placeholder='Comment Title'
                    onChange={handleChange} />
            <textarea
                    value={commentForm.comment}
                    name='comment'
                    placeholder='Comment'
                    onChange={handleChange} />
            <input 
                value={commentForm.plants}
                name='plants'
                onChange={handleChangeId}
                />
            <input type='submit' value='Comment' />

        </form>
      </div>
        <div className='commentSection'>
        <h1> {comments ? comments.map((comment, idx)=>{
         
            if (id===comment.plants){
            return(
                <div className='oneCard'>
                  <div className='commentTitle'>{comment.title}</div> 
                  <div className='commentcomment'>{comment.comment}</div> 
                  <button className='deleteButton' onClick={removeComment}>
            Remove Comment
        </button>
                </div >
            )}
            else{<div> loading</div>}
        }):
        <h1>Loading Plants...</h1>}
        </h1>
        </div>
    </div>
  )
       
     
  
}

export default Show