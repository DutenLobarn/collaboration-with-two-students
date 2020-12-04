// MODULE MemoryGAME
'use strict'

// TODO: Add imports from API and MemoryCard!
import { Card } from './cardsconstructor.js'
import { fetchImages } from './api.js'


// ***** ELEMENTS *****
const gameboard = document.querySelector('.gameboard'); // Redundant?
const title = document.querySelector('.title h1');
const playerOneTotalScoreElement = document.querySelector('.pone-total-score');
const playerTwoTotalScoreElement = document.querySelector('.ptwo-total-score');
const playerOneCurrentScoreElement = document.querySelector('.score-player-one');
const playerTwoCurrentScoreElement = document.querySelector('.score-player-two');

// ***** GLOBAL VARIABLES *****
let totalGames = 0; // Keeping track of the totalt number of games (+1 once a player has won) (REDUNDANT?)
// TODO: Who starts?
let currentPlayer = null; // Keeping track of whose turn it is (1 / 2);
let playerOneCurrentScore = 0; // Adding +1 once two of the same card is found (if player1's turn).
let playerOneTotalScore = 0; // Adding +1 once two of the same card is found (if player1's turn).
let playerTwoCurrentScore = 0; // Adding +1 once two of the same card is found. (if player2's turn).
let playerTwoTotalScore = 0; // Adding +1 once two of the same card is found. (if player2's turn).
let firstPickedCard = null;
let secondPickedCard = null;

// TODO: Move to app.js!
const pressToPlay = document.querySelector('.play');
pressToPlay.addEventListener('click', function(event) {
    // Todo: Start the game.
    console.log('Start the game!');
});

// Populating the gameboard with Card-objects. One Card-object represents a memory card.
// Initiating Card-objects and pushing them to an array.
const cardArray = [];
for (let i = 0; i < 24; i++) {
    let newCard = new Card(null);

    // Adding eventListener to each Card-Object for the event 'click'.
    newCard.element.addEventListener('click', function(event) {
        // TODO: Fix desired functionality
        if (firstPickedCard === null && event.target !== newCard) {
            firstPickedCard = newCard
            console.log(firstPickedCard);

            // Showing the img
            newCard.flip();
        } else if (secondPickedCard === null && firstPickedCard !== newCard) {
            secondPickedCard = newCard;
            console.log(secondPickedCard);

            // Showing the img
            newCard.flip();

            // TODO: Add comparison.
            compareCards(firstPickedCard, secondPickedCard);
        } else {
            // TWO CARDS ARE ALREADY SELECTED (Redundant?)
            console.log('two cards are already selected');
            // Logging to see that the cards referes to the correct card-objects.
            console.log(firstPickedCard);
            console.log(secondPickedCard);
        };
    });

    cardArray.push(newCard);
};

// Updating the imgSrc of Card-objects with images from Flickr-API.
fetchImages(cardArray);

// TODO: Compare the selected cards.
function compareCards() {
    if (firstPickedCard.imgSrc === secondPickedCard.imgSrc) {

        setTimeout(function() {
            firstPickedCard.dubblett();
            firstPickedCard = null;
        }, 1100);
        setTimeout(function() {
            secondPickedCard.dubblett();
            secondPickedCard = null;
        }, 1100);

    } else {
          setTimeout(function() {
            firstPickedCard.flipback();
            firstPickedCard = null;
        }, 1100);
        setTimeout(function() {
            secondPickedCard.flipback();
            secondPickedCard = null;
        }, 1100);
    }
};

// Updating the current score of the current player.
function updateCurrentScore (currentPlayer) {
    if (currentPlayer === 1) {
        playerOneCurrentScore += 1;
        playerOneCurrentScoreElement.textContent = `${playerOneCurrentScore}`;
    } else if (currentPlayer === 2) {
        playerTwoCurrentScore += 1;
        playerTwoCurrentScoreElement.textContent = `${playerTwoCurrentScore}`;
    };

    // TODO: Evalute if one of the players won. (Yes/No)
    // TODO: Announce the winner (how?)
    // TODO: Update totalgames and Total Games Won.
    // TODO: Reset currentscore and swap player.
}

// Updating the current score of the currentPlayer (Winner).
function updateTotalScore (currentPlayer) {
    switch (currentPlayer) {
        case 1:
            playerOneTotalScore += 1;
            playerOneTotalScoreElement.textContent = `Total Games Won: ${playerOneTotalScore}`;

            // TODO: Update with dynamic name
            title.textContent = `Player One has won!`
            break;
        case 2:
            playerTwoTotalScore += 1;
            playerTwoTotalScoreElement.textContent = `Total Games Won: ${playerTwoTotalScore}`;

            // TODO: Update with dynamic name
            title.textContent = `Player Two has won!`
            break;
    }

    pressToPlay.style.visibility = 'visible';
}
