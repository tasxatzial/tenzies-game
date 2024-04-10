import React from 'react';
import Die from './Die.jsx';
import { nanoid } from 'nanoid';

export default function App() {
  const [dice, setDice] = React.useState(initializeDice());

  function genNewDie() {
    return {
      id: nanoid(),
      value: Math.floor(Math.random() * 6) + 1
    }
  }

  function initializeDice() {
    const dice = [];
    for (let i = 0; i < 10; i++) {
      dice.push(genNewDie());
    }
    return dice;
  }

  const dieComponents = dice.map(die => <Die key={die.id} value={die.value}/>)

  return (
    <main>
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div>
        {dieComponents}
      </div>
      <button>Roll</button>
    </main>
  )
}
