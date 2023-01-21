"use strict";
const log = console.log;
// Gameboard object filled with html elements and related
// to be manipulated by other modules
const Gameboard = (() => {

  const board = document.createElement('div');
  board.setAttribute('class', 'game-container');

  const square = (id) => {
    const square = document.createElement('div')
    square.setAttribute('class', 'board-boxes');
    square.setAttribute('id', id);
    return square;
  }

  const boardArray = (() => {
    const arr = [];
    let letter = '';
    for(let i = 0; i < 9; i++) {
      if (i < 3) letter = 'a';
      if (i < 6 && i > 2) letter = 'b';
      if (i < 9 && i > 5) letter = 'c';

      const elementId = `square--${letter}-${i + 1}`;

      arr.push(square(elementId));
    }
    return arr;
  })();

  return {
    boardArray,
    board
  }
})();

// Module for displaying elements on screen
const displayController = (() => {
  const main = document.querySelector('.main-container');

  const draw = (surface, obj) => {
    return surface.append(obj);
  }

  const displayBoard = ((arr) => {
    arr = Gameboard.boardArray;
    draw(main, Gameboard.board);

    for(let i = 0; i < arr.length; i++) {
      draw(Gameboard.board, arr[i]);
    }
  })();

  return {
    draw
  }
})();
