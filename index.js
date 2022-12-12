/********************************************************************/
// ELEMENTS AND VARIABLES

'use strict';

const headText = document.querySelector('.nav__heading');
const backOption = document.querySelector('.nav__back');
const resetOption = document.querySelector('.nav__reset');
const optionBox = document.querySelector('.mode');
const singlePlayerButton = document.querySelector('.mode__single-player');
const multiPlayerButton = document.querySelector('.mode__multi-player');

const board = document.querySelector('.board');
const boards = document.querySelectorAll('.board__board');
const board0 = document.querySelector('.board__board--1');
const board1 = document.querySelector('.board__board--2');
const board2 = document.querySelector('.board__board--3');
const board3 = document.querySelector('.board__board--4');
const board4 = document.querySelector('.board__board--5');
const board5 = document.querySelector('.board__board--6');
const board6 = document.querySelector('.board__board--7');
const board7 = document.querySelector('.board__board--8');
const board8 = document.querySelector('.board__board--9');

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
let gameMode = false;

/********************************************************************/
// UTILITY FUNCTIONS

// Display contents.
const showContent = function () {
  board.classList.toggle('u-display-hide');
  backOption.classList.toggle('u-display-hide');
  resetOption.classList.toggle('u-display-hide');
  optionBox.classList.toggle('u-display-hide');
  headText.classList.toggle('u-display-hide');
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
  setTimeout(function () {
    boards.forEach((box, index) => {
      box.style.color = blackColor;
      box.textContent = index + 1;
    });
    player1.textContent = playerOneScore;
    player2.textContent = playerTwoScore;
    isGameOver = false;
  }, 400);
};

// Check if random number is valid.
const checkRandomNumber = function (randomNumber) {
  boards.forEach((box, index) => {
    if (
      (box.textContent === 'o' || box.textContent === 'x') &&
      index === randomNumber
    )
      return 0;
    else return 1;
  });
};

// Check the position.
const checkPosition = function (boxOne, boxTwo, index) {
  if (
    playedBoxes[index] &&
    boxOne.textContent === 'x' &&
    boxTwo.textContent != 'x' &&
    boxTwo.textContent != 'o'
  )
    return 1;
  else return 0;
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
    board0.style.color = board1.style.color = board2.style.color = winColor;
    resetGame(1);
  } else if (
    board3.textContent === board4.textContent &&
    board3.textContent === board5.textContent &&
    !isGameOver
  ) {
    board3.style.color = board4.style.color = board5.style.color = winColor;
    resetGame(1);
  } else if (
    board6.textContent === board7.textContent &&
    board6.textContent === board8.textContent &&
    !isGameOver
  ) {
    board6.style.color = board7.style.color = board8.style.color = winColor;
    resetGame(1);
  } else if (
    board0.textContent === board3.textContent &&
    board0.textContent === board6.textContent &&
    !isGameOver
  ) {
    board0.style.color = board3.style.color = board6.style.color = winColor;
    resetGame(1);
  } else if (
    board1.textContent === board4.textContent &&
    board1.textContent === board7.textContent &&
    !isGameOver
  ) {
    board1.style.color = board4.style.color = board7.style.color = winColor;
    resetGame(1);
  } else if (
    board2.textContent === board5.textContent &&
    board2.textContent === board8.textContent &&
    !isGameOver
  ) {
    board2.style.color = board5.style.color = board8.style.color = winColor;
    resetGame(1);
  } else if (
    board0.textContent === board4.textContent &&
    board0.textContent === board8.textContent &&
    !isGameOver
  ) {
    board0.style.color = board4.style.color = board8.style.color = winColor;
    resetGame(1);
  } else if (
    board2.textContent === board4.textContent &&
    board2.textContent === board6.textContent &&
    !isGameOver
  ) {
    board2.style.color = board4.style.color = board6.style.color = winColor;
    resetGame(1);
  } else if (gamePlayedFor === 9) {
    resetGame(0);
  }
};

// Play game common to both modes.
const playGame = function (box, index) {
  box.style.color = boardColor;
  box.textContent = activePlayer === 0 ? 'x' : 'o';
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  playedBoxes[index] = 1;
  gamePlayedFor += 1;
  gameOver();
};

// Generate random number between 0 to 8.
const randInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;

const playComp = function (positionPlayed) {
  if (positionPlayed === 0) {
    if (checkPosition(board1, board2, 1)) {
      // The position played 0 and 1
      // The position to be played 2
      playGame(board2, 2);
    } else if (checkPosition(board2, board1, 2)) {
      // The position played 0 and 2
      // The position to be played 1
      playGame(board1, 1);
    } else if (checkPosition(board3, board6, 3)) {
      // The position played 0 and 3
      // The position to be played 6
      playGame(board6, 6);
    } else if (checkPosition(board4, board8, 4)) {
      // The position played 0 and 4
      // The position to be played 8
      playGame(board8, 8);
    } else if (checkPosition(board6, board3, 6)) {
      // The position played 0 and 6
      // The position to be played 3
      playGame(board8, 8);
    } else if (checkPosition(board8, board4, 8)) {
      // The position played 0 and 8
      // The position to be played 4
      playGame(board4, 4);
    } else {
      playRandom(positionPlayed);
    }
  } else if (positionPlayed === 1) {
    if (checkPosition(board0, board2, 0)) {
      // The position played 1 and 0
      // The position to be played 2
      playGame(board2, 2);
    } else if (checkPosition(board2, board0, 2)) {
      // The position played 1 and 2
      // The position to be played 0
      playGame(board0, 0);
    } else if (checkPosition(board4, board7, 4)) {
      // The position played 1 and 4
      // The position to be played 7
      playGame(board7, 7);
    } else if (checkPosition(board7, board4, 7)) {
      // The position played 1 and 7
      // The position to be played 4
      playGame(board4, 4);
    } else {
      playRandom(positionPlayed);
    }
  } else if (positionPlayed === 2) {
    if (checkPosition(board0, board1, 0)) {
      // The position played 2 and 0
      // The position to be played 1
      playGame(board1, 1);
    } else if (checkPosition(board1, board0, 1)) {
      // The position played 2 and 1
      // The position to be played 0
      playGame(board0, 0);
    } else if (checkPosition(board4, board6, 4)) {
      // The position played 2 and 4
      // The position to be played 6
      playGame(board6, 6);
    } else if (checkPosition(board5, board8, 5)) {
      // The position played 2 and 5
      // The position to be played 8
      playGame(board8, 8);
    } else if (checkPosition(board6, board4, 6)) {
      // The position played 1 and 6
      // The position to be played 4
      playGame(board4, 4);
    } else if (checkPosition(board8, board5, 8)) {
      // The position played 2 and 8
      // The position to be played 5
      playGame(board5, 5);
    } else {
      playRandom(positionPlayed);
    }
  } else if (positionPlayed === 3) {
    if (checkPosition(board0, board6, 0)) {
      // The position played 3 and 0
      // The position to be played 6
      playGame(board6, 6);
    } else if (checkPosition(board4, board5, 4)) {
      // The position played 3 and 4
      // The position to be played 5
      playGame(board5, 5);
    } else if (checkPosition(board5, board4, 5)) {
      // The position played 3 and 5
      // The position to be played 4
      playGame(board5, 4);
    } else if (checkPosition(board6, board0, 6)) {
      // The position played 3 and 6
      // The position to be played 0
      playGame(board0, 0);
    } else {
      playRandom(positionPlayed);
    }
  } else if (positionPlayed === 4) {
    if (checkPosition(board0, board8, 0)) {
      // The position played 4 and 0
      // The position to be played 8
      playGame(board8, 8);
    } else if (checkPosition(board1, board7, 1)) {
      // The position played 4 and 1
      // The position to be played 7
      playGame(board7, 7);
    } else if (checkPosition(board2, board6, 2)) {
      // The position played 4 and 2
      // The position to be played 6
      playGame(board6, 6);
    } else if (checkPosition(board3, board5, 3)) {
      // The position played 4 and 3
      // The position to be played 5
      playGame(board5, 5);
    } else if (checkPosition(board5, board3, 5)) {
      // The position played 4 and 5
      // The position to be played 3
      playGame(board3, 3);
    } else if (checkPosition(board6, board2, 6)) {
      // The position played 4 and 6
      // The position to be played 2
      playGame(board2, 2);
    } else if (checkPosition(board7, board1, 7)) {
      // The position played 4 and 7
      // The position to be played 1
      playGame(board1, 1);
    } else if (checkPosition(board8, board0, 8)) {
      // The position played 4 and 8
      // The position to be played 0
      playGame(board0, 0);
    } else {
      playRandom(positionPlayed);
    }
  } else if (positionPlayed === 5) {
    if (checkPosition(board2, board8, 2)) {
      // The position played 5 and 2
      // The position to be played 8
      playGame(board8, 8);
    } else if (checkPosition(board3, board4, 3)) {
      // The position played 5 and 3
      // The position to be played 4
      playGame(board4, 4);
    } else if (checkPosition(board4, board3, 4)) {
      // The position played 5 and 4
      // The position to be played 3
      playGame(board3, 3);
    } else if (checkPosition(board8, board2, 8)) {
      // The position played 5 and 8
      // The position to be played 2
      playGame(board3, 2);
    } else {
      playRandom(positionPlayed);
    }
  } else if (positionPlayed === 6) {
    if (checkPosition(board0, board3, 0)) {
      // The position played 6 and 0
      // The position to be played 3
      playGame(board3, 3);
    } else if (checkPosition(board2, board4, 2)) {
      // The position played 6 and 2
      // The position to be played 4
      playGame(board4, 4);
    } else if (checkPosition(board3, board0, 3)) {
      // The position played 6 and 3
      // The position to be played 0
      playGame(board0, 0);
    } else if (checkPosition(board4, board2, 4)) {
      // The position played 6 and 4
      // The position to be played 2
      playGame(board2, 2);
    } else if (checkPosition(board7, board8, 7)) {
      // The position played 6 and 7
      // The position to be played 8
      playGame(board8, 8);
    } else if (checkPosition(board8, board7, 8)) {
      // The position played 6 and 8
      // The position to be played 7
      playGame(board7, 7);
    } else {
      playRandom(positionPlayed);
    }
  } else if (positionPlayed === 7) {
    if (checkPosition(board1, board4, 1)) {
      // The position played 7 and 1
      // The position to be played 4
      playGame(board4, 4);
    } else if (checkPosition(board4, board1, 4)) {
      // The position played 7 and 4
      // The position to be played 1
      playGame(board1, 1);
    } else if (checkPosition(board6, board8, 6)) {
      // The position played 7 and 6
      // The position to be played 8
      playGame(board8, 8);
    } else if (checkPosition(board8, board6, 8)) {
      // The position played 7 and 8
      // The position to be played 6
      playGame(board6, 6);
    } else {
      playRandom(positionPlayed);
    }
  } else if (positionPlayed === 8) {
    if (checkPosition(board0, board4, 0)) {
      // The position played 8 and 0
      // The position to be played 4
      playGame(board4, 4);
    } else if (checkPosition(board2, board5, 2)) {
      // The position played 8 and 2
      // The position to be played 5
      playGame(board5, 5);
    } else if (checkPosition(board4, board0, 4)) {
      // The position played 8 and 4
      // The position to be played 0
      playGame(board0, 0);
    } else if (checkPosition(board5, board2, 5)) {
      // The position played 8 and 5
      // The position to be played 2
      playGame(board2, 2);
    } else if (checkPosition(board6, board7, 6)) {
      // The position played 8 and 6
      // The position to be played 7
      playGame(board7, 7);
    } else if (checkPosition(board7, board6, 7)) {
      // The position played 8 and 7
      // The position to be played 6
      playGame(board6, 6);
    } else {
      playRandom(positionPlayed);
    }
  }
};

/********************************************************************/
// SINGLE-PLAYER MODE

// Function to operate single-player mode.
const singlePlayerMode = function () {
  showContent();
  gameMode = false;
  boards.forEach((box, index) => {
    box.addEventListener('click', function () {
      if (!playedBoxes[index] && !isGameOver && !gameMode) {
        playGame(box, index);
        if (!isGameOver)
          setTimeout(function () {
            playComp(index);
          }, 200);
      }
    });
  });
};

// If no position is possible for computer.
const playRandom = function (positionPlayed) {
  let randomNumber = randInt(0, 8);
  while (
    randomNumber === positionPlayed ||
    playedBoxes[randomNumber] === 1 ||
    checkRandomNumber()
  )
    randomNumber = randInt(0, 8);
  boards.forEach((box, index) => {
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
  boards.forEach((box, index) => {
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
