import React, { useState } from 'react';
import CardContainer from './CardContainer.jsx';
import IngredientsContainer from './IngredientsContainer.jsx';
import ExploreOptions from './ExploreOptions.jsx';

const UserInput = () => {
	const [selectedOption, setSelectedOption] = useState(null); // Tracks user selection
	const [ingredientsDisplay, setIngredientsDisplay] = useState(false);

	const handleToggleChange = () => {
		setIngredientsDisplay((prevState) => !prevState);
		setSelectedOption(null); // Reset selection when toggling modes
	};

	const handleQuery = (option, mode) => {
		console.log(`Querying for ${mode}: ${option}`);
		setSelectedOption(option); // Save the selected option
	};

	return (
		<div className='w-full flex flex-col items-center'>
			{/* Toggle Switch */}
			<div className='flex items-center gap-4 my-5'>
				<span className='text-gray-700 font-medium'>Explore</span>
				<label className='relative inline-flex items-center cursor-pointer'>
					<input
						type='checkbox'
						className='sr-only peer'
						onChange={handleToggleChange}
					/>
					<div className='w-11 h-6 bg-gray-200 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 peer-checked:bg-blue-600 transition-colors duration-300'>
						<div className='w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 peer-checked:translate-x-5'></div>
					</div>
				</label>
				<span className='text-gray-700 font-medium'>Create</span>
			</div>

			{/* Explore State */}
			{!ingredientsDisplay && (
				<>
					<ExploreOptions onQuery={handleQuery} />
					{selectedOption && <CardContainer selectedDrink={selectedOption} />}
				</>
			)}

			{/* Create State */}
			{ingredientsDisplay && <IngredientsContainer />}
		</div>
	);
};

export default UserInput;
