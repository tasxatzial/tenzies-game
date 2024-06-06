import React from 'react';
import ResponsiveConfetti from './components/ResponsiveConfetti.jsx';
import Die from './components/Die.jsx';
import Time from './components/Time.jsx';

export default function App() {
  const countdownDuration = 3;

  /*---------------- STATE ----------------*/
  const [dice, setDice] = React.useState(() => {
    return initializeDice();
  });
  const [isWon, setIsWon] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [countdown, setCountdown] = React.useState(0);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [bestTimeCount, setBestTimeCount] = React.useState(() => {
    return JSON.parse(localStorage.getItem('tenzies-best-time-count')) || 0;
  });
  const [showStartNewGameMsg, setShowStartNewGameMsg] = React.useState(false);

  /*---------------- REFS ----------------*/
  const countInterval = React.useRef(null);
  const timeFirstStarted = React.useRef(false);

  /*---------------- EFFECTS ----------------*/
  React.useEffect(() => {
    if (!gameStarted) {
      return;
    }
    if (timeFirstStarted.current) {
      countInterval.current = setInterval(() => {
        setTime(prevTimeCount => prevTimeCount + 1);
      }, 100);
      timeFirstStarted.current = false;
    }
    else {
      const firstDieValue = dice[0].value;
      const gameOver = dice.every(die => die.value === firstDieValue && die.isHeld);
      if (gameOver) {
        setIsWon(true);
        setGameStarted(false);
        clearInterval(countInterval.current);
        if (time < bestTimeCount || bestTimeCount === 0) {
          setBestTimeCount(time);
          localStorage.setItem('tenzies-best-time-count', time);
        }
      }
    }
  }, [dice]);

  React.useEffect(() => {
    if (!gameStarted) {
      return;
    }
    if (countdown === countdownDuration) {
      countInterval.current = setInterval(() => {
        setCountdown(prevTimeCount => prevTimeCount - 1);
      }, 1000);
    }
    if (countdown === 0) {
      setDice(() => initializeDice());
      clearInterval(countInterval.current);
      timeFirstStarted.current = true;
    }
  }, [countdown]);

  /*---------------- FUNCTIONS ----------------*/
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
    if (!gameStarted) {
      setShowStartNewGameMsg(true);
      return;
    }
    if (countdown > 0) {
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
      clearInterval(countInterval.current);
      setCountdown(0);
    }
    else {
      setGameStarted(true);
      setIsWon(false);
      setShowStartNewGameMsg(false);
      setTime(0);
      setCountdown(countdownDuration);
    }
  }

  /*------------------------------------------*/
  const dieComponents = dice.map(die => {
    return <Die key={die.id} die={die} holdDie={() => holdDie(die.id)} />
  });

  let diceOverLayClass = 'dice-overlay';
  if (isWon || !gameStarted || countdown > 0) {
    diceOverLayClass += ' visible-overlay';
  }
  if (countdown > 0) {
    diceOverLayClass += ' huge-overlay-text';
  }

  let diceOverLayText;
  if (isWon) {
    diceOverLayText = "You won!";
  }
  else if (countdown > 0) {
    diceOverLayText = countdown;
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
          <Time text="Time" time={time} />
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
