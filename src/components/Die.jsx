import React from 'react';
import DieDot from './DieDot.jsx';
import createDieDots from '../js/createDieDots.js';

export default function Die({die, holdDie}) {
  const dieDots = createDieDots(die.value);
  const dieDotsComponents = dieDots.map(dot => {
    return <DieDot key={dot.id} name={dot.name} />
  });

  const srText = `${die.isHeld ? 'Frozen ' : ''} ${die.value}`;
  const className = `die-button ${die.isHeld ? 'is-held' : ''}`;

  return (
    <div className="die-container">
      <button className={className} onClick={holdDie}>
        {dieDotsComponents}
        <span className="sr-only" aria-live="polite">{srText}</span>
      </button>
    </div>
  )
}
