import React from 'react';
import Profile from '../../components/Profile';

const Home = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-zinc-300">
        <Profile  isUser={true}/>
      </div>
    </>
  )
}

export default Home
