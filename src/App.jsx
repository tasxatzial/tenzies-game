import React from 'react';
import Confetti from 'react-confetti';
import Die from './components/Die.jsx';
import TimeCounters from './components/Time/TimeCounters.jsx';
import useCountdown from './hooks/useCountdown.js';
import useScreenSize from './hooks/useScreenSize.js';

export default function App() {
  const countdownDuration = 3;

  /*---------------- STATE ----------------*/
  const [dice, setDice] = React.useState(() => {
    return initializeDice();
  });
  const [isWon, setIsWon] = React.useState(false);
  const [isTimeStarted, setIsTimeStarted] = React.useState(false);

  /*---------------- CALLBACKS ----------------*/
  const holdDie = React.useCallback((id) => {
    if (!isTimeStarted) {
      return;
    }
    setDice(prevDice => prevDice.map(die =>
      die.id === id
        ? {...die, isHeld: !die.isHeld}
        : die
    ));
  }, [isTimeStarted]);

  /*---------------- HOOKS ----------------*/
  const {countdownTime, setCountdownTime, isCountdownStarted, setIsCountdownStarted} = useCountdown({countdownDuration, onCountdownEnd});
  const screenSize = useScreenSize();

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

  /*---------------- FUNCTIONS ----------------*/
  function onCountdownEnd() {
    setDice(initializeDice());
    setIsTimeStarted(true);
    setIsCountdownStarted(false);
  }

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

  function rollDice() {
    if (!isTimeStarted) {
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
      setCountdownTime(countdownDuration);
      setIsCountdownStarted(true);
    }
  }

  /*------------------------------------------*/

  const dieComponents = dice.map(die => {
    return <Die key={die.id} die={die} isEnabled={isTimeStarted} holdDie={holdDie} />
  });

  let diceOverLayClass = 'dice-overlay';
  if (isWon || !isTimeStarted) {
    diceOverLayClass += ' visible-overlay';
  }
  if (isCountdownStarted) {
    diceOverLayClass += ' huge-overlay-text';
  }

  let rollButtonClass = 'button roll-button';
  if (!isTimeStarted) {
    rollButtonClass += ' button-disabled roll-button-disabled';
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
  
  const newGameButtonText = (isCountdownStarted || isTimeStarted) ? 'Stop game' : 'New game';

  return (
    <>
      <main>
        {isWon && <Confetti width={screenSize.width} height={screenSize.height}/>}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Click each die to freeze it at its current value between rolls. Game is won when all dice are frozen and have the same value.</p>
        <button className="button new-game-button" onClick={toggleGame}>{newGameButtonText}</button>
        <TimeCounters isTimeStarted={isTimeStarted} isWon={isWon} isCountdownStarted={isCountdownStarted}/>
        <div className="dice-container">
          <div className={diceOverLayClass}>{diceOverLayText}</div>
          {dieComponents}
        </div>
        <button className={rollButtonClass} onClick={rollDice} disabled={!isTimeStarted}>Roll</button>
      </main>
      <footer>
        <p className="github-info"><a href="https://github.com/tasxatzial/tenzies-game" className="github-link">See the project on GitHub</a></p>
      </footer>
    </>
  )
}
