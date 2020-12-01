// MODULE MemoryGAME
'use strict'

// TODO: Add imports from API and MemoryCard!



// ***** ELEMENTS *****
const gameboard = document.querySelector('.gameboard');
const playerOneTotalScore = document.querySelector('.pone-total-score');
const playerTwoTotalScore = document.querySelector('.ptwo-total-score');
const playerOneCurrentScore = document.querySelector('.score-player-one');
const playerTwoCurrentScore = document.querySelector('.score-player-two');

// ***** GLOBAL VARIABLES *****
let totalGames = 0;
// TODO: Who starts?
let currentPlayer = null;
let firstPickedCard = null;
let secondPickedCard = null;

// TODO: Move to app.js!
const pressToPlay = document.querySelector('.play');
pressToPlay.addEventListener('click', function (event) {
   // Todo: Start the game.
   console.log('Start the game!'); 
});
