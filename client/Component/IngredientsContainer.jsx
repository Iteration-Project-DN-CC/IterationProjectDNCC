import React, { useEffect, useState, useRef } from 'react';
import DrinkCard from './DrinkCard.jsx';
import RecipeModal from './RecipeModal.jsx';

const IngredientsContainer = ({ username }) => {
  // Fetch request to backend to get all the ingredients upon loading of the page
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/ingredients/ingredients'
        );
        const { fetchedIngredients } = await response.json();
        setFullIngredientsList(fetchedIngredients);
        setFilteredIngredientsList(fetchedIngredients);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };
    fetchIngredients();
  }, []);

  // Set up states
  // Conditional rendering of drop down
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  // Full ingredients list from backend
  const [fullIngredientsList, setFullIngredientsList] = useState([]);
  // Filtered ingredients list as user types
  const [filteredIngredientsList, setFilteredIngredientsList] = useState([]);
  // User selected ingredients
  const [selectedIngredientsArr, setSelectedIngredientsArr] = useState([]);
  // User input in text box
  const [inputValue, setInputValue] = useState('');
  // Fetched drinks from backend depending on ingredient selection
  const [drinks, setDrinks] = useState([]);
  // User selected card
  const [selectedCardData, setSelectedCardData] = useState(null);
  // Conditional rendering of recipe info
  const [open, setOpen] = useState(false);

 // Open search drop down
  const handleDropDown = () => {
    setDropdownVisibility(true);
  };

  const dropdownRef = useRef(null);

  // Close drop down by clicking elsewhere
  const closeDropdownByClickingElsewhere = (e) => {
    // Check if user clicked anywhere but text and dropdown
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      !e.target.closest('#search-input')
    ) {
      setDropdownVisibility(false);
    }
  };
  document.addEventListener('click', closeDropdownByClickingElsewhere);

 
  // Update inputValue state as user types in text box
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  // Update filteredIngredientsList state as inputValue changes
  useEffect(() => {
    const filteredIngredients = fullIngredientsList.filter((element) =>
      element.startsWith(inputValue)
    );
    setFilteredIngredientsList(filteredIngredients);
  }, [inputValue]);

  // Fetch function to get filtered recipies from the backend
  const fetchRecipies = async (selectedIngredients) => {
    try {
      const response = await fetch(
        'http://localhost:3000/recipe/findByIngredient',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedIngredients),
        }
      );
      const { recipes } = await response.json();
      setDrinks(recipes);
    } catch (error) {
      console.error('Error fetching recipies:', error);
    }
  };

  // When user clicks on option from drop down, add to ingredientSelectionArr state and perform fetch request
  const handleClick = (ingredient) => {
    const ingredientStateHold = [...selectedIngredientsArr];
    if (!ingredientStateHold.includes(ingredient))
      ingredientStateHold.push(ingredient);
    setSelectedIngredientsArr(ingredientStateHold);
    fetchRecipies(ingredientStateHold);
  };

  // Remove ingredient from state if user clicks on it again and perform fetch request on updated selection
  const removeIngredient = (ingredient) => {
    const ingredientStateHold = [...selectedIngredientsArr];
    var index = ingredientStateHold.indexOf(ingredient);
    if (index !== -1) {
      ingredientStateHold.splice(index, 1);
    }
    setSelectedIngredientsArr(ingredientStateHold);
    fetchRecipies(ingredientStateHold);
  };

  // Open recipe view
  const handleModal = (drink) => {
    setSelectedCardData(drink);
    setOpen(true);
  };

  // = Grab user ingredients array from backend, doesn't work right now
  // const fetchUserIngredients = () => {
  //   const toSend = {
  //     username: username,
  //   };
  //   console.log('User wants to grab their ingredients from the backend');
  //   const userIngredientsFromBackend = async () => {
  //     try {
  //       const response = await fetch(
  //         'http://localhost:3000/user/fetchIngredients',
  //         {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           /*
  
  //           */
  //           body: JSON.stringify(toSend),
  //         }
  //       );
  //       const { userIngredients } = await response.json();
  //       console.log('user ingredients ', userIngredients);
  //       setSavedUserIngredients(userIngredients);
  //       const newFilteredIngredients = [
  //         ...new Set(selectedIngredientsArr.concat(userIngredients)),
  //       ];
  //       setSelectedIngredientsArr(newFilteredIngredients);
  //     } catch (error) {
  //       console.error('Error fetching ingredients:', error);
  //     }
  //   };
  //   userIngredientsFromBackend();
  //   fetchRecipies(selectedIngredientsArr);
  // };

  // Save current ingredients to user
    const addIngredientsToUser = () => {
    const toSend = {
      addIngredients: selectedIngredientsArr,
      username: username,
    };
    const sendIngredientsToUser = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/user/addIngredients',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(toSend),
          }
        );
      } catch (error) {
        console.error('Error adding ingredients:', error);
      }
    };
    sendIngredientsToUser();
  };

  return (
    <div>
      <div className='flex items-center justify-center my-5'>
        {/* DROP DOWN MENU + SEARCH */}
        <div className='relative'>
          <input
            id='search-input'
            className='block w-full px-4 py-2 text-gray-300 h-10 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-700'
            type='text'
            placeholder='Add ingredients'
            autoComplete='off'
            onClick={handleDropDown}
            onChange={handleInput}
          />
          {/* DROPDOWN WILL ONLY APPEAR WHEN USER CLICKS ON TEXT BOX */}
          {dropdownVisibility && (
            <div
              id='dropdown-menu'
              ref={dropdownRef}
              className='absolute left-0 w-full mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 focus-within:block overflow-y-auto max-h-64'
            >
              {/* POPULATE ALL THE INGREDIENTS IN DROP DOWN */}
              {filteredIngredientsList.map((ingredient) => (
                <a
                  className='block px-4 py-2 text-gray-800 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md'
                  onClick={() => handleClick(ingredient)}
                  key={ingredient}
                >
                  {ingredient}
                </a>
              ))}
            </div>
          )}
        </div>
        {/* ADD USER INGREDIENTS FROM BACKEND */}
        <span className='mx-5'>
          <button
            className='px-4 py-2 rounded bg-peach text-white hover:bg-darkerpeach'
            // onClick={() => fetchUserIngredients()}
          >
            Fetch my ingredients
          </button>
          {/* SAVE CURRENT INGREDIENTS LIST */}
          <button
            className='px-4 py-2 rounded bg-peach text-white hover:bg-darkerpeach'
            onClick={() => addIngredientsToUser()}
          >
            Save my ingredients
          </button>
        </span>
      </div>

      {/* SELECTED INGREDIENTS, CHANGES EVERYTIME A USER CLICKS ON ANOTHER SELECTION */}
      <div className='flex-wrap space-x-4 space-y-4 justify-center my-5'>
        {/* {savedUserIngredients.length != 0 &&
          savedUserIngredients.map((ingredient) => (
            <button
              key={ingredient}
              className={'px-4 py-2 text-red-900 rounded bg-white'}
              onClick={() => removeIngredient(ingredient)}
            >
              {ingredient}
            </button>
          ))} */}

        {selectedIngredientsArr.map((ingredient) => (
          <button
            key={ingredient}
            className={'px-4 py-2 text-red-900 rounded bg-white'}
            onClick={() => removeIngredient(ingredient)}
          >
            {ingredient}
          </button>
        ))}
      </div>

      {/* CONDITIONALLY RENDER DRINK CARDS DEPENDING ON IF USER SELECTED ANYTHING OR NOT */}
      {selectedIngredientsArr.length != 0 && (
        <div className='bg-background grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5'>
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
      )}
    </div>
  );
};

export default IngredientsContainer;
