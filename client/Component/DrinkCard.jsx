import React, { useEffect, useState } from 'react';

const DrinkCard = ({ drink, openModal }) => {
  return (
    <div className='border rounded shadow p-4 text-center'>
      <h2 className='text-white font-bold text-lg'>{drink.name}</h2>
      <img
        src={drink.image}
        alt={drink.name}
        className='w-full h-40 object-cover'
      />
      <button
        className='mt-4 px-4 py-2 bg-peach text-white rounded hover:bg-darkerpeach'
        onClick={openModal}
      >
        See Recipe
      </button>
    </div>
  );
};

export default DrinkCard;
