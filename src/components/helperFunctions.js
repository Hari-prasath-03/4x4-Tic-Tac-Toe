export const isWinner = (id, gameboard, currPlayer) => {
  let board = [...gameboard];
  board[id] = currPlayer;
  const winLines = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ];
  for (let i = 0; i < winLines.length; i++) {
    const [c1, c2, c3, c4] = winLines[i];

    if (
      board[c1] > 0 &&
      board[c1] === board[c2] &&
      board[c2] === board[c3] &&
      board[c3] === board[c4]
    )
      return true;
  }
  return false;
};

export const randomAIMove = (gameBoard) => {
  const availableSpots = gameBoard.reduce((acc, cell, index) => {
    if (cell === 0) acc.push(index);
    return acc;
  }, []);

  if (availableSpots.length === 0) return -1;

  const randomIndex = Math.floor(Math.random() * availableSpots.length);
  return availableSpots[randomIndex];
};

const evaluateBoard = (gameBoard, player) => {
  const winLines = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ];

  for (let i = 0; i < winLines.length; i++) {
    const [c1, c2, c3, c4] = winLines[i];
    if (
      gameBoard[c1] === player &&
      gameBoard[c1] === gameBoard[c2] &&
      gameBoard[c2] === gameBoard[c3] &&
      gameBoard[c3] === gameBoard[c4]
    ) {
      return player === 1 ? 10 : -10;
    }
  }
  return 0;
};

const minimax = (gameBoard, depth, isMaximizing, alpha, beta) => {
  const score = evaluateBoard(gameBoard, 1);
  const opponentScore = evaluateBoard(gameBoard, 2);

  if (score === 10) return score - depth;
  if (opponentScore === -10) return opponentScore + depth;
  if (!gameBoard.includes(0)) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i] === 0) {
        gameBoard[i] = 1;
        best = Math.max(
          best,
          minimax(gameBoard, depth + 1, false, alpha, beta)
        );
        gameBoard[i] = 0;
        alpha = Math.max(alpha, best);
        if (beta <= alpha) break;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i] === 0) {
        gameBoard[i] = 2;
        best = Math.min(best, minimax(gameBoard, depth + 1, true, alpha, beta));
        gameBoard[i] = 0;
        beta = Math.min(beta, best);
        if (beta <= alpha) break;
      }
    }
    return best;
  }
};

export const getAIMove = (gameBoard) => {
  let bestVal = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === 0) {
      gameBoard[i] = 1;
      let moveVal = minimax(gameBoard, 0, false, -Infinity, Infinity);
      gameBoard[i] = 0;

      if (moveVal > bestVal) {
        bestMove = i;
        bestVal = moveVal;
      }
    }
  }

  return bestMove;
};
