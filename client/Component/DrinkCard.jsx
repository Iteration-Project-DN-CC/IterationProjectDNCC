import React, { useEffect, useState } from 'react';

const DrinkCard = ({index, drink}) => {

    //manage state for the info in drink card 
    
    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    //on mounting, update state

    useEffect (() => {
        setName (drink.name);
        setImage (drink.image); 
    }, [])

    //return a div with the drink name and image
    return(
        <div>
            <h2>{drink}</h2>
            {/* <img src="image" alt="" /> */}
        </div>
     )
}
export default DrinkCard