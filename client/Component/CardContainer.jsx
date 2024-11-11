import React, { useEffect, useState } from 'react';
//need to import DrinkCard 
import DrinkCard from './DrinkCard.jsx';
import RecipeModal from './RecipeModal.jsx';
// import Modal from '@mui/material/Modal';

const CardContainer = (props) => {
    
    //input: takes in prop from User as liquor choice
    const [open, setOpen] = React.useState(false);
    const [selectedCardData, setSelectedCardData] = React.useState({});
    
  const openModal = () => {
    setOpen(true);
  } 
 

  const closeModal = () => setOpen(false);
    //state management for the liquor 
    // const [liquor, setLiquor] = useState('any'); //initialize liquor = "any"

    //state managment for response items: tbd 
    const [drinks, setDrinks] = useState([]) //initially drinks is an empty array 
    console.log('props passed in: ', props.drink)
    // console.log('drinks: ', drinks)
    
    
// e server sending
        //define aysnc function  the liquor choice with the body  or sending any 
    useEffect(() => {
        //define aysnc function 
        const fetchData = async () => {
            try {
                const liquorSelected = props.drink || 'any';
                const response = await fetch(`http://localhost:3000/recipe?liquor=${liquorSelected}&limit=45`)
                if (!response.ok) {
                    throw new Error (`Reponse not ok, status ${response.status}`)
                }
                const result = await response.json();
                //result will be an object with key recipes that an array 
                console.log('result: ', result);
                   // result.recipes = an array of the different drinks
                const fetchedDrinks = result.recipes; 
                //update state
                setDrinks(fetchedDrinks);
            //need catch error tched drinks: ", fetchedDrinks)
            }
            //need catch error 
            catch (error){
                console.log('we are here')
                console.log("Error caught in the cardContainer: " + error)
            }
        }
        
        
        fetchData();
    }, [props.drinks, props.rnd])
    //use useEffect to make the fetch request 

    //return the drinkCard for each drink 
    return (
      
        <div className='card-container'>
              {/* <div>{`${props.rnd}`}</div> */}
            {/* need to pass the props to the drink card: name, picture ... */}
          
            {drinks.map((drink) => (
                <DrinkCard key= {drink.id} drink={drink} openModal={() =>{ 
                    setSelectedCardData(drink);
                    openModal();  }} /> 
            ))}
            <RecipeModal closeModal={closeModal} open={open} data={selectedCardData} />
        </div>
    )
}

export default CardContainer;