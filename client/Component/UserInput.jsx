import React, { useState } from 'react';
import CardContainer from './CardContainer.jsx';

const UserInput = () => {
  const drinks = ['gin', 'vodka', 'whiskey', 'rum', 'tequila'];
  const [selectedDrink, setSelectedDrink] = useState(null);

  const handleDrinkSelection = (drink) => setSelectedDrink(drink);

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='bg-red-950 flex gap-4 justify-center my-5'>
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
    </div>
  );
};

export default UserInput;
