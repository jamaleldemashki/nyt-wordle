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

let hintCount = 0;

const helpBoxes = document.querySelectorAll(".help-box");
let hintButton = document.getElementById("hintButton");

const descriptionHintButton = document.getElementById("descriptionHintButton");
const descriptionContainer = document.getElementById("descriptionContainer");
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

document.addEventListener("keyup", (e) => {
  if (guessesRemaining === 0) {
    return;
  }
  let pressedKey = String(e.key);
  if (pressedKey === "Backspace" && nextLetter !== 0) {
    deleteLetter();
    return;
  }
  if (pressedKey === "Enter") {
    checkGuess();
    return;
  }
  let found = pressedKey.match(/[a-z]/gi);
  if (!found || found.length > 1) {
    return;
  } else {
    insertLetter(pressedKey);
  }
});

function insertLetter(pressedKey) {
  if (nextLetter === 5) {
    return;
  }
  pressedKey = pressedKey.toLowerCase();

  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let box = row.children[nextLetter];
  animateCSS(box, "pulse");
  box.textContent = pressedKey;
  box.classList.add("filled-box");
  currentGuess.push(pressedKey);
  nextLetter += 1;
}

function deleteLetter() {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let box = row.children[nextLetter - 1];
  box.textContent = "";
  box.classList.remove("filled-box");
  currentGuess.pop();
  nextLetter -= 1;
}

function checkGuess() {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let guessString = "";
  let rightGuess = Array.from(rightGuessString);

  for (const val of currentGuess) {
    guessString += val;
  }

  if (guessString.length != 5) {
    alert("Not enough letters!");
    return;
  }

  if (!WORDS.includes(guessString)) {
    alert("Word not in list!");
    return;
  }

  for (let i = 0; i < 5; i++) {
    let letterColor = "";
    let box = row.children[i];
    let letter = currentGuess[i];

    let letterPosition = rightGuess.indexOf(currentGuess[i]);
    // is letter in the correct guess
    if (letterPosition === -1) {
      letterColor = "grey";
    } else {
      // now, letter is definitely in word
      // if letter index and right guess index are the same
      // letter is in the right position
      if (currentGuess[i] === rightGuess[i]) {
        // shade green
        letterColor = "green";
      } else {
        // shade box yellow
        letterColor = "yellow";
      }

      rightGuess[letterPosition] = "#";
    }

    let delay = 250 * i;
    setTimeout(() => {
      //flip box
      animateCSS(box, "flipInX");
      //shade box
      box.style.backgroundColor = letterColor;
      shadeKeyBoard(letter, letterColor);
    }, delay);
  }

  if (guessString === rightGuessString) {
    alert("You guessed right! Game over!");
    guessesRemaining = 0;
    return;
  } else {
    guessesRemaining -= 1;
    currentGuess = [];
    nextLetter = 0;

    if (guessesRemaining === 0) {
      alert("You've run out of guesses! Game over!");
      alert(`The right word was: "${rightGuessString}"`);
    }
  }
}

function shadeKeyBoard(letter, color) {
  for (const elem of document.getElementsByClassName("keyboard-button")) {
    if (elem.textContent === letter) {
      let oldColor = elem.style.backgroundColor;
      if (oldColor === "green") {
        return;
      }

      if (oldColor === "yellow" && color !== "green") {
        return;
      }

      elem.style.backgroundColor = color;
      break;
    }
  }
}

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
  const target = e.target;

  if (!target.classList.contains("keyboard-button")) {
    return;
  }
  let key = target.textContent;

  if (key === "Del") {
    key = "Backspace";
  }

  document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
});

const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element;
    node.style.setProperty("--animate-duration", "0.3s");

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

hintButton.addEventListener("click", () => {
  if (hintCount === 0) {
    revealCorrectPositionLetter();
    hintCount += 1;
  } else if (hintCount === 1) {
    revealWrongPositionLetter();
    hintCount += 1;
  }

  //User is allowed to use the Hint tool twice
  if (hintCount === 2) {
    hintButton.disabled = true;
  }
});

function revealCorrectPositionLetter() {
  //Identify empty help-box slots
  //const helpBoxIndexes = getEmptyHelpBoxIndexees();
  //if (!helpBoxIndexes.length) return alert("No free help boxes left.");

  //For simplicity, pick the first letter from the solution
  const letterIndex = Math.floor(Math.random() * 5);
  const letter = rightGuessString[letterIndex];

  const targetBoxIndex = letterIndex;
  const targetBox = helpBoxes[targetBoxIndex];
  targetBox.textContent = letter;
  targetBox.classList.add("green");
}

function revealWrongPositionLetter() {
  //const helpBoxIndexes = getEmptyHelpBoxIndexees();
  //if (!helpBoxIndexes.length) return alert("No free help boxes left.");

  const letterIndex = Math.floor(Math.random() * 5);
  const letter = rightGuessString[letterIndex];

  // We'll pick a box that does not match the letter's actual index
  /*const validBoxes = helpBoxIndexes.filter((i) => i != letterIndex);
  if (!validBoxes.length) {
    return alert("No valid boxes found for the wrong position letter!");
  }*/
  const targetBoxIndex = Math.floor(Math.random() * 5);
  const targetBox = helpBoxes[targetBoxIndex];
  targetBox.textContent = letter;
  targetBox.classList.add("yellow");
}

descriptionHintButton.addEventListener("click", async () => {
  const word = rightGuessString; // The word to look up
  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`No definition found for "${word}".`);
    }
    const data = await response.json();
    const definition = data[0]?.meanings[0]?.definitions[0]?.definition;

    if (definition) {
      descriptionContainer.textContent = definition;
    } else {
      descriptionContainer.textContent = "No definition available.";
    }
  } catch (error) {
    descriptionContainer.textContent = error.message;
  } finally {
    descriptionContainer.style.display = "block";
  }
});
