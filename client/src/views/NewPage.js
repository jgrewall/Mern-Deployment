import React, {useState, useEffect} from 'react';
import {Link, navigate} from '@reach/router';
import axios from 'axios';

const NewPage = () => {
    const [pet, setPet] = useState({
        name:"",
        type:"",
        description:"",
        skillOne:"",
        skillTwo:"",
        skillThree:""
    });
    const [errors,setErrors] = useState("");
    const [allPets, setAllPets] = useState([]);

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/pets/new`, pet)
        .then(response =>{
            if(response.data.message == "success"){
                setAllPets([...allPets, response.data.pet])
                setErrors("")
                navigate(`/`)
            }
            else if(response.data.message == "error"){
                console.log(response.data.error.errors)
                setErrors(response.data.error.errors)
                //console.log(errors)
            }
        })
        .catch((err)=>console.log(err))
    };

    return (
        <div>
            <Link to={'/'}>back to home</Link>
            <h3>Know a pet needing a home?</h3>
            <form onSubmit={submitHandler}>
                <label htmlFor="">Pet Name:</label>
                <input type="text" onChange={e=>setPet({...pet,"name":e.target.value})}/>
                <label htmlFor="">Pet Type:</label>
                <input type="text" onChange={e=>setPet({...pet,"type":e.target.value})}/>
                <label htmlFor="">Pet Description:</label>
                <input type="text" onChange={e=>setPet({...pet,"description":e.target.value})}/>
                <p>skills (optional)</p>
                <label htmlFor="">skill 1:</label>
                <input type="text" onChange={e=>setPet({...pet,"skillOne":e.target.value})}/>
                <label htmlFor="">skill 2:</label>
                <input type="text" onChange={e=>setPet({...pet,"skillTwo":e.target.value})}/>
                <label htmlFor="">skill 3:</label>
                <input type="text" onChange={e=>setPet({...pet,"skillThree":e.target.value})}/>
                <button type="submit">Add Pet</button>
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

export default NewPage
