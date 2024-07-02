import React from 'react';
import createDieDotPositions from '../utils/createDieDotPositions.js';

function Die({die, holdDie, isEnabled}) {
  const dotPositions = createDieDotPositions(die.value);
  const dotComponents = dotPositions.map(position => {
    return <span key={position} className={`die-dot die-dot-${position}`}></span>
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
