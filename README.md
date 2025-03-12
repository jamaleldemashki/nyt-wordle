# Wordle Clone

A custom Wordle-like game that challenges players to guess a 5-letter word within a limited number of tries. The game includes two optional hints:
1. Reveal a letter in the correct position.  
2. Reveal a short description (definition) of the secret word without mentioning the actual word.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Word Guessing**: A 5-letter target word is randomly selected from a large word list.
- **Color Indicators**: Letters turn green when they match the correct position, yellow when the letter is in the word but in the wrong spot, and gray if the letter isn’t in the solution at all.
- **Hint #1**: Reveals a single letter in its correct position (limited usage).
- **Hint #2**: Reveals a brief definition or description of the target word (also limited usage).
- **Modern UI**: Styled with CSS to replicate a polished Wordle-like appearance.

---

##Play the Game

Enter guesses in the designated input or on-screen keyboard (depending on implementation).
Use Hint #1 to reveal a correct-position letter if you’re stuck.
Use Hint #2 to see a short definition (without the answer!) for an extra clue.
Green squares = correct letters in the correct spot, yellow squares = correct letter/wrong spot, gray squares = letter not in the word.
Stop the Server

Go back to your terminal and press Ctrl + C to quit live-server.

