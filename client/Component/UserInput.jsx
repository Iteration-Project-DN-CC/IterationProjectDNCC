import React, { useState } from 'react';
import CardContainer from './CardContainer.jsx';
import IngredientsContainer from './IngredientsContainer.jsx'; // Assuming this is your "Create" blank page component

const UserInput = () => {
  const drinks = ['gin', 'vodka', 'whiskey', 'rum', 'tequila'];
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [ingredientsDisplay, setIngredientsDisplay] = useState(false); // State for toggle

  const handleDrinkSelection = (drink) => setSelectedDrink(drink);

  const handleToggleChange = () => {
    setIngredientsDisplay((prevState) => !prevState);
  };

  return (
    <div className='w-full flex flex-col items-center'>
      {/* Toggle Switch */}
      <div className='flex items-center gap-4 my-5'>
        <span className='text-gray-700 font-medium'>Explore</span>
        <label className='relative inline-flex items-center cursor-pointer'>
          <input
            type='checkbox'
            className='sr-only peer'
            onChange={handleToggleChange}
          />
          <div
            id='toggle'
            className='w-11 h-6 bg-gray-200 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 peer-checked:bg-blue-600 transition-colors duration-300'
          >
            <div className='w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 peer-checked:translate-x-5'></div>
          </div>
        </label>
        <span className='text-gray-700 font-medium'>Create</span>
      </div>

      {/* Explore State */}
      {!ingredientsDisplay && (
        <>
          <div className='flex gap-4 justify-center my-5'>
            {drinks.map((drink) => (
              <button
                key={drink}
                className={`px-4 py-2 rounded ${
                  selectedDrink === drink
                    ? 'bg-peach text-white'
                    : 'bg-peach text-white hover:bg-darkerpeach'
                }`}
                onClick={() => handleDrinkSelection(drink)}
              >
                {drink}
              </button>
            ))}
          </div>
          {selectedDrink && <CardContainer selectedDrink={selectedDrink} />}
        </>
      )}

      {/* Create State */}
      {ingredientsDisplay && <IngredientsContainer />}
    </div>
  );
};

export default UserInput;
