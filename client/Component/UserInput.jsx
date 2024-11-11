import React, { useEffect, useState } from 'react';
import CardContainer from './CardContainer.jsx';

function UserInput() {
	// display 5 drinking choices inside 5 buttons

	const drinks = ["gin", "vodka", "whiskey", "rum", "tequila"];

	const [selectedDrink, setSelectedDrink] = useState(null);
	const [showCardDisplay, setShowCardDisplay] = useState(false);

	const [randomNumber, setRandomNumber] = useState(0);
	// This is esentially used as an update signal, since the fetch requests
	// are in the Card Container, we have to have something to force them
	// to update, this is very un-React, and was only done because a 
	// backend person came to the front end and we needed to add a way to
	// update these components.

	useEffect(() => {
		setShowCardDisplay(true);
	}, []);

	// button to show the result;
	function handleDrinkSelection(drink) {
		setSelectedDrink(drink);
		//setShowCardDisplay(false);
		console.log('handleDrinkSelection :', drink)
	}

	function handleFindDrinkClick(drink) {
		setRandomNumber(Math.random()) // this forces the child component to update.
		setShowCardDisplay(true);
		console.log('handleDrinkSelection :', drink)
	}

	return(
		 <div>
			<div className="button-container">
				{drinks.map((drink) => (
					<button key={drink} onClick={() => handleDrinkSelection(drink)}>
						{drink}
					</button>
				))}
				<button onClick={handleFindDrinkClick} className='findDrink'>Find My Drink</button>
			</div>
			{/* {showCardDisplay && (<CardContainer />)} */}
			{/* {showCardDisplay && selectedDrink && (<CardContainer drink={selectedDrink} />) } */}
			{showCardDisplay && (<CardContainer rnd={randomNumber} drink={selectedDrink}/>)}
		 </div>
		)
}

export default UserInput;