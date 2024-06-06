import React from 'react';
import ResponsiveConfetti from './components/ResponsiveConfetti.jsx';
import Die from './components/Die.jsx';
import Time from './components/Time.jsx';

export default function App() {
  const [dice, setDice] = React.useState(() => {
    return initializeDice();
  });
  const [isWon, setIsWon] = React.useState(false);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [timeCount, setTimeCount] = React.useState(0);
  const [counter, setCounter] = React.useState(3);
  const [bestTimeCount, setBestTimeCount] = React.useState(() => {
    return JSON.parse(localStorage.getItem('tenzies-best-time-count')) || 0;
  });
  const [showStartNewGameMsg, setShowStartNewGameMsg] = React.useState(false);

  React.useEffect(() => {
    const firstDieValue = dice[0].value;
    const gameOver = dice.every(die => die.value === firstDieValue && die.isHeld);
    if (gameOver) {
      setIsWon(true);
      setGameStarted(false);
      if (timeCount < bestTimeCount || bestTimeCount === 0) {
        setBestTimeCount(timeCount);
        localStorage.setItem('tenzies-best-time-count', timeCount);
      }
    }
  }, [dice]);

  React.useEffect(() => {
    let interval;
    if (gameStarted) {
      console.log(counter)
      if (counter > 0) {
        console.log(counter)
        interval = setInterval(() => {
          setCounter(prevTimeCount => prevTimeCount - 1);
        }, 1000);
      }
      else {
        console.log(1)
        clearInterval(interval);
        interval = setInterval(() => {
          setTimeCount(prevTimeCount =>  prevTimeCount + 1);
        }, 100)
      }
    }
    else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    }
  }, [gameStarted, counter]);

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
    if (isWon || !gameStarted) {
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

  function toggleGame() {
    if (gameStarted) {
      setGameStarted(false);
      setCounter(3);
    }
    else {
      setDice(() => initializeDice());
      setIsWon(false);
      setShowStartNewGameMsg(false);
      setGameStarted(true);
      setTimeCount(0);
      setCounter(3);
    }
  }

  const dieComponents = dice.map(die => {
    return <Die key={die.id} die={die} holdDie={() => holdDie(die.id)} />
  });

  let diceOverLayClass = 'dice-overlay';
  if (isWon || !gameStarted || counter > 0) {
    diceOverLayClass += ' visible-overlay';
  }

  let diceOverLayText;
  if (isWon) {
    diceOverLayText = "You won!";
  }
  else if (gameStarted && counter > 0) {
    diceOverLayText = counter;
  }
  else {
    diceOverLayText = "";
  }
  
  const gameButtonText = gameStarted ? "Stop" : "New game";

  return (
    <>
      <main>
        {isWon && <ResponsiveConfetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Click each die to freeze it at its current value between rolls. Game is won when all dice are frozen and have the same value.</p>
        <button className="button new-game-button" onClick={toggleGame} aria-live="polite">{gameButtonText}</button>
        <div className="times-container">
          <Time text="Time" time={timeCount} />
          <Time text="Best" time={bestTimeCount} />
        </div>
        <div className="dice-container">
          <div className={diceOverLayClass} aria-live="polite">{diceOverLayText}</div>
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
