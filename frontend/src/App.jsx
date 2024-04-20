import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Signup from './pages/Signup';
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Header from './components/Header';
import Authpage from './components/Authpage.jsx';
import Profile from './pages/Profile';

const App = () => {
  return (
    <BrowserRouter>
    <Header></Header>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/sign-in' element={<Signin />}/>
        <Route path='/sign-up' element={<Signup />}/>
       
        <Route element={<Authpage/>}>
          <Route path='/profile' element={<Profile/>}></Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App