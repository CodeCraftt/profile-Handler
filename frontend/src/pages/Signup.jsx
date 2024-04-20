import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import OAuth from '../components/OAuth';

const Signup = () => {

  const navigate=useNavigate();

  const [formdata,setFormdata]=useState({});
  
  const [loading ,setLoading]=useState(false);
  const [error,setError]=useState(false);


  const handleChange=(e)=>{
    setFormdata({...formdata,[e.target.id]:e.target.value});
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true)
   
    try{
      const response= await fetch('/api/auth/signup',{
        method:'POST',
        headers:{
          'Content-type':'application/json',
         
        },
        body:JSON.stringify(formdata)
      });
      const result = await response.json();
      
      setLoading(false);
      if(!response.ok)setError(true);
      navigate('/sign-in');
      
    }
    catch(err){
      setLoading(false);
     setError(true)
    }

    setTimeout(() => {
      setError(false);
    }, 3000);
    
  }

  return (
    <>
      <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign up</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input type="text" placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
          <input type="text" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
          <input type="text" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>

          <button disabled={loading}  type="submit" className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading?'Loading...':'Sign Up'}</button>
          <OAuth/>
        </form>

        <div className='flex gap-2 mt-5'>
          <p>Have an account ?</p>
         <Link to="/sign-in"> <span className='text-blue-500'>Sign in</span></Link>
        </div>

       {error &&  <p className='text-red-700 mt-5'>Something went wrong.</p>}
      </div>
    </>
  )
}

export default Signup