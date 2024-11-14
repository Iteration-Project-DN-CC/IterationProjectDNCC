import React, { useEffect, useState } from 'react';
import DrinkCard from './DrinkCard.jsx';
import RecipeModal from './RecipeModal.jsx';

const CardContainer = ({ selectedDrink }) => {
  const [drinks, setDrinks] = useState([]);
  const [selectedCardData, setSelectedCardData] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const isLiquor = ['gin', 'vodka', 'whiskey', 'rum', 'tequila'].includes(
          selectedDrink.toLowerCase()
        );
        const endpoint = isLiquor
          ? `http://localhost:3000/recipe?liquor=${
              selectedDrink || 'any'
            }&limit=75`
          : `http://localhost:3000/recipe/type/${encodeURIComponent(
              selectedDrink.toLowerCase()
            )}`;

        console.log(`Fetching from endpoint: ${endpoint}`);

        const response = await fetch(endpoint);
        if (!response.ok)
          throw new Error(`Failed to fetch drinks from ${endpoint}`);

        const { recipes } = await response.json();
        setDrinks(recipes);
      } catch (error) {
        console.error('Error fetching drinks:', error);
      }
    };

    if (selectedDrink) {
      fetchDrinks();
    }
  }, [selectedDrink]);

  const handleModal = (drink) => {
    setSelectedCardData(drink);
    setOpen(true);
  };

  return (
    <div className='bg-peach grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5'>
      {drinks.map((drink, index) => (
        <DrinkCard
          key={index}
          drink={drink}
          openModal={() => handleModal(drink)}
        />
      ))}
      {open && selectedCardData && (
        <RecipeModal
          data={selectedCardData}
          closeModal={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default CardContainer;
