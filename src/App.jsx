import React from 'react';
import ResponsiveConfetti from './components/ResponsiveConfetti.jsx';
import Die from './components/Die.jsx';
import TimeContainer from './components/TimeContainer.jsx';

export default function App() {
  const countdownDuration = 3;

  /*---------------- STATE ----------------*/
  const [dice, setDice] = React.useState(() => {
    return initializeDice();
  });
  const [isWon, setIsWon] = React.useState(false);
  const [isCountdownStarted, setIsCountdownStarted] = React.useState(false);
  const [isTimeStarted, setIsTimeStarted] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [countdownTime, setCountdownTime] = React.useState(countdownDuration);
  const [bestTime, setBestTime] = React.useState(() => {
    return JSON.parse(localStorage.getItem('tenzies-best-time-count'));
  });
  const [showStartNewGameMsg, setShowStartNewGameMsg] = React.useState(false);

  /*---------------- EFFECTS ----------------*/

  React.useEffect(() => {
    if (isTimeStarted) {
      const firstDieValue = dice[0].value;
      const gameOver = dice.every(die => die.value === firstDieValue && die.isHeld);
      if (gameOver) {
        setIsWon(true);
        setIsTimeStarted(false);
      }
    }
  }, [dice, isTimeStarted]);

  React.useEffect(() => {
    if (!isTimeStarted && !isWon) {
      return;
    }
    if (isWon && (time < bestTime || !bestTime)) {
      setBestTime(time);
      localStorage.setItem('tenzies-best-time-count', time);
    }
  }, [time, bestTime, isWon, isTimeStarted]);

  React.useEffect(() => {
    if (!isTimeStarted) {
      return;
    }
    const interval = setInterval(() => {
      setTime(t => t + 1);
    }, 100);
    return () => clearInterval(interval);
  }, [isTimeStarted]);

  React.useEffect(() => {
    if (!isCountdownStarted) {
      return;
    }
    if (countdownTime === 0) {
      setDice(() => initializeDice());
      setIsTimeStarted(true);
      setIsCountdownStarted(false);
    }
  }, [countdownTime, isCountdownStarted]);

  React.useEffect(() => {
    if (!isCountdownStarted) {
      return;
    }
    const interval = setInterval(() => {
      setCountdownTime(t => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCountdownStarted]);

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
    if (!isTimeStarted && !isCountdownStarted) {
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
    if (isCountdownStarted) {
      setIsCountdownStarted(false);
      setCountdownTime(0);
    }
    else if (isTimeStarted) {
      setIsTimeStarted(false);
    }
    else {
      setIsWon(false);
      setTime(0);
      setShowStartNewGameMsg(false);
      setCountdownTime(countdownDuration);
      setIsCountdownStarted(true);
    }
  }

  /*------------------------------------------*/
  const dieComponents = dice.map(die => {
    return <Die key={die.id} die={die} isEnabled={isTimeStarted} holdDie={() => holdDie(die.id)} />
  });

  let diceOverLayClass = 'dice-overlay';
  if (isWon || !isTimeStarted) {
    diceOverLayClass += ' visible-overlay';
  }
  if (isCountdownStarted) {
    diceOverLayClass += ' huge-overlay-text';
  }

  let diceOverLayText;
  if (isWon) {
    diceOverLayText = 'You won!';
  }
  else if (isCountdownStarted) {
    diceOverLayText = countdownTime;
  }
  else {
    diceOverLayText = '';
  }
  
  const gameButtonText = (isCountdownStarted || isTimeStarted) ? 'Stop' : 'New game';

  return (
    <>
      <main>
        {isWon && <ResponsiveConfetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Click each die to freeze it at its current value between rolls. Game is won when all dice are frozen and have the same value.</p>
        <button className="button new-game-button" onClick={toggleGame} aria-live="polite">{gameButtonText}</button>
        <div className="times-container">
          <TimeContainer text="Time" time={time} />
          <TimeContainer text="Best" time={bestTime} />
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
