import { Link } from '@reach/router';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const MainPage = (props) => {
    const {updated} = props;
    const [allPets, setAllPets] = useState([]);

    useEffect(() =>{
        axios.get(`http://localhost:8000/api/pets/`)
            .then(response => {
                setAllPets(response.data.pet)
        })
        .catch((err)=>console.log("error: ",err))
    },[updated])

    return (
        <div>
            <h3>These pets are looking for a good home</h3>
            <Link to={`/pets/new`}>add a pet to the shelter</Link>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allPets.map((pet, i)=>{
                            return(
                                <tr>
                                    <td key={i}>{pet.name}</td>
                                    <td key={i}>{pet.type}</td>
                                    <td>
                                        {/* <button onClick={()=> navigate(`/edit/${pet._id}`)}>Edit</button> <button onClick={()=>deleteHandler(author._id)}>Delete</button> */}
                                        <Link to={`/pets/${pet._id}`}>details</Link>    |   <Link to={`/pets/${pet._id}/edit`}>edit</Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MainPage