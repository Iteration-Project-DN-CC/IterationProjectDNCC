import React, { useEffect, useState } from 'react';
import DrinkCard from './DrinkCard.jsx';
import RecipeModal from './RecipeModal.jsx';


const CardContainer = (props) => {
    
    const [open, setOpen] = React.useState(false);
    const [selectedCardData, setSelectedCardData] = React.useState({});
    
  const openModal = () => {
    setOpen(true);
  } 
 

  const closeModal = () => setOpen(false);
  

    //state managment for response 
    const [drinks, setDrinks] = useState([]) //initially drinks is an empty array 
 
    
    
// fetch request to the server to get drinks 
       
    useEffect(() => {
      //define aysnc function  
        const fetchData = async () => {
            try {
                //if no liquor is selected, send the fetch request with 'any' to get a random selection of drinks
                const liquorSelected = props.drink || 'any';
                const response = await fetch(`http://localhost:3000/recipe?liquor=${liquorSelected}&limit=45`)
                if (!response.ok) {
                    throw new Error (`Reponse not ok, status ${response.status}`)
                }
                const result = await response.json();
                //result will be an object with key recipes that an array 
                const fetchedDrinks = result.recipes;  // result.recipes = an array of the different drinks
                //update state
                setDrinks(fetchedDrinks);
            //need catch error tched drinks: ", fetchedDrinks)
            }
            //need catch error 
            catch (error){
                console.log("Error caught in the cardContainer: " + error)
            }
        }
        
        //call fetchdata function 
        fetchData();
    }, [props.drinks, props.rnd])

    //return the drinkCard for each drink 
    return (
      
        <div className='card-container'>
            {/* map through the drinks array and create a drink container for each drink */}
            {drinks.map((drink) => (
                <DrinkCard key= {drink.id} drink={drink} openModal={() =>{ 
                    setSelectedCardData(drink);
                    openModal();  }} /> 
            ))}
            {/* render the RecipeModal */}
            <RecipeModal closeModal={closeModal} open={open} data={selectedCardData} />
        </div>
    )
}

export default CardContainer;