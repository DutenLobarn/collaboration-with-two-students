import { startGame } from './MemoryGame.js'

// Getting elements from DOM
let playerOne = document.querySelector('.player-one')
let playerTwo = document.querySelector('.player-two')
// Setting them to display none from start
playerOne.style.display = 'none';
playerTwo.style.display = 'none';

let boxContainer = document.querySelector('.box-container');
let box = document.querySelector('.input-box')
let boxText = document.querySelector('.box-text');
let boxExample = document.querySelector('.box-example');

let pressToPlay = document.querySelector('.play h3');
// Making a click-event for the start text! Now user can write their "wishes", and we start the game! 
pressToPlay.addEventListener('click', function (e) {
    displayNames();
    userInputs();
    errorHandling();

    pressToPlay.style.visibility = 'hidden';
})

// function to put the names of the players on DOM
function displayNames() {
    let input = document.querySelectorAll('input')

    if (input[0].value.length !== 0) {
        playerOne.innerText = input[0].value;
    } else {
        playerOne.innerText = 'Player One'
    }

    if (input[1].value.length !== 0) {
        playerTwo.innerText = input[1].value;
    } else {
        playerTwo.innerText = 'Player Two'
    }

    playerOne.style.display = 'block';
    playerTwo.style.display = 'block';

    playerTwo.style.display = 'block';

    input[0].style.display = 'none'
    input[1].style.display = 'none'
}

function errorHandling(){
    //  there is an unvalid search and user try again, remove the errormessage that showed what the problem was. 
    let error = document.querySelector('.play p');
    if (error !== null) {
        error.remove();
    }

    // clearing the board for a new game! 
    let gameboard = document.querySelector('.gameboard');
    while (gameboard.firstChild) {
        gameboard.removeChild(gameboard.firstChild);
    }
}

function userInputs(){ 

    // creating input for how many cards and appending it to the box
    let howManyCardsInput = document.createElement('input')
    howManyCardsInput.setAttribute('type', 'text');
    howManyCardsInput.setAttribute('placeholder', 'Type how many cards here');
    box.appendChild(howManyCardsInput);

    // Showing the box
    boxContainer.style.display = 'block'
    boxContainer.style.opacity = '0.8'
    box.style.margin = '-5rem auto';

    // Updating text
    boxText.innerText = 'How many cards do you want to play with? \n (Minimum: 8 Maximum: 40)'; 
    boxExample.innerText = 'Must be an even number';   

    // setting eventListener so we can collect input Value and take proper action
    howManyCardsInput.addEventListener('keypress', function (e) {
        if (e.key == 'Enter' && e.target.value != '') {
            let numOfCards = e.target.value;
    
            // If its not a number
            if(isNaN(numOfCards)) {
                boxText.innerText = "Only use numbers please!"
            } // if its not an even number, or more than 40
            else if (numOfCards % 2 !== 0 || numOfCards > 40 || numOfCards < 8) { 

                if(numOfCards > 40) {
                    boxText.innerText = "You can't play with more than 40 cards.. How hard do you want it to be?"
                }
                if(numOfCards < 8) {
                    boxText.innerText = "You must have atleast 8 cards. Come on, it shouldn't be that easy!" 
                }
                else if(numOfCards % 2 !== 0) {
                    boxText.innerText = "You can't play memory with an uneven number of cards :( Try again!"
                }

            }
            else { // If everyhing is OK!
                // Hiding first input
                howManyCardsInput.style.display = 'none';
                // Creating a new input for the theme and updating text
                let themeInput = document.createElement('input')
                themeInput.setAttribute('type', 'text');
                themeInput.setAttribute('placeholder', 'Type theme here');
                boxText.innerText = 'What theme you would like to use for your cards?'
                boxExample.innerText = '(For example animal, nature or sport) '
                box.appendChild(themeInput)
                
                // Setting eventlistener to new input so we can collect theme, and start the game
                themeInput.addEventListener('keypress', function (e) {
                    if (e.key == 'Enter' && e.target.value != '') {
                        let themeValue = themeInput.value;
                        
                        // Hiding container
                        boxContainer.style.display = 'none'; 
                        
                        // Starting the game, and sending it the two values collected from user
                        startGame(themeValue, numOfCards);

                        // hiding the input for next time
                        themeInput.style.display = 'none'; 
                        
                        // emptying input
                        e.target.value = '';
                    }
                }) 
            }
           // emptying input
        e.target.value = '';
        }
    })
}