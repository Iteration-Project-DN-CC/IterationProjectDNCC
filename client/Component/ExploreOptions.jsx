import React, { useState } from 'react';

const ExploreOptions = ({ onQuery }) => {
	const [mode, setMode] = useState(null); // Tracks whether "By Liquor" or "By Type" is selected

	const liquors = ['Gin', 'Vodka', 'Whiskey', 'Rum', 'Tequila'];
	const types = [
		'Sour',
		'Highball',
		'Spirit Forward',
		'Fizz',
		'Martini',
		'Tropical',
	];

	const handleModeSelection = (selection) => {
		setMode(selection);
	};

	const handleOptionClick = (option) => {
		onQuery(option.toLowerCase()); // Pass the selected option to the parent component
	};

	return (
		<div className='w-full flex flex-col items-center gap-4'>
			{/* Initial options for "By Liquor" or "By Type" */}
			{!mode && (
				<div className='flex gap-4 my-5'>
					<button
						className='px-4 py-2 rounded bg-peach text-white hover:bg-darkerpeach'
						onClick={() => handleModeSelection('liquor')}
					>
						By Liquor
					</button>
					<button
						className='px-4 py-2 rounded bg-peach text-white hover:bg-darkerpeach'
						onClick={() => handleModeSelection('type')}
					>
						By Type
					</button>
				</div>
			)}

			{/* Sub-options for either liquor or type */}
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

			{/* Back button */}
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
