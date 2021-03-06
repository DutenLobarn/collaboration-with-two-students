// MODULE MemoryGAME
'use strict'

// Importing from API and MemoryCard.
import { Card } from './cardsconstructor.js'
import { fetchImages } from './api.js'


// ***** ELEMENTS *****
const pressToPlay = document.querySelector('.play h3');
const gameboard = document.querySelector('.gameboard');
const playerOneTotalScoreElement = document.querySelector('.pone-total-score');
const playerTwoTotalScoreElement = document.querySelector('.ptwo-total-score');
const playerOneCurrentScoreElement = document.querySelector('.score-player-one');
const playerTwoCurrentScoreElement = document.querySelector('.score-player-two');

// ***** GLOBAL VARIABLES *****
let currentPlayer = null; // Keeping track of whose turn it is (1 / 2), first round will be randomized.
let playerOneCurrentScore = 0; // Adding +1 when two of the same card is found (if player1's turn).
let playerOneTotalScore = 0; // Adding +1 when a game is won (if player1's turn).
let playerTwoCurrentScore = 0; // Adding +1 when two of the same card is found. (if player2's turn).
let playerTwoTotalScore = 0; // Adding +1 when a game is won (if player2's turn).
let firstPickedCard = null; // The first card selected by the user.
let secondPickedCard = null; // The second card selected by the user.

// Populating the gameboard with Card-objects. One Card-object represents a memory card.
// Parameter one defines the theme on the images, paramter two decides the total number of card-objects created.
export function startGame(theme, numOfCards) {
    // Reseting the gameboard by removing old memorycards that already exists on the board.
    // Making the gameboard targetable by pointer-events (removed when a winner is declared).
    gameboard.style.pointerEvents = 'auto';
    while (gameboard.firstChild) {
        gameboard.removeChild(gameboard.firstChild);
    };

    // Evaluates if currentplayer has a value and randomizes a value between 1 and 2 if it does not.
    if (!currentPlayer) {
        currentPlayer = Math.ceil(Math.random() * 2);
    }
    // Updating the DOM to show the current player.
    showCurrentPlayer(currentPlayer);

    // Reseting current score of both players
    playerOneCurrentScore = 0;
    playerOneCurrentScoreElement.textContent = '0';
    playerTwoCurrentScore = 0;
    playerTwoCurrentScoreElement.textContent = '0';


    /* ***** CREATING AND ADDING MEMORYCARDS TO THE GAMEBOARD  ***** */
    // Defining an array that will hold the memorycards.
    const cardArray = [];

    // Creating numbOfCards(dynamic value) new memorycards and adding them as elements to 'cardArray'.
    for (let i = 0; i < numOfCards; i++) {
        let newCard = new Card(null);

        // Adding eventListener to each Card-Object for the event 'click'.
        newCard.element.addEventListener('click', function(event) {
            // Selecting the first card.
            if (newCard.imgSrc !== null && firstPickedCard === null && event.target !== newCard) {
                firstPickedCard = newCard

                // Turning the card to show the image.
                newCard.flip();

            // Selecting the second card.
            } else if (newCard.imgSrc !== null && secondPickedCard === null && firstPickedCard !== newCard) {
                secondPickedCard = newCard;

                // Turning the card to show the image.
                newCard.flip();

                // Comparing the two selected cards.
                compareCards(numOfCards);
            } 
        });

        // Adding the newly created memorycard as element to 'cardArray'.
        cardArray.push(newCard);
    };

    // Updating the imgSrc of Card-objects with images from Flickr-API with user-defined theme.
    fetchImages(cardArray, theme, numOfCards);
}

// Comparing the selected cards
function compareCards(numOfCards) {
    if (firstPickedCard.imgSrc === secondPickedCard.imgSrc) {

        setTimeout(function() {
            firstPickedCard.dubblett();
            firstPickedCard = null;
        }, 1100);
        setTimeout(function() {
            secondPickedCard.dubblett();
            secondPickedCard = null;
        }, 1100);

        // Updating the score on the DOM.
        updateCurrentScore(currentPlayer, numOfCards);
    } else {
          setTimeout(function() {
            firstPickedCard.flipback();
            firstPickedCard = null;
        }, 1100);
        setTimeout(function() {
            secondPickedCard.flipback();
            secondPickedCard = null;
        }, 1100);

        switch (currentPlayer) {
            case 1:
                currentPlayer = 2;
                break;
            case 2: 
                currentPlayer = 1;
                break;
        }

        showCurrentPlayer(currentPlayer);
    }
};

// Updating the current score of the current player, calcualting win condition based on total number of cards (numOfCards).
function updateCurrentScore (currentPlayer, numOfCards) {
    if (currentPlayer === 1) {
        playerOneCurrentScore += 1;
        playerOneCurrentScoreElement.textContent = `${playerOneCurrentScore}`;
    } else if (currentPlayer === 2) {
        playerTwoCurrentScore += 1;
        playerTwoCurrentScoreElement.textContent = `${playerTwoCurrentScore}`;
    };
 
    // Calculating the number for a draw game! 
    let drawNum = (numOfCards / 2) / 2; 
    
    // Calculating the number that it takes to win the game
    let winnerNum = Math.floor((numOfCards / 2) / 2 + 1); 

    // Evaluates if the game is a draw
    if (playerOneCurrentScore === drawNum && playerTwoCurrentScore === drawNum) {
        // Updating the DOM to let the players know the game ended in a draw.
        let winnerText = `The game ended in a draw!`;
            endGame(winnerText);
    }

    // Evaluates if one of the players won
    if (playerOneCurrentScore >= winnerNum || playerTwoCurrentScore >= winnerNum) {
        updateTotalScore(currentPlayer);
    } 
}

// Updating the current score of the currentPlayer (Winner).
function updateTotalScore (currentPlayer) {
    let winnerText = '';

    // Selecting the players names
    let playerOne = document.querySelector('.player-one')
    let playerTwo = document.querySelector('.player-two')
    
    switch (currentPlayer) {
        case 1:
            // Adding one to the score of the winner
            playerOneTotalScore += 1;
            playerOneTotalScoreElement.textContent = `Total Games Won: ${playerOneTotalScore}`;

            // Displaying the winner
            winnerText = `${playerOne.textContent} has won!`;
            endGame(winnerText);
            break;
        case 2:
            // Adding one to the score of the winner
            playerTwoTotalScore += 1;
            playerTwoTotalScoreElement.textContent = `Total Games Won: ${playerTwoTotalScore}`;

            // Displaying the winner
            winnerText = `${playerTwo.textContent} has won!`;
            endGame(winnerText);
            break;
    }
}

// Updating the DOM to show the current player selecting cards.
function showCurrentPlayer (currentPlayer) {
    switch (currentPlayer){
        case 1:
            playerOneTotalScoreElement.parentElement.classList.remove('waiting-player');
            playerTwoTotalScoreElement.parentElement.classList.add('waiting-player');
            break;
        case 2:
            playerOneTotalScoreElement.parentElement.classList.add('waiting-player');
            playerTwoTotalScoreElement.parentElement.classList.remove('waiting-player');
            break;
    };
}

function endGame (text) {
    // Preventing further clicks on the memorycards since the game is over.
    gameboard.style.pointerEvents = 'none';

    // Creating a new <p>-element
    let newText = document.createElement('p');
    newText.textContent = text;
    newText.style.position = 'absolute';
    newText.style.zIndex = '10';
    newText.style.marginTop = '10rem';
    newText.style.fontSize = '2rem';

    // Appending the created <p>-element as child to gameboard.
    gameboard.append(newText);

    // Displaying 'Press to Play!' to give the players the ability to start a new round.
    pressToPlay.textContent = 'Play again!';
    pressToPlay.style.visibility = 'visible';
};

