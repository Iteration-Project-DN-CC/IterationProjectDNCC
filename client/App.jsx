import React, { useState } from 'react';
import './index.css';
import logo from './cocktailcompass2.png';
import UserInput from './Component/UserInput.jsx';
import Login from './Component/Login.jsx';
import CreateNewUser from './Component/CreateNewUser.jsx';

const App = () => {
  let [user, setUser] = useState(null);
  let [loginButton, setLoginButton] = useState(false);
  const toggleLogin = () => {
    setLoginButton(!loginButton);
  };
  return (
    <div className='bg-red-950 App flex flex-col items-center'>
      <header className='w-full bg-peach py-4'>
        <img
          src={logo}
          className='w-auto h-40 block ml-4'
          alt='Cocktail Compass Logo'
        />
      </header>
      <main className='bg-red-950 w-full flex flex-col items-center'>
        <h1 className='bg-red-950 text-white header text-center text-2xl font-bold mt-4'>
          Start Your Cocktail Journey Below
        </h1>
        {!user && !loginButton ? (
          <button onClick={toggleLogin}>Login</button>
        ) : (
          <button onClick={toggleLogin}>Sign up</button>
        )}
        {loginButton && !user && <Login setUser={setUser} />}
        {!loginButton && !user && <CreateNewUser setUser={setUser} />}
        {user && <UserInput />}
      </main>
    </div>
  );
};

export default App;
