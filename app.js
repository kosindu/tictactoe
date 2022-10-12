'use strict';

const playground = document.getElementById('playground');
const cellElements = document.querySelectorAll('[data-cell]');
const winnerModal = document.querySelector('.winners-modal');
const winnerMessage = document.querySelector('[data-winners-message]');
const restartButton = document.getElementById('restart');
let crossTurn;
const crossClass = 'cross';
const circleClass = 'circle';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const handleClick = function (e) {
  const cell = e.target;
  const currentClass = crossTurn ? crossClass : circleClass;
  // Place mark
  placeMark(cell, currentClass);
  // Check for win
  if (checkWin(currentClass)) {
    endGame(false);
  }
  // Check for draw
  else if (isDraw()) {
    endGame(true);
  } else {
    // Switch turns
    swapTurns();
    setPlaygroundHoverClass();
  }
};

const placeMark = function (cell, currentClass) {
  cell.classList.add(currentClass);
};

const swapTurns = function () {
  crossTurn = !crossTurn;
};

const setPlaygroundHoverClass = function () {
  playground.classList.remove(crossClass);
  playground.classList.remove(circleClass);
  playground.classList.add(crossTurn ? crossClass : circleClass);
};

const checkWin = function (currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
};

const isDraw = function () {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(crossClass) ||
      cell.classList.contains(circleClass)
    );
  });
};

const endGame = function (draw) {
  if (draw) {
    winnerMessage.innerText = 'Match Drawn 👌';
  } else {
    winnerMessage.innerText = `${crossTurn ? 'Red' : 'Green'} Wins 🏆`;
  }
  winnerModal.classList.add('show');
};

const startGame = function () {
  winnerModal.classList.remove('show');
  crossTurn = true;
  cellElements.forEach((cell) => {
    cell.classList.remove(crossClass);
    cell.classList.remove(circleClass);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setPlaygroundHoverClass();
};

startGame();

restartButton.addEventListener('click', startGame);
