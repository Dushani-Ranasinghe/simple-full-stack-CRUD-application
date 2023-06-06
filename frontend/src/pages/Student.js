import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Student() {
    const [student,setStudent] = useState([]);

    // Get all data
    useEffect(() => {
        axios.get("http://localhost:8000/").then(
            (res) => {
                console.log(res);
                setStudent(res.data);
            }
        ).catch((err) => {
            console.log(err);
        });
    }, []);

    const handleDelete = async (id)=>{
        try{
            await axios.delete(`http://localhost:8000/delete/${id}`)
            window.location.reload()
        }catch(err){
            console.log(err);
        }

    }
    

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center p-5'>
        <div className='w-50 bg-white rounded p-3'>
            <Link to="/create" className='btn btn-success'> Add +</Link>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {student.map((data,i)=>(
                        <tr key={i}>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>
                                <Link to={`update/${data.idstudents}`} className='btn btn-primary mx-2'>
                                    Update
                                </Link>
                                <button className='btn btn-danger'  onClick={() => handleDelete(data.idstudents)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}
