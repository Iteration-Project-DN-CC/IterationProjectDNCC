import React, { useState } from 'react';
import CardContainer from './CardContainer.jsx';
import IngredientsContainer from './IngredientsContainer.jsx';
import ExploreOptions from './ExploreOptions.jsx';

import logo from '../cocktailcompass.png';

const UserInput = () => {
  const [selectedOption, setSelectedOption] = useState(null); // Tracks user selection // julie
  const [mode, setMode] = useState(null); // Tracks whether "By Liquor" or "By Type"
  const [ingredientsDisplay, setIngredientsDisplay] = useState(false);

  const handleToggleChange = () => {
    setIngredientsDisplay((prevState) => !prevState);
    setSelectedOption(null); // Reset selection when toggling modes
    setMode(null); // Reset mode
  };

  const handleQuery = (option, queryMode) => {
    console.log(`Querying for ${queryMode}: ${option}`); // Debug log
    setSelectedOption(option);
    setMode(queryMode); // Save the mode ("liquor" or "type")
  };

  return (
    <div id='user-input-container' className='w-full'>
      {console.log({ selectedOption })}
      {/* Header Section with Logo, Toggle, and Buttons */}
      <header
        id='header'
        className='w-full bg-peach py-4 px-6 flex flex-col gap-4'
      >
        {/* Top Row: Logo and Toggle */}
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <img
            id='logo'
            src={logo}
            alt='Cocktail Compass Logo'
            className='h-52 w-auto'
          />

          {/* Toggle Switch */}
          <div id='toggle-container' className='flex items-center gap-2'>
            <span className='text-white font-medium'>explore</span>
            <label
              id='toggle-switch'
              className='relative inline-flex items-center cursor-pointer'
            >
              <input
                type='checkbox'
                className='sr-only peer'
                onChange={handleToggleChange}
              />
              <div
                id='toggle-oval'
                className='w-12 h-6 bg-red-100 rounded-full relative'
              ></div>
              <div
                id='toggle-circle'
                className='absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 peer-checked:left-6'
              ></div>
            </label>
            <span className='text-white font-medium'>create</span>
          </div>
        </div>

        {/* Bottom Row: Drink Buttons */}
        <div
          id='drink-buttons-container'
          className='flex gap-4 justify-end mt-4 min-h-[50px]'
        ></div>
      </header>

      {/* Main Content */}
      <main
        id='main-content'
        className='w-full flex flex-col items-center py-6'
      >
        {!ingredientsDisplay ? (
          <div id='explore-state'>
            {/* {selectedOption} */}
            <div>
              <ExploreOptions onQuery={handleQuery} />
              <div className='my-5'>
                <CardContainer selectedDrink={selectedOption} />
              </div>
            </div>
          </div>
        ) : (
          <div id='create-state'>
            <IngredientsContainer />
          </div>
        )}
      </main>
    </div>
  );
};

export default UserInput;
