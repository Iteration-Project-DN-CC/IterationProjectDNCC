import * as React from 'react';

import Popup from 'reactjs-popup';
// import Box from '@mui/material/Box';
//import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

export default function RecipeModal(props) {
console.log(props.data.ingredients) ; /// do this.
// so, if these are undefined like at the start please just error handle like this
if(!props.data.ingredients || props.open === false) {
	return (
	 // now we have error handleing.
		<div style={{position:'fixed'}}></div>
		
	)
}

const ingredientsList = props.data.ingredients;
console.log(ingredientsList);


	return (
		<div> 

			<Popup
		className='informationModial'
		open={props.open}
		onClose={() => {
		  props.closeModal();
		}}
		modal
		nested
	  >
		{(close) => (
		  <div className='modal'>
			<div className='content'>
				<img src={props.data.image} style={{width: '200px', height: '200px'}} />
				<h2>{`${props.data.name}`}</h2>
				<h3>Description:</h3>
				<p>{`${props.data.description}`}</p>
				
				<div>
					<h3>Ingredients: </h3>
					<span>{props.data.ingredients.join(', ')}</span>
				</div>
				
				<div>
					<h3>Recipe:</h3>
					<ul>
						<div>

							{
								props.data.recipe.map((ingredient, index) => (
									<li key={index}>
										<p>{ingredient}</p>
									</li>
								))
							}
						</div>
					</ul>
				</div>

				<h3>Instructions:</h3>
				<p>{`${props.data.instruction}`}</p>
				{/* <h3>Recipe:</h3>  */}
				{/* <ul>
					{props.data.recipe.map((recipeItem) => {
						<li>
							<p>{recipeItem}</p>
						</li>
					})}
				</ul> */}

				

			
  
			  <br />
			</div>
			<button
			  onClick={() => {
				props.closeModal();
				close();
			  }}
			>
			  close
			</button>
		  </div>
		)}
	  </Popup>
			
		</div>
	)
}