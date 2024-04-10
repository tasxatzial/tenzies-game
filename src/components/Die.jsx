import React from 'react';
import DieDot from './DieDot.jsx';

function createDotPositions(number) {
  const dots = [];

  if (number === 1 || number === 3 || number === 5) {
      dots.push({
        name: 'dot-center',
        id: 5
      });
  }
  if (number !== 1) {
      dots.push({
        name: 'dot-top-left',
        id: 1
      });
      dots.push({
        name: 'dot-bottom-right',
        id: 9
      });
  }
  if (number === 4 || number === 5 || number === 6) {
      dots.push({
        name: 'dot-top-right',
        id: 3
      });
      dots.push({
        name: 'dot-bottom-left',
        id: 7
      });
  }
  if (number === 6) {
      dots.push({
        name: 'dot-middle-left',
        id: 4
      });
      dots.push({
        name: 'dot-middle-right',
        id: 6
      });
  }

  return dots;
}

export default function Die(props) {
  const dotPositions = createDotPositions(props.value);
  const dieDots = dotPositions.map(position => {
    return <DieDot key={position.id} position={position.name} />
  });

  return (
    <div className="die-container">
      <button className={props.isHeld ? "die-button is-held" : "die-button"} onClick={props.holdDie}>
        {dieDots}
      </button>
    </div>
  )
}
