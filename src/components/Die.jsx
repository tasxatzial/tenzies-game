import React from 'react';
import DieDot from './DieDot.jsx';
import createDieDots from '../js/createDieDots.js';

export default function Die({die, holdDie, isEnabled}) {
  const dieDots = createDieDots(die.value);
  const dieDotsComponents = dieDots.map(dot => {
    return <DieDot key={dot.id} name={dot.name} />
  });

  const srText = `${die.isHeld ? 'Frozen ' : ''} ${die.value}`;
  let className = 'die-button';
  if (die.isHeld) {
    className += ' is-held';
  }
  if (die.isEnabled) {
    className += ' is-enabled';
  }
  const tabIndex = isEnabled ? 0 : -1;

  return (
    <div className="die-container">
      <button className={className} onClick={holdDie} tabIndex={tabIndex}>
        {dieDotsComponents}
        <span className="sr-only" aria-live="polite">{srText}</span>
      </button>
    </div>
  )
}
