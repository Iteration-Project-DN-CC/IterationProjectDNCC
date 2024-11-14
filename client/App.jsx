import React, { useState } from 'react';
import './index.css';
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
    // <div className='bg-red-950 App flex flex-col items-center'>
    <div id='app-container' className='bg-peach flex flex-col items-center'>
      <main id='main-content' className='w-full flex flex-col items-center'>
        {!user ? (
          !loginButton ? (
            <div className='flex flex-col stretch'>
              <button
                id='login toggle button'
                className='px-4 py-2 rounded bg-darkerpeach text-white hover:bg-darkerpeach'
                onClick={toggleLogin}
              >
                login
              </button>
              <CreateNewUser setUser={setUser} />
            </div>
          ) : (
            <div className='flex flex-col stretch'>
              <button
                id='signup toggle button'
                className='px-4 py-2 rounded bg-darkerpeach text-white hover:bg-darkerpeach'
                onClick={toggleLogin}
              >
                sign up
              </button>
              <Login setUser={setUser} />
            </div>
          )
        ) : (
          <UserInput username = {user.username}/>
        )}
      </main>
    </div>
  );
};

export default App;
