import React, { useEffect, useState } from 'react';

const DrinkCard = ({ drink, openModal }) => {
  return (
    <div className='border rounded shadow p-4 text-center'>
      <h2 className='text-red-900 font-bold text-lg'>{drink.name}</h2>
      <img
        src={drink.image}
        alt={drink.name}
        className='w-full h-40 object-cover'
      />
      <button
        className='transition ease-in-out delay-150 mt-4 px-4 py-2 bg-red-100 text-red-900 rounded hover:bg-red-200 hover:-translate-y-1 hover:scale-110 duration-300'
        onClick={openModal}
      >
        see recipe
      </button>
    </div>
  );
};

export default DrinkCard;
