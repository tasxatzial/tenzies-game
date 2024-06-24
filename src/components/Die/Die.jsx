import React from 'react';
import DieDot from './DieDot.jsx';
import createDieDotPositions from '../../js/createDieDotPositions.js';

function Die({die, holdDie, isEnabled}) {
  const dotPositions = createDieDotPositions(die.value);
  const dotComponents = dotPositions.map(position => {
    return <DieDot key={position} position={position} />
  });

  let className = 'die-button';
  if (die.isHeld) {
    className += ' is-held';
  }
  if (!isEnabled) {
    className += ' button-disabled';
  }

  return (
    <div className="die-container">
      <button className={className} onClick={() => holdDie(die.id)} disabled={!isEnabled}>
        {dotComponents}
      </button>
    </div>
  )
}

export default React.memo(Die);
