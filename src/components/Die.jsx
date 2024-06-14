import React from 'react';
import DieDot from './DieDot.jsx';
import createDieDots from '../js/createDieDots.js';

export default function Die({die, holdDie, isEnabled}) {
  const dieDots = createDieDots(die.value);
  const dieDotsComponents = dieDots.map(dot => {
    return <DieDot key={dot.id} name={dot.name} />
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
      <button className={className} onClick={holdDie} disabled={!isEnabled}>
        {dieDotsComponents}
      </button>
    </div>
  )
}
