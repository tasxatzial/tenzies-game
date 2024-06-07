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
  const [countdownTime, setCountdownTime] = React.useState(0);
  const [isStarted, setIsStarted] = React.useState(false);
  const [bestTime, setBestTime] = React.useState(() => {
    return JSON.parse(localStorage.getItem('tenzies-best-time-count')) || 0;
  });
  const [showStartNewGameMsg, setShowStartNewGameMsg] = React.useState(false);

  /*---------------- REFS ----------------*/
  const intervalRef = React.useRef(null);
  const timeIsStoppedRef = React.useRef(false);

  /*---------------- EFFECTS ----------------*/
  React.useEffect(() => {
    if (timeIsStoppedRef.current) {
      intervalRef.current = setInterval(() => {
        setTime(prevTimeCount => prevTimeCount + 1);
      }, 100);
      timeIsStoppedRef.current = false;
    }
    else {
      const firstDieValue = dice[0].value;
      const gameOver = dice.every(die => die.value === firstDieValue && die.isHeld);
      if (gameOver) {
        setIsWon(true);
        setIsStarted(false);
        clearInterval(intervalRef.current);
      }
    }
  }, [dice]);

  React.useEffect(() => {
    if (!isWon) {
      return;
    }
    if (time < bestTime || bestTime === 0) {
      setBestTime(time);
      localStorage.setItem('tenzies-best-time-count', time);
    }
  }, [time, bestTime, isWon]);

  React.useEffect(() => {
    if (!isStarted) {
      return;
    }
    if (countdownTime === countdownDuration) {
      intervalRef.current = setInterval(() => {
        setCountdownTime(prevTimeCount => prevTimeCount - 1);
      }, 1000);
    }
    if (countdownTime === 0) {
      setDice(() => initializeDice());
      clearInterval(intervalRef.current);
      timeIsStoppedRef.current = true;
    }
  }, [countdownTime, isStarted]);

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

  function holdDie(dieId) {
    setDice(prevDice => prevDice.map(die =>
      die.id === dieId
        ? {...die, isHeld: !die.isHeld}
        : die
    ));
  }

  function rollDice() {
    if (!isStarted) {
      setShowStartNewGameMsg(true);
      return;
    }
    if (countdownTime > 0) {
      return;
    }
    setDice(prevDice => prevDice.map(die =>
      die.isHeld
        ? die
        : createDie(die.id)
    ));
  }

  function toggleGame() {
    if (isStarted) {
      setIsStarted(false);
      clearInterval(intervalRef.current);
      setCountdownTime(0);
    }
    else {
      setIsStarted(true);
      setIsWon(false);
      setShowStartNewGameMsg(false);
      setTime(0);
      setCountdownTime(countdownDuration);
    }
  }

  /*------------------------------------------*/
  const dieComponents = dice.map(die => {
    return <Die key={die.id} die={die} holdDie={() => holdDie(die.id)} />
  });

  let diceOverLayClass = 'dice-overlay';
  if (isWon || !isStarted || countdownTime > 0) {
    diceOverLayClass += ' visible-overlay';
  }
  if (countdownTime > 0) {
    diceOverLayClass += ' huge-overlay-text';
  }

  let diceOverLayText;
  if (isWon) {
    diceOverLayText = "You won!";
  }
  else if (countdownTime > 0) {
    diceOverLayText = countdownTime;
  }
  else {
    diceOverLayText = "";
  }
  
  const gameButtonText = isStarted ? "Stop" : "New game";

  return (
    <>
      <main>
        {isWon && <ResponsiveConfetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Click each die to freeze it at its current value between rolls. Game is won when all dice are frozen and have the same value.</p>
        <button className="button new-game-button" onClick={toggleGame} aria-live="polite">{gameButtonText}</button>
        <div className="times-container">
          <Time text="Time" time={time} />
          <Time text="Best" time={bestTime} />
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
