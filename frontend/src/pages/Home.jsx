import React, { useEffect, useState } from 'react';
import myfacts from 'myfacts';


const Home = () => {
  const [randomFact, setRandomFact] = useState({});

  useEffect(() => {
  
    const sof=myfacts('Software',Math.floor(Math.random()*15)).fact;
    const gf=myfacts('Google',Math.floor(Math.random()*7)).fact;
    const open=myfacts('OpenAI',Math.floor(Math.random()*5)).fact;
    setRandomFact({"sof":sof,"gf":gf,"open":open});
    
  }, []);
   
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-slate-800'>Welcome to Fact Nest</h1>
      <h2 className='mt-7 text-slate-500 font-bold'>Software fact</h2>
      <p className='mt-3 text-slate-700'>{randomFact.sof}</p>

      <h2 className='mt-7 text-slate-500 font-bold'>Google fact</h2>
      <p className='mt-3 text-slate-700'>{randomFact.gf}</p>

      <h2 className='mt-7 text-slate-500 font-bold'>Open AI fact</h2>
      <p className='mt-3 text-slate-700'>{randomFact.open}</p>

      
    </div>
  );
};

export default Home;
