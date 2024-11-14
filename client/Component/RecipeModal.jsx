import React from 'react';
import Popup from 'reactjs-popup';

const RecipeModal = ({ data, closeModal }) => {
  if (!data || !data.ingredients) return null;

  return (
    <Popup open={true} onClose={closeModal} modal nested>
      <div className='modal bg-background rounded p-6'>
        <img
          src={data.image}
          alt={data.name}
          className='w-40 h-40 object-cover mx-auto'
        />
        <h2 className='text-2xl font-bold text-center'>{data.name}</h2>
        <p className='mt-2 text-center'>{data.description}</p>
        <div>
          <h3 className='text-lg font-bold mt-4'>Ingredients:</h3>
          <p>{data.ingredients.join(', ')}</p>
        </div>
        <div>
          <h3 className='text-lg font-bold mt-4'>Instructions:</h3>
          <p>{data.instruction}</p>
        </div>
        <button
          className='mt-4 px-4 py-2 bg-lightpeach text-white rounded hover:bg-peach'
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </Popup>
  );
};

export default RecipeModal;
