import React, { useEffect, useState } from 'react';
import './styles.css';

// import UserInput from './Component/UserInput';
import UserInput from './Component/UserInput.jsx'
 


const App = () => {
  return (
    <div className = "App">
      <div><img src="http://localhost:3000/Images/logo.jpg" className="logo" /></div>
      <div className = "header"> Welcome to the Cocktail Compass ! break</div>
      <UserInput/>
    </div>
  );
};

export default App;
