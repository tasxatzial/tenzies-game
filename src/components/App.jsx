import React from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import Die from './Die.jsx';

export default function App() {
  const [dice, setDice] = React.useState(initializeDice());
  const [isWon, setIsWon] = React.useState(false);
  const [showStartNewGameTip, setShowStartNewGameTip] = React.useState(false);

  React.useEffect(() => {
    const firstDieValue = dice[0].value;
    const gameOver = dice.every(die => die.value === firstDieValue && die.isHeld);
    if (gameOver) {
      setIsWon(true);
    }
  }, [dice]);

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
    if (isWon) {
      setShowStartNewGameTip(true);
      return;
    }
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

  function startNewGame() {
    setDice(() => initializeDice());
    setIsWon(false);
    setShowStartNewGameTip(false);
  }

  const dieComponents = dice.map(die => {
    return <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDie={() => holdDie(die.id)} />
  })

  return (
    <main>
      {isWon && <Confetti width={window.innerWidth} height={window.innerHeight}/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <button className="new-game-button" onClick={startNewGame}>New game</button>
      <div className="dice-container">
        {dieComponents}
      </div>
      {isWon && <p className="game-won-msg" role="alert">You won!</p>}
      {showStartNewGameTip && <p className="start-new-game-msg" role="alert">Please start a new game.</p>}
      <button className="roll-button" onClick={rollDice}>Roll</button>
    </main>
  )
}
