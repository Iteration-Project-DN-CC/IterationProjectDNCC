import React, { useEffect, useState } from 'react';
import './styles.css';

// import UserInput from './Component/UserInput';
import UserInput from './Component/UserInput.jsx'
 


const App = () => {
  return (
    <div className = "App">
      <div><img src="http://localhost:3000/Images/logo.jpg" className="logo" /></div>
      <h1 className = "header"> Start Your Cocktail Journey Below</h1>
      {/* <h2 className = "header2"> Start Your Cocktail Journey Below</h2> */}
      <UserInput/>
    </div>
  );
};

export default App;
