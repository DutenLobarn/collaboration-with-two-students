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

// TODO: Populate the gameboard (using placehodler for now), replace with api-module + memorycard-module
// Placeholder - 24 = maxnumber of cards
for (let i = 0; i < 24; i++) {
    let card = document.createElement('div');
    card.classList.add('card');
    
    // PLACEHOLDER STYLING - Represents card turned downwards.
    card.style.background = 'lightblue';
    card.style.border = '5px dotted white';
    card.style.borderRadius = '5px';

    // Appending card as child to gameboard.
    gameboard.append(card);
};

// TODO: Update with proper element and values.
gameboard.addEventListener('click', function (event) {
    // Stop if event.target === gameboard
    if (event.target.className !== 'gameboard') {
        if (firstPickedCard === null) {
            firstPickedCard = event.target;

        } else if (secondPickedCard === null && firstPickedCard !== event.target) {
            secondPickedCard = event.target;

            // TODO: Add comparison.
            compareCards();
        } else {
            // TWO CARDS ARE ALREADY SELECTED
            console.log('two cards are already selected');
        };
    };

    console.log(firstPickedCard);
    console.log(secondPickedCard);
});

// Comparing cards
function compareCards() {

};