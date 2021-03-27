import React, {useState, useEffect} from 'react';
import {Link, navigate} from '@reach/router';
import axios from 'axios';

const DetailPage = (props) => {
    const {id, updated} = props;
    const [pet, setPet] = useState({});
    const [allPets, setAllPets] = useState([]);
    const [liked,setLiked]= useState(false);

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/pets/${id}`)
        .then(response =>{
            setPet(response.data.pet)
        })
        .catch((err)=>console.log("Error: ",err))
    },[]);

    useEffect(() =>{
        axios.get(`http://localhost:8000/api/pets/`)
            .then(response => {
                setAllPets(response.data.pet)
        })
        .catch((err)=>console.log("error: ",err))
    },[updated])
    
    
    const removeFromDom = petId => {
        setAllPets(allPets.filter(pet => pet._id !=petId));
    }

    const deleteHandler = (petId) =>{
        axios.delete(`http://localhost:8000/api/pets/delete/${petId}`)
        .then(response =>{
            navigate('/')
            removeFromDom(petId)
        })
        .catch(err=>console.log("error: ", err))
    }

    const likeHandler = (e) => {
        axios.put(`http://localhost:8000/api/pets/inc/${id}`)
        .then(response =>{
            if(response.data.message == "success"){
                setPet(response.data.pet)
                setLiked(true)
            }
            else if(response.data.message == "error"){
                console.log("")
            }
        })
        .catch((err)=>console.log(err))
    }

    return (
        <div>
            <Link to={'/'}>back to home</Link><br/>
            <button onClick={()=>deleteHandler(pet._id)}>Adopt {pet.name}</button>
            <h3>Details about: {pet.name}</h3>
            <h3>pet type: {pet.type}</h3>
            <h3>Description: {pet.description}</h3>
            <h3>Skills: {pet.skillOne} {pet.skillTwo} {pet.skillThree}</h3>
            {
                liked?
                <button onClick={likeHandler}>like</button>
                :
                <button onClick={likeHandler}>like</button>
            }
            <p>{pet.likes}</p>
        </div>
    )
}

export default DetailPage
