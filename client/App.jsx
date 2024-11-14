// import React from 'react';
// import './index.css';
// import logo from './cocktailcompass.png';
// import UserInput from './Component/UserInput.jsx';

// const App = () => {
//   return (
//     <div className='bg-red-950 App flex flex-col items-center'>
//       <header className='w-full bg-peach py-4'>
//         <img
//           src={logo}
//           className='w-auto h-64 block ml-4'
//           alt='Cocktail Compass Logo'
//         />
//       </header>
//       <main className='bg-red-950 w-full flex flex-col items-center'>
//         <h1 className='bg-red-950 text-white header text-center text-2xl font-bold mt-4'>
//           Start Your Cocktail Journey
//         </h1>
//         <UserInput />
//       </main>
//     </div>
//   );
// };

// export default App;

import React from 'react';
import './index.css';
import UserInput from './Component/UserInput.jsx';

const App = () => {
  return (
    <div id='app-container' className='bg-peach flex flex-col items-center'>
      <main id='main-content' className='w-full flex flex-col items-center'>
        <UserInput />
      </main>
    </div>
  );
};

export default App;
