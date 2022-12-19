/********************************************************************/
// ELEMENTS AND VARIABLES

'use strict';

const headText = document.querySelector('.nav__heading');
const backOption = document.querySelector('.nav__back');
const resetOption = document.querySelector('.nav__reset');
const symbolsNav = document.querySelector('.nav__symbol-btn');
const symbols = document.querySelector('.symbol');
const allSymbol = document.querySelectorAll('.symbol__box');
const symbolOnes = document.querySelectorAll('.symbol__text--1');
const symbolTwos = document.querySelectorAll('.symbol__text--2');

const optionBox = document.querySelector('.mode');
const singlePlayerButton = document.querySelector('.mode__single-player');
const multiPlayerButton = document.querySelector('.mode__multi-player');

const board = document.querySelector('.board');
const boards = document.querySelectorAll('.board__board');
const board0 = document.querySelector('.board__text--1');
const board1 = document.querySelector('.board__text--2');
const board2 = document.querySelector('.board__text--3');
const board3 = document.querySelector('.board__text--4');
const board4 = document.querySelector('.board__text--5');
const board5 = document.querySelector('.board__text--6');
const board6 = document.querySelector('.board__text--7');
const board7 = document.querySelector('.board__text--8');
const board8 = document.querySelector('.board__text--9');

const boardText = document.querySelectorAll('.board__text');
const player1 = document.querySelector('.score__score--1');
const player2 = document.querySelector('.score__score--2');

let playedBoxes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let playerOneScore = 0;
let playerTwoScore = 0;
let gamePlayedFor = 0;
let activePlayer = 0;
let winColor = '#a9e34b';
let boardColor = '#fff';
let blackColor = '#000';
let isGameOver = false;
let singlePlayerOver = true;
let gameMode = false;

let playerOne = 'x';
let playerTwo = 'o';

/********************************************************************/
// UTILITY FUNCTIONS

// Display contents.
const showContent = function () {
  board.classList.toggle('u-display-hide');
  backOption.classList.toggle('u-display-hide');
  resetOption.classList.toggle('u-display-hide');
  optionBox.classList.toggle('u-display-hide');
  headText.classList.toggle('u-display-hide');
  symbolsNav.classList.toggle('u-display-hide');
};

// Reset game conditions.
const resetGame = function (allConditions) {
  if (allConditions) {
    isGameOver = true;
    activePlayer === 0 ? (playerTwoScore += 1) : (playerOneScore += 1);
  }

  playedBoxes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  activePlayer = 0;
  gamePlayedFor = 0;
  singlePlayerOver = true;
  setTimeout(function () {
    boardText.forEach((textElement, index) => {
      textElement.style.color = blackColor;
      textElement.textContent = index + 1;
    });
    player1.textContent = playerOneScore;
    player2.textContent = playerTwoScore;
    isGameOver = false;
  }, 400);
};

const checkPosition = function (boxOne, index) {
  if (!playedBoxes[index] && boxOne.textContent === playerOne) return 1;
  return 0;
};

symbolsNav.addEventListener('click', function () {
  symbols.classList.toggle('u-display-hide');
});

allSymbol.forEach((el, index) => {
  el.addEventListener('click', function () {
    playerOne = symbolOnes[index].textContent;
    playerTwo = symbolTwos[index].textContent;
    symbols.classList.toggle('u-display-hide');
  });
});

const setWinColor = function (board) {
  board.forEach(box => (box.style.color = winColor));
};

/********************************************************************/
// GAME MECHANICS

// Check if game is over or not.
const gameOver = function () {
  if (
    board0.textContent === board1.textContent &&
    board0.textContent === board2.textContent &&
    !isGameOver
  ) {
    setWinColor([board0, board1, board2]);
    resetGame(1);
  } else if (
    board3.textContent === board4.textContent &&
    board3.textContent === board5.textContent &&
    !isGameOver
  ) {
    setWinColor([board3, board4, board5]);
    resetGame(1);
  } else if (
    board6.textContent === board7.textContent &&
    board6.textContent === board8.textContent &&
    !isGameOver
  ) {
    setWinColor([board6, board7, board8]);
    resetGame(1);
  } else if (
    board0.textContent === board3.textContent &&
    board0.textContent === board6.textContent &&
    !isGameOver
  ) {
    setWinColor([board0, board3, board6]);
    resetGame(1);
  } else if (
    board1.textContent === board4.textContent &&
    board1.textContent === board7.textContent &&
    !isGameOver
  ) {
    setWinColor([board1, board4, board7]);
    resetGame(1);
  } else if (
    board2.textContent === board5.textContent &&
    board2.textContent === board8.textContent &&
    !isGameOver
  ) {
    setWinColor([board2, board5, board8]);
    resetGame(1);
  } else if (
    board0.textContent === board4.textContent &&
    board0.textContent === board8.textContent &&
    !isGameOver
  ) {
    setWinColor([board0, board4, board8]);
    resetGame(1);
  } else if (
    board2.textContent === board4.textContent &&
    board2.textContent === board6.textContent &&
    !isGameOver
  ) {
    setWinColor([board2, board4, board6]);
    resetGame(1);
  } else if (gamePlayedFor === 9) {
    resetGame(0);
  }
};

// Play game common to both modes.
const playGame = function (box, index) {
  box.style.color = boardColor;
  box.textContent = activePlayer === 0 ? playerOne : playerTwo;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  playedBoxes[index] = 1;
  gamePlayedFor += 1;
  gameOver();
};

// Generate random number between 0 to 8.
const randInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;

const playComp = function (positionPlayed) {
  if (positionPlayed === 0 && !isGameOver) {
    if (checkPosition(board1, 2)) {
      // The position played 0 and 1
      // The position to be played 2
      playGame(board2, 2);
    } else if (checkPosition(board2, 1)) {
      // The position played 0 and 2
      // The position to be played 1
      playGame(board1, 1);
    } else if (checkPosition(board3, 6)) {
      // The position played 0 and 3
      // The position to be played 6
      playGame(board6, 6);
    } else if (checkPosition(board4, 8)) {
      // The position played 0 and 4
      // The position to be played 8
      playGame(board8, 8);
    } else if (checkPosition(board6, 8)) {
      // The position played 0 and 6
      // The position to be played 3
      playGame(board8, 8);
    } else if (checkPosition(board8, 4)) {
      // The position played 0 and 8
      // The position to be played 4
      playGame(board4, 4);
    } else {
      playRandom();
    }
  } else if (positionPlayed === 1 && !isGameOver) {
    if (checkPosition(board0, 2)) {
      // The position played 1 and 0
      // The position to be played 2
      playGame(board2, 2);
    } else if (checkPosition(board2, 0)) {
      // The position played 1 and 2
      // The position to be played 0
      playGame(board0, 0);
    } else if (checkPosition(board4, 7)) {
      // The position played 1 and 4
      // The position to be played 7
      playGame(board7, 7);
    } else if (checkPosition(board7, 4)) {
      // The position played 1 and 7
      // The position to be played 4
      playGame(board4, 4);
    } else {
      playRandom();
    }
  } else if (positionPlayed === 2 && !isGameOver) {
    if (checkPosition(board0, 1)) {
      // The position played 2 and 0
      // The position to be played 1
      playGame(board1, 1);
    } else if (checkPosition(board1, 0)) {
      // The position played 2 and 1
      // The position to be played 0
      playGame(board0, 0);
    } else if (checkPosition(board4, 6)) {
      // The position played 2 and 4
      // The position to be played 6
      playGame(board6, 6);
    } else if (checkPosition(board5, 8)) {
      // The position played 2 and 5
      // The position to be played 8
      playGame(board8, 8);
    } else if (checkPosition(board6, 4)) {
      // The position played 1 and 6
      // The position to be played 4
      playGame(board4, 4);
    } else if (checkPosition(board8, 5)) {
      // The position played 2 and 8
      // The position to be played 5
      playGame(board5, 5);
    } else {
      playRandom();
    }
  } else if (positionPlayed === 3 && !isGameOver) {
    if (checkPosition(board0, 6)) {
      // The position played 3 and 0
      // The position to be played 6
      playGame(board6, 6);
    } else if (checkPosition(board4, 5)) {
      // The position played 3 and 4
      // The position to be played 5
      playGame(board5, 5);
    } else if (checkPosition(board5, 4)) {
      // The position played 3 and 5
      // The position to be played 4
      playGame(board5, 4);
    } else if (checkPosition(board6, 0)) {
      // The position played 3 and 6
      // The position to be played 0
      playGame(board0, 0);
    } else {
      playRandom();
    }
  } else if (positionPlayed === 4 && !isGameOver) {
    if (checkPosition(board0, 8)) {
      // The position played 4 and 0
      // The position to be played 8
      playGame(board8, 8);
    } else if (checkPosition(board1, 7)) {
      // The position played 4 and 1
      // The position to be played 7
      playGame(board7, 7);
    } else if (checkPosition(board2, 6)) {
      // The position played 4 and 2
      // The position to be played 6
      playGame(board6, 6);
    } else if (checkPosition(board3, 5)) {
      // The position played 4 and 3
      // The position to be played 5
      playGame(board5, 5);
    } else if (checkPosition(board5, 3)) {
      // The position played 4 and 5
      // The position to be played 3
      playGame(board3, 3);
    } else if (checkPosition(board6, 2)) {
      // The position played 4 and 6
      // The position to be played 2
      playGame(board2, 2);
    } else if (checkPosition(board7, 1)) {
      // The position played 4 and 7
      // The position to be played 1
      playGame(board1, 1);
    } else if (checkPosition(board8, 0)) {
      // The position played 4 and 8
      // The position to be played 0
      playGame(board0, 0);
    } else {
      playRandom();
    }
  } else if (positionPlayed === 5 && !isGameOver) {
    if (checkPosition(board2, 8)) {
      // The position played 5 and 2
      // The position to be played 8
      playGame(board8, 8);
    } else if (checkPosition(board3, 4)) {
      // The position played 5 and 3
      // The position to be played 4
      playGame(board4, 4);
    } else if (checkPosition(board4, 3)) {
      // The position played 5 and 4
      // The position to be played 3
      playGame(board3, 3);
    } else if (checkPosition(board8, 2)) {
      // The position played 5 and 8
      // The position to be played 2
      playGame(board2, 2);
    } else {
      playRandom();
    }
  } else if (positionPlayed === 6 && !isGameOver) {
    if (checkPosition(board0, 3)) {
      // The position played 6 and 0
      // The position to be played 3
      playGame(board3, 3);
    } else if (checkPosition(board2, 4)) {
      // The position played 6 and 2
      // The position to be played 4
      playGame(board4, 4);
    } else if (checkPosition(board3, 0)) {
      // The position played 6 and 3
      // The position to be played 0
      playGame(board0, 0);
    } else if (checkPosition(board4, 2)) {
      // The position played 6 and 4
      // The position to be played 2
      playGame(board2, 2);
    } else if (checkPosition(board7, 8)) {
      // The position played 6 and 7
      // The position to be played 8
      playGame(board8, 8);
    } else if (checkPosition(board8, 7)) {
      // The position played 6 and 8
      // The position to be played 7
      playGame(board7, 7);
    } else {
      playRandom();
    }
  } else if (positionPlayed === 7 && !isGameOver) {
    if (checkPosition(board1, 4)) {
      // The position played 7 and 1
      // The position to be played 4
      playGame(board4, 4);
    } else if (checkPosition(board4, 1)) {
      // The position played 7 and 4
      // The position to be played 1
      playGame(board1, 1);
    } else if (checkPosition(board6, 8)) {
      // The position played 7 and 6
      // The position to be played 8
      playGame(board8, 8);
    } else if (checkPosition(board8, 6)) {
      // The position played 7 and 8
      // The position to be played 6
      playGame(board6, 6);
    } else {
      playRandom();
    }
  } else if (positionPlayed === 8 && !isGameOver) {
    if (checkPosition(board0, 4)) {
      // The position played 8 and 0
      // The position to be played 4
      playGame(board4, 4);
    } else if (checkPosition(board2, 5)) {
      // The position played 8 and 2
      // The position to be played 5
      playGame(board5, 5);
    } else if (checkPosition(board4, 0)) {
      // The position played 8 and 4
      // The position to be played 0
      playGame(board0, 0);
    } else if (checkPosition(board5, 2)) {
      // The position played 8 and 5
      // The position to be played 2
      playGame(board2, 2);
    } else if (checkPosition(board6, 7)) {
      // The position played 8 and 6
      // The position to be played 7
      playGame(board7, 7);
    } else if (checkPosition(board7, 6)) {
      // The position played 8 and 7
      // The position to be played 6
      playGame(board6, 6);
    } else {
      playRandom();
    }
  }
};

/********************************************************************/
// SINGLE-PLAYER MODE

// Function to operate single-player mode.
const singlePlayerMode = function () {
  showContent();
  gameMode = false;
  boardText.forEach((box, index) => {
    box.addEventListener('click', function () {
      if (!playedBoxes[index] && !isGameOver && !gameMode) {
        if (gamePlayedFor === 0) singlePlayerOver = false;
        playGame(box, index);
        if (!singlePlayerOver) playComp(index);
      }
    });
  });
};

// If no position is possible for computer.
const playRandom = function () {
  let randomNumber = randInt(0, 8);
  while (playedBoxes[randomNumber] === 1) randomNumber = randInt(0, 8);
  boardText.forEach((box, index) => {
    if (randomNumber === index) playGame(box, index);
  });
};

// Single player button - listen to event.
singlePlayerButton.addEventListener('click', singlePlayerMode);

/********************************************************************/
// MULTI-PLAYER MODE

// Function to operate multi-player mode.
const multiPlayerMode = function () {
  showContent();
  gameMode = true;
  boardText.forEach((box, index) => {
    box.addEventListener('click', function () {
      if (!playedBoxes[index] && !isGameOver && gameMode) playGame(box, index);
    });
  });
};

// Multi player button - listen to event.
multiPlayerButton.addEventListener('click', multiPlayerMode);

/********************************************************************/
// NAVIGATION BAR

// Go Back - option.
backOption.addEventListener('click', function (e) {
  e.preventDefault();
  showContent();
  playerOneScore = 0;
  playerTwoScore = 0;
  resetGame(0);
});

// Reset - option.
resetOption.addEventListener('click', function (e) {
  e.preventDefault();
  playerOneScore = 0;
  playerTwoScore = 0;
  resetGame(0);
});

/********************************************************************/
