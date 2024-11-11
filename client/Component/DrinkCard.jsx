import React, { useEffect, useState } from 'react';

const DrinkCard = ({drink}) => {

    //manage state for the info in drink card 
    
    // const [name, setName] = useState('');
    // // const [image, setImage] = useState('');

    // //on mounting, update state

    // useEffect (() => {
    //     setName (drink.name);
    //     // setImage (drink.image); 
    // }, [])

    //return a div with the drink name and image
    return(
        <div>
            <h2>{drink.name}</h2>
            <h2>{drink.description}</h2>
            <img src={drink.image} alt="" style={{width: '70px', height: 'autod'}} />
        </div>
     )
}
export default DrinkCard