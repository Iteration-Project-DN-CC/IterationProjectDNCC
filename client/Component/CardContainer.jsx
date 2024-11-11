import React, { useEffect, useState } from 'react';
//need to import DrinkCard 
import DrinkCard from './DrinkCard.jsx';

const CardContainer = (props) => {
    //input: takes in prop from User as liquor choice

    //state management for the liquor 
    // const [liquor, setLiquor] = useState('any'); //initialize liquor = "any"

    //state managment for response items: tbd 
    const [drinks, setDrinks] = useState([]) //initially drinks is an empty array 
    console.log('props passed in: ', props.drinks)
    console.log('drinks: ', drinks)
    
    
    //make a fetch request to the server sending the liquor choice with the body  or sending any 
    useEffect(() => {
        //define aysnc function 
        const fetchData = async () => {
            try {
                const liquorSelected = props.drinks || 'any';
                const response = await fetch(`http://localhost:3000/recipe?liquor=${liquorSelected}&limit=3`)
                if (!response.ok) {
                    throw new Error ('Reponse not ok, status ${response.status}')
                }
                const result = await response.json();
                //result will be an object with key recipes that an array 
                console.log('result: ', result);
                   // result.recipes = an array of the different drinks
                const fetchedDrinks = result.recipes; 
                //update state
                setDrinks(fetchedDrinks);
                console.log("fetched drinks: ", fetchedDrinks)
            }
            //need catch error 
            catch (error){
                console.log('we are here')
                console.log("Error caught in the cardContainer: " + error)
            }
        }
        
        // const fetchedDrinks = [
        //     {
        //         id: 123,
        //         name: 'white russian', 
        //         liquor: 'vodka',
        //         ingredients: ['vodka', 'milk', 'ice', 'coffee liqueur'],
        //         recipe: ['1 cup ice','2 oz vodka', '1 oz coffee liqueur'],
        //         instruction: "Stirring gently, pour all ingredients into highball glass. Garnish.",
        //         description: "a warm and fun drink that reminds you of....",
        //         image: "https://images.pexels.com/photos/1194030/pexels-photo-1194030.jpeg?cs=srgb&dl=pexels-mirrographer-1194030.jpg&fm=jpg"
        //     }, 
        //     {
        //         id: 1234,
        //         name: 'old fashion', 
        //         liquor: 'whiskey',
        //         ingredients: ['vodka', 'milk', 'ice', 'coffee liqueur'],
        //         recipe: ['1 cup ice','2 oz vodka', '1 oz coffee liqueur'],
        //         instruction: "Stirring gently, pour all ingredients into highball glass. Garnish.",
        //         description: "a warm and fun drink that reminds you of....",
        //         image: "https://images.pexels.com/photos/1194030/pexels-photo-1194030.jpeg?cs=srgb&dl=pexels-mirrographer-1194030.jpg&fm=jpg"
        //         }
        // ]
        // // const tempDrinks = []; //['white russian, 'old fashion']
        // // for (let drink of fetchedDrinks){
        // //     tempDrinks.push(drink.name)
        // // }
        // setDrinks(fetchedDrinks)
        
        fetchData();
    }, [props.drinks])
    //use useEffect to make the fetch request 

    //return the drinkCard for each drink 
    return (
        <div>
            {/* need to pass the props to the drink card: name, picture ... */}
            {drinks.map((drink) => (
                <DrinkCard key= {drink.id} drink={drink} /> 
            ))}
        </div>
    )
}

export default CardContainer;