import React, { useEffect, useState } from 'react';

const DrinkCard = ({drink, openModal}) => {

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
        <div className='card'>
            <h2>{drink.name}</h2>
            {/* <h2>{drink.description}</h2> */}
            <img src={drink.image} alt="" style={{width: '200px', height: '200px'}} />
            <button onClick={openModal} >See Recipe</button>
        </div>
     )
}
export default DrinkCard