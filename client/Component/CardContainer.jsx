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
        const response = await fetch(
          `http://localhost:3000/recipe?liquor=${
            selectedDrink || 'any'
          }&limit=45`
        );
        if (!response.ok) throw new Error('Failed to fetch drinks');

        const { recipes } = await response.json();
        setDrinks(recipes);
      } catch (error) {
        console.error('Error fetching drinks:', error);
      }
    };

    fetchDrinks();
  }, [selectedDrink]);

  const handleModal = (drink) => {
    setSelectedCardData(drink);
    setOpen(true);
  };

  return (
    <div className='bg-red-950 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5'>
      {drinks.map((drink) => (
        <DrinkCard
          key={drink.id}
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
