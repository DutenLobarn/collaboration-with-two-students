// MODULE MemoryGAME
'use strict'

// TODO: Add imports from API and MemoryCard!
import { Card } from './cardsconstructor.js'
import { fetchImages } from './api.js'


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
            compareCards();
        } else {
            // TWO CARDS ARE ALREADY SELECTED
            console.log('two cards are already selected');
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