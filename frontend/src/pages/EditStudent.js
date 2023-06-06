import axios from 'axios';
import React,{useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function EditStudent() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const studentId = id;
        axios.get(`http://localhost:8000/getStudentsById/${studentId}`).then((res) => {
          console.log(res);
          console.log(res.data[0].name);
          console.log(res.data[0].email);
          setName(res.data[0].name)
          setEmail(res.data[0].email)
        }).catch((err) => {
          console.log(err);
        });
      }, [id]);

    const handleSubmit =(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8000/update/${id}`, {name,email}).then(
            (res)=>{
                console.log(res);
                navigate("/");
            }
        ).catch(
            (err)=>{
                console.log(err);
            }
        )
    }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='w-50 bg-white rounded p-3'>
       <form onSubmit={handleSubmit}>
        <h2>EditStudent Student</h2>
        <div className='mb-2' >
            <label htmlFor=''>Name</label>
            <input type='text' className='form-control' value={name}
                onChange={(e)=>{
                    setName(e.target.value);
                }}
            />
        </div>
        <div className='mb-2'>
            <label htmlFor=''>Email</label>
            <input type='email' className='form-control' value={email}
                onChange={(e)=>{
                    setEmail(e.target.value);
                }}
            />
        </div>
        <button className='btn btn-success'> Submit</button>
       </form>
    </div>
</div>
  )
}
