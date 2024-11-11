import React, { useEffect, useState } from 'react';

const DrinkCard = ({drink, openModal}) => {
    return(
        <div className='card'>
            <h2>{drink.name}</h2>
            <img src={drink.image} alt="" style={{width: '200px', height: '200px'}} />
            <button onClick={openModal} >See Recipe</button>
        </div>
     )
}
export default DrinkCard