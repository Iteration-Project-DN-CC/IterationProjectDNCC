import React, { useEffect, useState } from 'react';

const IngredientsContainer = () => {
  // add state here to update with user's ingredients inputs

  // need to somehow query the backend based on the user's text input...
  // backend will filter thru ingredients list and return the matching ones live
  // can probably use the same controller to populate the potential recipes.........

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
  };
  return (
    <form
      id='ingredients'
      className='ingredientsBox'
      autoComplete='off'
      onSubmit={handleSubmit}
    >
      <div className='ingredientsInput' style={{ width: '300px' }}>
        <input
          id='myInput'
          type='text'
          name='ingredient'
          placeholder='Enter an ingredient'
          autoComplete='off'
        />
      </div>
      <input type='submit' value='Submit' className='submitButton' />
    </form>
  );
};
export default IngredientsContainer;
