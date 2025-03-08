/*This code snippet initialises the global variables we'll be using for our game and picks a random word
from the array WORDS as the right guess for this round. We also log the right guess
to the console, to debug our code if necessary.
*/
import { WORDS } from "./words.js";

const NUMBER_OF_GUESSS = 6;
let guessesRemaining = NUMBER_OF_GUESSS;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
console.log(rightGuessString);

/*
So what does this code do? 
initBoard creates one row for each guess we give the user and creates 5 boxes for each row.
There is one box for each letter of the guess, and the function makes them all children of the row.

initBoard then adds each row to the board container. 
Each row is given the class letter-row, and each box is assigned letter-box.
*/
function initBoard() {
  let board = document.getElementById("game-board");

  for (let i = 0; i < NUMBER_OF_GUESSS; i++) {
    let row = document.createElement("div");
    row.className = "letter-row";

    for (let j = 0; j < 5; j++) {
      let box = document.createElement("div");
      box.className = "letter-box";
      row.appendChild(box);
    }
    board.appendChild(row);
  }
}

initBoard();
