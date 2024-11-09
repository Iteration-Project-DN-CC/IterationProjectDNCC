import React, { useEffect, useState } from 'react';
//need to import DrinkCard 
import DrinkCard from './DrinkCard';

const CardContainer = ({liquor}) => {
    //input: takes in prop from User as liquor choice

    //state management for the liquor 
    const [liquor, setLiquor] = useState('any'); //initialize liquor = "any"

    //state managment for response items: tbd 
    const [drinkss, setDrinsks] = useState([]) //initially drinks is an empty array 

    //make a fetch request to the server sending the liquor choice with the body  or sending any 
    useEffect(() => {
        //define aysnc function 
        // const fetchData = async () => {
        //     try {
        //         // const response = await fetch(url here)
        //         if (!response.ok) {
        //             throw new Error ('Reponse not ok, status ...')
        //         }
        //         const result = await response.json();
        //         //result will be an object with key recipes that an array 
        //             //result.recipes = an array of the different drinks
        //             const fetchedDrinks = result.recipes; 
        //         //update state 
        //         setDrinks(fetchedDrinks)
        //     }
        //     //need catch error 
        //     catch (error){
        //         console.log("Error caught in the cardContainer" + "error")
        //     }
        // }
        const fetchedDrinks = [{
            id: 123,
            name: 'white russian', 
            liquor: 'vodka',
            ingredients: ['vodka', 'milk', 'ice', 'coffee liqueur'],
            recipe: ['1 cup ice','2 oz vodka', '1 oz coffee liqueur'],
            instruction: "Stirring gently, pour all ingredients into highball glass. Garnish.",
            description: "a warm and fun drink that reminds you of....",
            image: "https://images.pexels.com/photos/1194030/pexels-photo-1194030.jpeg?cs=srgb&dl=pexels-mirrographer-1194030.jpg&fm=jpg"
            }
        ]
        setDrinks(fetchedDrinks)
        
s;    }, [])
    //use useEffect to make the fetch request 

    //return the drinkCard for each drink 
    return (
        <div>
            {/* need to pass the props to the drink card: name, picture ... */}
            {drinks.map((drink, index) => (
                <DrinkCard index = {index} drink = {drink} /> 
            ))}
        </div>
    )
}

export default CardContainer