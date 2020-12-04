// MODULE MemoryGAME
'use strict'

// TODO: Add imports from API and MemoryCard!
import { Card } from './cardsconstructor.js'
import { fetchImages } from './api.js'


// ***** ELEMENTS *****
const gameboard = document.querySelector('.gameboard'); // Redundant?
const playerOneTotalScoreElement = document.querySelector('.pone-total-score');
const playerTwoTotalScoreElement = document.querySelector('.ptwo-total-score');
const playerOneCurrentScoreElement = document.querySelector('.score-player-one');
const playerTwoCurrentScoreElement = document.querySelector('.score-player-two');

// ***** GLOBAL VARIABLES *****
let totalGames = 0; // Keeping track of the totalt number of games (+1 once a player has won) (REDUNDANT?)
// TODO: Who starts?
let currentPlayer = null; // Keeping track of whose turn it is (1 / 2);
let playerOneCurrentScore = 0; // Adding +1 once two of the same card is found (if player1's turn).
let playerOneTotalScore = 0; // Adding +1 once a game is won (if player1's turn).
let playerTwoCurrentScore = 0; // Adding +1 once two of the same card is found. (if player2's turn).
let playerTwoTotalScore = 0; // Adding +1 once a game is won (if player2's turn).
let firstPickedCard = null;
let secondPickedCard = null;

// TODO: Move to app.js!
const pressToPlay = document.querySelector('.play');
pressToPlay.addEventListener('click', function(event) {
    // Hiding 'Press here to play!' to prevent several instances of the memory to run simultaneously.
    pressToPlay.style.visibility = 'hidden';

    // Calling function startgame
    startGame();
});

// Populating the gameboard with Card-objects. One Card-object represents a memory card.
export function startGame() {
    // Reseting the gameboard by removing old memorycards that already exists on the board.
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
    playerOneCurrentScoreElement.textContent = 0;
    playerTwoCurrentScore = 0;
    playerTwoCurrentScoreElement.textContent = 0;


    /* ***** CREATING AND ADDING MEMORYCARDS TO THE GAMEBOARD  ***** */
    // Defining an array that will hold the memorycards.
    const cardArray = [];

    // Creating 24 new memorycards and adding them as elements to 'cardArray'.
    for (let i = 0; i < 24; i++) {
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
                compareCards(firstPickedCard, secondPickedCard);
            } else {
                // TODO: REMOVE? REDUNDANT?
                // TWO CARDS ARE ALREADY SELECTED
                console.log('two cards are already selected');
                // Logging to see that the cards referes to the correct card-objects.
                console.log(firstPickedCard);
                console.log(secondPickedCard);
            };
        });

        // Adding the newly created memorycard as element to 'cardArray'.
        cardArray.push(newCard);
    };

    // Updating the imgSrc of Card-objects with images from Flickr-API.
    fetchImages(cardArray);
}

// Comparing the selected cards
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

        // Updating the score on the DOM.
        updateCurrentScore(currentPlayer);
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
            case 2: currentPlayer = 1;
                break;
        }

        showCurrentPlayer(currentPlayer);
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

    // Evaluates if the game is a draw
    if (playerOneCurrentScore === 6 && playerTwoCurrentScore === 6) {
        // Updating the DOM to let the players know the game ended in a draw.
        let winnerText = `It's a draw!`;
            endGame(winnerText);
    }

    // TODO: Evalute if one of the players won. (Yes/No)
    if (playerOneCurrentScore >= 7 || playerTwoCurrentScore >= 7) {
        updateTotalScore(currentPlayer);
    }
}

// Updating the current score of the currentPlayer (Winner).
function updateTotalScore (currentPlayer) {
    let winnerText = '';
    
    switch (currentPlayer) {
        case 1:
            playerOneTotalScore += 1;
            playerOneTotalScoreElement.textContent = `Total Games Won: ${playerOneTotalScore}`;

            // TODO: Update with dynamic name
            winnerText = `Player One has won!`;
            endGame(winnerText);
            break;
        case 2:
            playerTwoTotalScore += 1;
            playerTwoTotalScoreElement.textContent = `Total Games Won: ${playerTwoTotalScore}`;

            // TODO: Update with dynamic name
            winnerText = `Player Two has won!`;
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

