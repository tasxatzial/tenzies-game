import React from 'react';
import DieDot from './DieDot.jsx';

function createDotPositions(number) {
  const dots = [];

  if (number === 1 || number === 3 || number === 5) {
      dots.push(('dot-center'));
  }
  if (number !== 1) {
      dots.push('dot-top-left');
      dots.push('dot-bottom-right');
  }
  if (number === 4 || number === 5 || number === 6) {
      dots.push('dot-top-right');
      dots.push('dot-bottom-left');
  }
  if (number === 6) {
      dots.push('dot-middle-left');
      dots.push('dot-middle-right');
  }

  return dots;
}

export default function Die(props) {
  const dotPositions = createDotPositions(props.value);
  const dieDots = dotPositions.map((position, index) => <DieDot key={index} position={position} />);

  return (
    <div className="die-container">
      <button className="die-button">
        {dieDots}
      </button>
    </div>
  )
}
