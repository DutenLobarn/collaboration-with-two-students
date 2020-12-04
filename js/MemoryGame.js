// MODULE MemoryGAME
'use strict'

// Importing from api.js and cardconstructor.js!
import {Card} from './cardsconstructor.js'
import {fetchImages} from './api.js'


// ***** ELEMENTS *****
const gameboard = document.querySelector('.gameboard');
const playerOneTotalScore = document.querySelector('.pone-total-score');
const playerTwoTotalScore = document.querySelector('.ptwo-total-score');
const playerOneCurrentScore = document.querySelector('.score-player-one');
const playerTwoCurrentScore = document.querySelector('.score-player-two');

// ***** GLOBAL VARIABLES *****
let totalGames = 0; // Keeping track of the totalt number of games (+1 once a player has won)
// TODO: Who starts?
let currentPlayer = null; // Keeping track of whose turn it is (1 / 2);
let playerOneScore= 0; // Adding +1 once two of the same card is found (if player1's turn).
let playerTwoScore = 0; // Adding +1 once two of the same card is found. (if player2's turn).
let firstPickedCard = null;
let secondPickedCard = null;

// TODO: Move to app.js!
const pressToPlay = document.querySelector('.play');
pressToPlay.addEventListener('click', function (event) {
   // Todo: Start the game.
   console.log('Start the game!'); 
});

// Populating the gameboard with Card-objects. One Card-object represents a memory card.
// Initiating Card-objects and pushing them to an array.
const cardArray = [];
for (let i = 0; i < 24; i++) {
    let newCard = new Card (null);

    // Adding eventListener to each Card-Object for the event 'click'.
    newCard.element.addEventListener('click', function(event) {
        // TODO: Fix desired functionality
        if (firstPickedCard === null && event.target !== newCard) {
            firstPickedCard = newCard
            
            // Showing the img
            newCard.flip();
        } else if (secondPickedCard === null && firstPickedCard !== newCard) {
            secondPickedCard = newCard;

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
function compareCards(cardOne, cardTwo) {

};

// Updating the current score of the current player.
function updateCurrentScore (currentPlayer, playerScore) {
    if (currentPlayer === 1) {
        playerOneCurrentScore.textContent = `${playerScore}`;
    } else if (currentPlayer === 2) {
        playerTwoCurrentScore.textContent = `${playerScore}`;
    };

    // TODO: Evalute if one of the players won. (Yes/No)
    // TODO: Announce the winner (how?)
    // TODO: Update totalgames and Total Games Won.
    // TODO: Reset currentscore and swap player.
}