import React, { useEffect, useState } from 'react';
import CardContainer from './CardContainer.jsx';

function UserInput() {
	// display 5 drinking choices inside 5 buttons

	const drinks = ["Gin", "Vodka", "Whiskey", "Rum", "Tequila"];

	const [selectedDrink, setSelectedDrink] = useState(null);
	const [showCardDisplay, setShowCardDisplay] = useState(false);

	useEffect(() => {
		setShowCardDisplay(true);
	}, []);

	// button to show the result;
	function handleDrinkSelection(drink) {
		setSelectedDrink(drink);
		setShowCardDisplay(false);
		console.log('handleDrinkSelection :', drink)
	}

	function handleFindDrinkClick(drink) {  //function handleFindDrinkClick(drink) {
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
				<button onClick={handleFindDrinkClick}>Find My Drink</button>
			</div>
			{/* {showCardDisplay && selectedDrink && (<CardContainer drink={selectedDrink} />) } */}
			{showCardDisplay && (<CardContainer drinks={selectedDrink}/>)}
		 </div>
		)
}

export default UserInput;