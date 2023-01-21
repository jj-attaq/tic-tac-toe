"use strict";
const log = console.log;
// Gameboard object filled with html elements and related
// to be manipulated by other modules
const Gameboard = (() => {
  const board = document.createElement('div');
  board.setAttribute('class', 'game-container');

  const square = (id, col, row) => {
    const square = document.createElement('div')
    square.classList.add('board-boxes', col, row);
    square.setAttribute('id', id);
    square.textContent = id; // delete later

    return square;
  }

  const boardArray = (() => {
    const arr = [];
    let column = '';
    let row = '';

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (j === 0) column = 'a';
        if (j === 1) column = 'b';
        if (j === 2) column = 'c';

        if (i === 0) row = '3';
        if (i === 1) row = '2';
        if (i === 2) row = '1';

        const elementId = `square--${column}-${row}`;
        const columnClass = `col-${column}`;
        const rowClass = `row-${row}`;

        arr.push(square(elementId, columnClass, rowClass));
      }
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
