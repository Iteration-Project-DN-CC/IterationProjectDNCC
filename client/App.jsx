import React from 'react';
import './index.css';
import UserInput from './Component/UserInput.jsx';

const App = () => {
  return (
    <div id='app-container' className='bg-peach flex flex-col items-center'>
      <main id='main-content' className='w-full flex flex-col items-center'>
        <UserInput />
      </main>
    // </div>
  );
};

export default App;
