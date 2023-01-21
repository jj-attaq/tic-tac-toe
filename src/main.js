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
    square.textContent = id;
    return square;
  }

  const boardArray = (() => {
    const arr = [];
    let column = '';
    let row = '';

    for(let i = 0; i < 9; i++) {
      (() => {
        if (i < 3) row = '3';
        if (i < 6 && i > 2) row = '2';
        if (i < 9 && i > 5) row = '1';
      })();
      (() => {
        if (i === 0 || i === 3 || i === 6) column = 'a';
        if (i === 1 || i === 4 || i === 7) column = 'b';
        if (i === 2 || i === 5 || i === 8) column = 'c';
      })();

      const elementId = `square--${column}-${row}`;
      const columnClass = `col-${column}`;
      const rowClass = `row-${row}`;


      arr.push(square(elementId, columnClass, rowClass));
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
