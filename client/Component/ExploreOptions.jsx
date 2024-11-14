import React, { useState } from 'react';

const ExploreOptions = ({ onQuery }) => {
  const [mode, setMode] = useState(null); // Tracks whether "By Liquor" or "By Type" is selected

  const liquors = ['gin', 'vodka', 'whiskey', 'rum', 'tequila'];
  const types = [
    'sour',
    'highball',
    'spirit forward',
    'fizz',
    'martini',
    'tropical',
  ];

  const handleModeSelection = (selection) => {
    setMode(selection); // Set mode to "liquor" or "type"
  };

  const handleOptionClick = (option) => {
    onQuery(option.toLowerCase(), mode); // Pass option and mode to the parent
  };

  return (
    <div className='w-full flex flex-col items-center gap-4'>
      {!mode && (
        <div className='flex gap-4 my-5'>
          <button
            className='px-4 py-2 rounded bg-peach text-white hover:bg-darkerpeach'
            onClick={() => handleModeSelection('liquor')}
          >
            by liquor
          </button>
          <button
            className='px-4 py-2 rounded bg-peach text-white hover:bg-darkerpeach'
            onClick={() => handleModeSelection('type')}
          >
            by type
          </button>
        </div>
      )}
      {mode && (
        <div className='flex gap-4 flex-wrap justify-center my-5'>
          {(mode === 'liquor' ? liquors : types).map((option) => (
            <button
              key={option}
              className='px-4 py-2 rounded bg-peach text-white hover:bg-darkerpeach'
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      {mode && (
        <button
          className='px-4 py-2 rounded bg-darkerpeach text-white hover:bg-peach mt-4'
          onClick={() => setMode(null)}
        >
          Back
        </button>
      )}
    </div>
  );
};

export default ExploreOptions;
