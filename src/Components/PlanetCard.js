import React from 'react';

const PlanetCard = (props) => {
  const { name, diameter, terrain } = props.planetDetails;
  return (
    <div className='card'>
      <div className='details'>
        <div className='name'> <strong>Name</strong>: {name} </div>
        <div className='data'> <strong>Terrain</strong>: {terrain} </div>
        <div className='data'> <strong>Diameter</strong>: {diameter} </div>
      </div>
      
    </div>
  );
};

 
export default PlanetCard;
