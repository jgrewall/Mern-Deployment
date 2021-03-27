import React, {useState,useEffect}from 'react';
import {Link, navigate} from '@reach/router';
import axios from 'axios';

const EditPage = (props) => {
    const {id, setUpdated} = props;
    const [errors, setErrors] = useState({
        name:"",
        type:"",
        description:"",
        skillOne:"",
        skillTwo:"",
        skillThree:""
    });
    const [pet, setPet] = useState({});

    useEffect(()=>{         
            axios.get(`http://localhost:8000/api/pets/${id}`)
            .then(response =>{
                setPet(response.data.pet)
            })
            .catch((err)=>console.log("Error: ",err))
    },[]);

    const submitHandler = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/pets/update/${id}`, pet)
        .then(response =>{
            console.log(response.data)
            if(response.data.message == "success"){
                console.log(response.data)
                setUpdated(true)
                navigate(`/`)
            }
            else if(response.data.message == "error"){
                setErrors(response.data.error.errors)
                console.log(errors)
            }
        })
        .catch((err)=>console.log(err))
    }

    return (
        <div>
            <Link to={'/'}>back to home</Link>
            <h3>Edit: {pet.name}</h3>
            <form onSubmit={submitHandler}>
                <label htmlFor="">Pet Name:</label>
                <input type="text" value={pet.name} onChange={e=>setPet({...pet,"name":e.target.value})}/>
                <label htmlFor="">Pet Type:</label>
                <input type="text" value={pet.type} onChange={e=>setPet({...pet,"type":e.target.value})}/>
                <label htmlFor="">Pet Description:</label>
                <input type="text" value={pet.description} onChange={e=>setPet({...pet,"description":e.target.value})}/>
                <p>skills (optional)</p>
                <label htmlFor="">skill 1:</label>
                <input type="text" value={pet.skillOne} onChange={e=>setPet({...pet,"skillOne":e.target.value})}/>
                <label htmlFor="">skill 2:</label>
                <input type="text" value={pet.skillTwo} onChange={e=>setPet({...pet,"skillTwo":e.target.value})}/>
                <label htmlFor="">skill 3:</label>
                <input type="text" value={pet.skillThree} onChange={e=>setPet({...pet,"skillThree":e.target.value})}/>
                <button type="submit">Edit Pet</button>
            </form>
            <p>{
                errors.name?
                errors.name.message
                :
                ""
                }
            </p>
            <p>{
                errors.type?
                errors.type.message
                :
                ""
                }
            </p>
            <p>{
                errors.description?
                errors.description.message
                :
                ""
                }
            </p>
            <p>{
                errors.skillOne?
                errors.skillOne.message
                :
                ""
                }
            </p>
            <p>{
                errors.skillTwo?
                errors.skillTwo.message
                :
                ""
                }
            </p>
            <p>{
                errors.skillThree?
                errors.skillThree.message
                :
                ""
                }
            </p>
        </div>
    )
}

export default EditPage
