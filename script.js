const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getField = (index) => {
    return board[index];
  };

  const setfield = (index, marker) => {
    board[index] = marker;
  };

  const clear = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
      console.log(board);
    }
  };

  return { getField, setfield, clear };
})();

const Player = (marker) => {
  const getMarker = () => {
    return marker;
  };

  return { getMarker };
};

const displayController = (() => {
  const fieldElements = document.querySelectorAll(".field");
  const messageElement = document.querySelector(".message");
  const restartButton = document.querySelector(".restart");

  fieldElements.forEach((field) => {
    field.addEventListener("click", (e) => {
      if (gameController.getGameOver() || e.target.textContent !== "") return;
      gameController.playRound(parseInt(e.target.dataset.index));
      updateGameboard();
    });
  });

  restartButton.addEventListener("click", () => {
    gameBoard.clear();
    gameController.reset();
    updateGameboard();
    setMessage("Turn: X");
  });

  const updateGameboard = () => {
    for (let i = 0; i < fieldElements.length; i++) {
      fieldElements[i].textContent = gameBoard.getField(i);
    }
  };

  const setMessage = (message) => {
    messageElement.textContent = message;
  };

  return { setMessage };
})();

const gameController = (() => {
  const player1 = Player("X");
  const player2 = Player("O");
  let round = 1;
  let gameOver = false;

  const playRound = (field) => {
    gameBoard.setfield(field, getCurrentPlayerMarker());
    if (checkForWin()) {
      displayController.setMessage(`Player ${getCurrentPlayerMarker()} wins!`);
      gameOver = true;
      return;
    }
    if (round === 9) {
      displayController.setMessage("It's a draw!");
      gameover = true;
      return;
    }
    round++;
    displayController.setMessage(`Turn: ${getCurrentPlayerMarker()}`);
  };

  const getCurrentPlayerMarker = () => {
    return round % 2 === 1 ? player1.getMarker() : player2.getMarker();
  };

  const getGameOver = () => {
    return gameOver;
  };

  const checkForWin = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions.some((condition) => {
      return condition.every((index) => {
        return gameBoard.getField(index) === getCurrentPlayerMarker();
      });
    });
  };

  const reset = () => {
    round = 1;
    gameOver = false;
  };

  return { playRound, getGameOver, reset };
})();
