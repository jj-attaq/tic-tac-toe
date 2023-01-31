"use strict";
const log = console.log;


const Players = (() => {
  const playerFactory = (name, symbol) => {
    return {name, symbol}
  }
  const player1 = playerFactory('player1', 'X');
  const player2 = playerFactory('player2', 'O');
  return {
    player1,
    player2
  }
})();

const Gameflow = (() => {
  let turn = 1;

  const counter = (() => {
    const bla = () => {
      return turn++;
    }
    return {
      turn,
      bla
    }
  })();

  //can only be called once, otherwise counter() will mess with game flow
  //called in displayController.displaySymbol()
  const currentPlayer = () => { 
    if (counter.bla() % 2 === 0) {
      return Players.player2
    } else {
      return Players.player1
    }
  }
//TODO: 
  const winCondition = () => {
    // 8 possible ways to win per player
    // use array coordinates to brute force all 8
    const board = Gameboard.boardArray;
  //TODO: player should account for player1.symbol and player2.symbol
    const player = Players.player1.symbol;
    if(board[0][0].textContent && board[0][1].textContent && board[0][2].textContent === player) {
      log('you win')
    }
    // Gameboard.boardArray[0].forEach(el => el.textContent === 'X')
  }

  return {
    currentPlayer,
    winCondition,
    counter
  }
})();

// Gameboard object filled with html elements and related
// to be manipulated by other modules
const Gameboard = (() => {
  const board = document.createElement('div');
  board.setAttribute('class', 'game-container');

  const square = (id, col, row) => {
    const square = document.createElement('div')
    square.classList.add('board-boxes', col, row);
    square.setAttribute('id', id);

    return square;
  }

  const boardArray = (() => {
    const arr = [];
    let column = '';
    let row = '';

    for (let i = 0; i < 3; i++) {
      const rowArr = [];

      if (i === 0) row = '1';
      if (i === 1) row = '2';
      if (i === 2) row = '3';

      arr.unshift(rowArr); //if arr.push() is used, y axis of grid is backwards
      for (let j = 0; j < 3; j++) {
        if (j === 0) column = 'a';
        if (j === 1) column = 'b';
        if (j === 2) column = 'c';

        const elementId = `square--${column}-${row}`;
        const columnClass = `col-${column}`;
        const rowClass = `row-${row}`;

        rowArr.push(square(elementId, columnClass, rowClass))
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

    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        draw(Gameboard.board, arr[i][j]);
      }
    }
  })();

  const displaySymbol = ((player) => {

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const square = Gameboard.boardArray[i][j];
        square.addEventListener('click', () => {
          if (square.textContent.length > 0) {
            return;
          } else {
            player = Gameflow.currentPlayer();
            square.textContent = player.symbol;
            Gameflow.winCondition();
          }
        });
      }
    }
  })();
//TODO: delete returns when finished
  return {
    draw
  }
})();



/*
const twoDarray = (callback) => {
  const arr = [];
  for (let i = 0; i < 3; i++) {
    const rowArr = [];
    arr.push(rowArr)
    for (let j = 0; j < 3; j++) {
      rowArr.push(callback());
    }
  }
  return arr;
}

const twoDarray = (callback, xAxis, yAxis) => {
  const arr = [];
  for (let i = 0; i < yAxis; i++) {
    const rowArr = [];
    arr.push(rowArr)
    for (let j = 0; j < xAxis; j++) {
      rowArr.push(callback());
    }
  }
  return arr;
}
function randomColor() {
  const color = [];
  for (let i = 0; i < 3; i++) {
    const random = Math.floor(Math.random() * 255);
    color.push(random);
  }
  return `rgb(${color.join(', ')})`;
}
const loc = (x, y, color) => {
  // TODO
  // function to reverse y number based on y index total
  if (y === 0) {
    y = 2;
  } else if (y === 2) {
    y = 0;
  } else {
    y;
  }
  return Gameboard.boardArray[y][x].style.background = color;
}
*/
