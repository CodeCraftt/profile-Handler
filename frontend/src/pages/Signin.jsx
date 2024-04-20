import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import { signInFailure,signInstart ,signInsuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const Signin = () => {

  const [formdata,setFormdata]=useState({});
  
  const {loading,error}=useSelector((state)=>state.user);


  const navigate=useNavigate();
  const dispatch=useDispatch();
  

  const handleChange=(e)=>{
    setFormdata({...formdata,[e.target.id]:e.target.value});
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    dispatch(signInstart());
   
    try{
      const response= await fetch('/api/auth/signin',{
        method:'POST',
        headers:{
          'Content-type':'application/json',
        },
        body:JSON.stringify(formdata)
      });
      const result = await response.json();
      
      
      if(!response.ok){ dispatch(signInFailure(result));return ;}
      
      dispatch(signInsuccess(result));
      navigate('/');
    }
    catch(err){
     signInFailure(signInFailure(error));
    }
  }

  return (
    <>
      <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input type="text" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
          <input type="text" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>

          <button disabled={loading}  type="submit" className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading?'Loading...':'Sign In'}</button>

          <OAuth />
        </form>

        <div className='flex gap-2 mt-5'>
          <p>Don't have an account ?</p>
         <Link to="/sign-up"> <span className='text-blue-500'>Sign up</span></Link>
        </div>
       <p className='text-red-700 mt-5'>{error? error.message||"Something went wrong.":""}</p>
      </div>
    </>
  )
}

export default Signin