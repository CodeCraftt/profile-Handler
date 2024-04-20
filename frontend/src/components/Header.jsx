import React from 'react'
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

const Header = () => {

  const {currentUser}= useSelector(state=>state.user);


  return (
    <div className='bg-slate-200 ' >
      <div className='flex max-w-6xl mx-auto justify-between p-3 items-center'>
      <Link to='/'><h1 className='font-bold' >AUTH.</h1> </Link> 
    
    <ul className='flex gap-4 '>
      <Link to="/" > <li>Home</li></Link>
      <Link to="/about"><li>About</li></Link>
     {currentUser &&  <Link to="/profile"><li>Profile</li></Link>}


      {currentUser ?<img className='h-7 w-7 rounded-full object-cover' src={currentUser.profileImage} alt='profile'></img> :<Link to='/sign-in'> Sign in</Link> }
    </ul>
      </div>
    </div>
  )
}

export default Header