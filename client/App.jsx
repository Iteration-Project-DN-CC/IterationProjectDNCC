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
            <div>
              <button onClick={toggleLogin}>Login</button>
              <CreateNewUser setUser={setUser} />
            </div>
          ) : (
            <div>
              <button onClick={toggleLogin}>Sign up</button>
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
