import React, { useState } from 'react';
import CardContainer from './CardContainer.jsx';
import IngredientsContainer from './IngredientsContainer.jsx';
import logo from '../cocktailcompass.png';

const UserInput = () => {
  const drinks = ['gin', 'vodka', 'whiskey', 'rum', 'tequila'];
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [ingredientsDisplay, setIngredientsDisplay] = useState(false);

  const handleDrinkSelection = (drink) => setSelectedDrink(drink);
  const handleToggleChange = () =>
    setIngredientsDisplay((prevState) => !prevState);

  return (
    <div id='user-input-container' className='w-full'>
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
            <span className='text-white font-medium'>Explore</span>
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
            <span className='text-white font-medium'>Create</span>
          </div>
        </div>

        {/* Bottom Row: Drink Buttons */}
        <div
          id='drink-buttons-container'
          className='flex gap-4 justify-end mt-4 min-h-[50px]'
        >
          {!ingredientsDisplay &&
            drinks.map((drink) => (
              <button
                key={drink}
                className={`px-4 py-2 rounded ${
                  selectedDrink === drink
                    ? 'bg-darkerpeach text-white'
                    : 'bg-peach text-white hover:bg-darkerpeach active:bg-darkerpeach  focus:ring focus:ring-red-900'
                }`}
                onClick={() => handleDrinkSelection(drink)}
              >
                {drink}
              </button>
            ))}
        </div>
      </header>

      {/* Main Content */}
      <main
        id='main-content'
        className='w-full flex flex-col items-center py-6'
      >
        {!ingredientsDisplay ? (
          <div id='explore-state'>
            {selectedDrink && (
              <div className='my-5'>
                <CardContainer selectedDrink={selectedDrink} />
              </div>
            )}
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
