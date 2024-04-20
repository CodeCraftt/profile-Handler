import React from 'react';

import {GoogleAuthProvider, signInWithPopup,getAuth} from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInsuccess } from '../redux/user/userSlice';
import {useNavigate} from 'react-router-dom';


const OAuth = () => {
    
    const navigate= useNavigate();
    const dispatch=useDispatch();

    const handleClick=async ()=>{
     try {
        const provider=new GoogleAuthProvider();
        const auth=getAuth(app); 
        const result =await signInWithPopup(auth,provider);

        const res=await fetch('/api/auth/google',{
            method:'POST',
            headers:{
                'Content-type':'application/json',
            },
            body:JSON.stringify({
                username:result.user.displayName,
                email:result.user.email,
                profileImage:result.user.photoURL,
            })
        })

        const data=await res.json();

        dispatch(signInsuccess(data));

        
        navigate('/');
     } catch (error) {
        console.log('could not login with google',error);
     }
    }

  return (
    <button type='button' onClick={handleClick} className='bg-red-700 rounded-lg uppercase hover:opacity-95 p-3 text-white'>Continue with google</button>
  )
}

export default OAuth