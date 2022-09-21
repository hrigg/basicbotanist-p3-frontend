import React from 'react'
import {useState, useEffect} from 'react'
import {useParams, useNavigate, Link} from 'react-router-dom'


 const Comment = ( navigate) => {
    const initComment={title:'', comment:''}
    const {id}= useParams()
    //const [editForm, setEditForm]=useState(null)
    const [comments, setComments]= useState([])
    const [commentForm, setCommentForm] = useState(initComment)
    const commentURL= `https://p3-plants.herokuapp.com/comments`
    const commentDeleteURL= `https://p3-plants.herokuapp.com/comments/`
    const handleSubmit= async (e)=>{
        try{e.preventDefault()
         const newComment= {...commentForm}
         //console.log(newComment)
         const res= await fetch(commentURL, {
             method: 'POST',
             headers:{
                 "Content-Type": "application/json"
             },
             body: JSON.stringify(newComment)
         })
         getComments(setComments)
         setCommentForm(initComment)
         //navigate('/')
     }catch(err){
         console.log(err)
     }
     }
    
    const handleChange=(e)=>{
        setCommentForm({...commentForm, [e.target.name]: e.target.value})
       
    }
    const handleChangeId=(e)=>{
        setCommentForm({...commentForm, [e.target.name]:id})
       console.log('id', {id})
    }
    const getComments= async ()=> {
        try{
            const res= await fetch(commentURL)
            const allComments= await res.json()
            setComments(allComments)
            //console.log(allComments)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
    
        getComments()
    },[])
  return (

<>
    <div className='commentForm'>
        <p> Add a Comment or Question</p>
    <form onSubmit={handleSubmit} >
     
        <textarea className='commentFormComment input'
                value={commentForm.comment}
                name='comment'
                placeholder='Comment'
                onChange={handleChange} />
        <input className='comFormId input'
            value={commentForm.plants}
            name='plants'
            placeholder='Plant ID(auto-populates)'
            onChange={handleChangeId}
            />
        <input type='submit' value='Comment' />

    </form>
  </div>
    <div className='commentSection'>
    {comments ? comments.map((comment, idx)=>{
        // console.log(id, 'id')
        // console.log(comment.plants, 'id')
        if (id===comment.plants){
        return(
            <div className='oneComment'>
             
              <div className='commentcomment'>{comment.comment}</div> 
              <button className='deleteCommentButton' onClick={ async ()=>{     try{
        const options={method: "DELETE"}
        const res= await fetch(`${commentDeleteURL}/${comment._id}`, options)
        const deletedComment= await res.json()
        navigate(`/${id}`)

    }catch(err){
        console.log(err)
    }

}}>
        Remove Comment
    </button>
            </div >
        )}
        else{<div> loading</div>}
    }):
    <h1>Loading Plants...</h1>}
    </div>
    </>
  ) }
export default Comment