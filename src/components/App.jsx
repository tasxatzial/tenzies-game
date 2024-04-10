import React from 'react';
import { nanoid } from 'nanoid';
import Die from './Die.jsx';

export default function App() {
  const [dice, setDice] = React.useState(initializeDice());

  function genNewDie() {
    return {
      id: nanoid(),
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false
    }
  }

  function initializeDice() {
    const dice = [];
    for (let i = 0; i < 10; i++) {
      dice.push(genNewDie());
    }
    return dice;
  }

  function holdDie(id) {
    setDice(prevDice => {
      const newDice = [];
      prevDice.forEach(die => {
        if (die.id === id) {
          newDice.push({
            ...die,
            isHeld: !die.isHeld
          });
        }
        else {
          newDice.push(die);
        }
      });
      return newDice;
    });
  }

  function rollDice() {
    setDice(prevDice => {
      const newDice = [];
      prevDice.forEach(die => {
        if (die.isHeld) {
          newDice.push(die);
        }
        else {
          newDice.push(genNewDie());
        }
      });
      return newDice;
    });
  }

  const dieComponents = dice.map(die => {
    return <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDie={() => holdDie(die.id)} />
  })

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {dieComponents}
      </div>
      <button className="roll-button" onClick={rollDice}>Roll</button>
    </main>
  )
}
