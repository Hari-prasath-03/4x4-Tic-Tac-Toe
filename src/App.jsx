/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  isWinner,
  getAIMove,
  randomAIMove,
} from "./components/helperFunctions";
import GameCircle from "./components/GameCircle";
import Confetti from "react-confetti";
import ToastMsg from "./components/ToastMsg";
import "./App.css";

function App() {
  const [gameBoard, setGameBoard] = useState(Array(16).fill(0));
  const [currPlayer, setCurrPlayer] = useState(true);
  const [isFirstMove, setIsFirstMove] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [aiMode, setAIMode] = useState(false);
  const [wait_2sec, setWait_2sec] = useState(false);
  const [isAIFirstMove, setIsAIFirstMove] = useState(true);
  const [count, setCount] = useState(1);

  useEffect(() => {
    let timeout;
    if (aiMode && !currPlayer && !isFirstMove && !winner && !isDraw) {
      setWait_2sec(true);
      timeout = setTimeout(() => {
        const aiMove = isAIFirstMove
          ? randomAIMove(gameBoard)
          : getAIMove(gameBoard);
        if (aiMove !== -1) {
          circleClicked(aiMove);
          setCount((c) => c - 1);
          setWait_2sec(false);
          count === 0 ? setIsAIFirstMove(false) : null;
        }
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [currPlayer, isFirstMove, winner, isDraw, gameBoard]);

  const circleClicked = (id) => {
    if (gameBoard[id] !== 0 || winner || wait_2sec) return;

    setIsFirstMove(false);

    const newGameBoard = [...gameBoard];
    newGameBoard[id] = currPlayer ? 1 : 2;

    if (isWinner(id, newGameBoard, currPlayer ? 1 : 2))
      setWinner(currPlayer ? 1 : 2);
    else if (newGameBoard.every((cell) => cell !== 0)) setIsDraw(true);

    setGameBoard(newGameBoard);
    setCurrPlayer(!currPlayer);

    console.log(gameBoard);
  };

  const restart = () => {
    setGameBoard(Array(16).fill(0));
    setCurrPlayer(true);
    setIsFirstMove(true);
    setWinner(null);
    setIsDraw(false);
    setAIMode(false);
    setIsAIFirstMove(true);
    setCount(1);
  };

  const initilizeBoard = (count) => {
    const circles = [];

    for (let i = 0; i < count; i++) {
      circles.push(renderCircle(i));
    }
    return circles;
  };

  const renderCircle = (id) => {
    return (
      <GameCircle
        key={id}
        id={id}
        className={`player_${gameBoard[id]}`}
        onCircleClicked={circleClicked}
      ></GameCircle>
    );
  };

  const startAIGame = () => {
    setAIMode(true);
    if (isFirstMove && !currPlayer) {
      const aiMove = getAIMove(gameBoard);
      if (aiMove !== -1) {
        circleClicked(aiMove);
      }
    }
  };

  return (
    <>
      <div className={`game-page ${aiMode ? `aimode` : ``}`}>
        {winner && <Confetti />}
        <div></div>
        <div className="game-board">
          <div className="game-title">
            <h2>
              {winner
                ? aiMode
                  ? winner === 1
                    ? "You Win"
                    : "I Win"
                  : `Player ${winner} wins`
                : isDraw
                ? "Match Tie"
                : isFirstMove
                ? aiMode
                  ? "Let's Start with you"
                  : "Let's Start"
                : currPlayer
                ? aiMode
                  ? "Your move"
                  : "Player1's Turn"
                : aiMode
                ? "Wait now I'm"
                : "Player2's Turn"}
            </h2>
          </div>
          {initilizeBoard(16)}
        </div>
        <div className="buttons">
          <button onClick={restart}>New Game</button>
          <ToastMsg startAIGame={startAIGame} restart={restart} />
        </div>
      </div>
      <footer>
        <p>
          Developed by <span>Hari prasath K</span>
        </p>
      </footer>
    </>
  );
}

export default App;
