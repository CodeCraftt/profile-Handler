import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';

import { updateUserStart,updateUserFailure,updateUserSuccess, deleteUserStart, deleteUserFailure, deleteUserSuccess, signOut } from '../redux/user/userSlice';

const Profile = () => {

  const dispatch=useDispatch();
   
  const fileRef=useRef(null);
  
  const [image,setImage]=useState(undefined);
  
  const [uploadProgress,setProgress]=useState(0);

  const {currentUser,loading,error}=useSelector(state=>state.user);

  const [imageError,setImageError]=useState(false);

  const [formdata,setFormdata]=useState({});

  const [updateSuccess,setUpdateSuccess]=useState(false);


  const handleImageUpload=async(image)=>{
    const storage=getStorage(app);
    const fileName=new Date().getTime()+image.name;
    const storageRef=ref(storage,fileName);
    const uploadTask=uploadBytesResumable(storageRef,image);



    uploadTask.on(
      'state_changed',
      (snapshot)=>{
        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setProgress(Math.round(progress));
      },
    (erro)=>{
       setImageError(true);

    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref)
      .then((downloadURL)=>{
        setFormdata({...formdata,profileImage:downloadURL});
      })

    }
  );
  }

  useEffect(()=>{
    if(image){
      handleImageUpload(image);
     
    }
  },[image]);


  const handleChange=(e)=>{
     setFormdata({...formdata,[e.target.id]:e.target.value});
  }

  const handleFormSubmit=async (e)=>{
   e.preventDefault();
   try{
    dispatch(updateUserStart());
    
    const response=await fetch(`/api/user/update/${currentUser._id}`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formdata)
    })
    
    
    const result=await response.json();
    
    if(!response.ok){dispatch(updateUserFailure(result)); return ;}

    dispatch(updateUserSuccess(result));
     
    setUpdateSuccess(true);
   }
   catch(err){
    dispatch(updateUserFailure(err));
   }
  }


  const handleDeleteAccount=async()=>{
    try {
      dispatch(deleteUserStart());
      const res=await fetch(`/api/user/delete/${currentUser._id}`,
    {method:'DELETE'});
    
    const result=await res.json();
    if(!res.ok){
      dispatch(deleteUserFailure(result));
      return ;
    }
    dispatch(deleteUserSuccess(result));

    } catch (err) {
      dispatch(deleteUserFailure(err))
    }
  }

  const handleSignout=async()=>{
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut());
    } catch (error) {
      
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <div className='text-3xl font-semibold text-center my-7'>Profile</div>
   
    <form onSubmit={handleFormSubmit} className='flex flex-col gap-4 '>
   
    <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e)=>setImage(e.target.files[0])}  />

    <img src={formdata.profileImage || currentUser.profileImage} onClick={()=>fileRef.current.click()} alt="profile" className='h-24 w-24 rounded-full object-cover self-center cursor-pointer mt-2'  />
 
    <p className='text-sm self-center'>
      {imageError?<span className='text-red-700 '>Error uploading (file size must be less than 2 MB)</span>:uploadProgress>0 && uploadProgress<100?<span className='text-slate-700'>{`Uploading: ${uploadProgress} %`}</span>:uploadProgress===100? <span className='text-green-700'>Image uploaded Successfully</span>:''}
    </p> 
     
    <input type="text" defaultValue={currentUser.username} placeholder='Username' id='username' name='username' className='bg-slate-100 p-3 rounded-lg'  onChange={handleChange}/>
    <input type="email" defaultValue={currentUser.email} placeholder='Email' id='email' name='email' className='bg-slate-100 p-3 rounded-lg'  onChange={handleChange}/>
    <input type="password" placeholder='Password' id='password' name='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />

    <button disabled={loading} type='submit' className='bg-slate-700 uppercase hover:opacity-95 disabled:opacity-80 text-white mt-6 p-3 rounded-lg '>
    {loading?'Loading...':'Update'}
    </button>
    </form>
    <div className='flex justify-between items-center mt-5'>
      <span className='text-red-700 cursor-pointer' onClick={handleDeleteAccount}>Delete Account</span>
      <span className='text-red-700 cursor-pointer' onClick={handleSignout}>Sign out</span>
    </div>

     <p className='text-red-700 mt-5'>{error && "Something went wrong"}</p>
     <p className='text-green-700 mt-5'>{updateSuccess && "User updated successfully."}</p>

    </div>
  )
}

export default Profile