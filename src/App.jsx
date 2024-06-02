import React from 'react';
import ResponsiveConfetti from './components/ResponsiveConfetti.jsx';
import Die from './components/Die.jsx';


export default function App() {
  const [dice, setDice] = React.useState(() => {
    return JSON.parse(localStorage.getItem('tenzies-dice')) || initializeDice();
  });

  const [isWon, setIsWon] = React.useState(() => {
    return JSON.parse(localStorage.getItem('tenzies-is-won')) || false;
  });

  const [showStartNewGameMsg, setShowStartNewGameMsg] = React.useState(false);

  React.useEffect(() => {
    const firstDieValue = dice[0].value;
    const gameOver = dice.every(die => die.value === firstDieValue && die.isHeld);
    if (gameOver) {
      setIsWon(true);
    }
    localStorage.setItem('tenzies-dice', JSON.stringify(dice));
  }, [dice]);

  React.useEffect(() => {
    localStorage.setItem('tenzies-is-won', JSON.stringify(isWon));
  }, [isWon]);

  function createDie(id) {
    return {
      id: id,
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false
    }
  }

  function initializeDice() {
    const dice = [];
    for (let i = 0; i < 10; i++) {
      dice.push(createDie(i));
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
      setShowStartNewGameMsg(true);
      return;
    }
    setDice(prevDice => {
      const newDice = [];
      prevDice.forEach(die => {
        if (die.isHeld) {
          newDice.push(die);
        }
        else {
          newDice.push(createDie(die.id));
        }
      });
      return newDice;
    });
  }

  function startNewGame() {
    setDice(() => initializeDice());
    setIsWon(false);
    setShowStartNewGameMsg(false);
  }

  const dieComponents = dice.map(die => {
    return <Die key={die.id} die={die} holdDie={() => holdDie(die.id)} />
  })

  return (
    <>
      <main>
        {isWon && <ResponsiveConfetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Click each die to freeze it at its current value between rolls. Game is won when all dice are frozen and have the same value.</p>
        <button className="button new-game-button" onClick={startNewGame}>New game</button>
        {isWon && <p className="game-won-msg" role="alert">You won!</p>}
        <div className="dice-container">
          {dieComponents}
        </div>
        {showStartNewGameMsg && <p className="start-new-game-msg" role="alert">Please start a new game.</p>}
        <button className="button roll-button" onClick={rollDice}>Roll</button>
      </main>
      <footer>
        <p className="github-info"><a href="https://github.com/tasxatzial/tenzies-game" className="github-link">See the project on GitHub</a></p>
      </footer>
    </>
  )
}