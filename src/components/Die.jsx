import React from 'react';
import DieDot from './DieDot.jsx';
import createDieDots from '../js/createDieDots.js';

export default function Die(props) {
  const dieDots = createDieDots(props.die.value);
  const dieDotsComponents = dieDots.map(dot => {
    return <DieDot key={dot.id} name={dot.name} />
  });

  const srText = `${props.die.isHeld ? "Frozen " : ""} ${props.die.value}`;
  const className = `die-button ${props.die.isHeld ? "is-held" : ""}`;

  return (
    <div className="die-container">
      <button className={className} onClick={props.holdDie}>
        {dieDotsComponents}
        <span className="sr-only" aria-live="polite">{srText}</span>
      </button>
    </div>
  )
}
