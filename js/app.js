import { startGame } from './MemoryGame.js'

let playerOne = document.querySelector('.player-one')
let playerTwo = document.querySelector('.player-two')

playerOne.style.display = 'none';
playerTwo.style.display = 'none';

let pressToPlay = document.querySelector('.play h3');

pressToPlay.addEventListener('click', function (e) {
    displayNames();
    userInputs();
    errorHandling(); 
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

// TODO: MOVE STYLES TO CSS?? 
let boxContainer = document.querySelector('.box-container');
let box = document.createElement('div');
box.classList.add('input-box')

let boxText = document.createElement('p');
boxText.classList.add('box-text')
boxText.style.fontSize = '1.5rem';
boxText.style.width = '70%';
let boxExample = document.createElement('p');
boxExample.style.fontSize = '1rem';
boxExample.style.marginBottom = '0.8rem';

let howManyCardsInput = document.createElement('input')
howManyCardsInput.setAttribute('type', 'text');
howManyCardsInput.setAttribute('placeholder', 'type how many cards here');

let container = document.querySelector('.player-container')
container.insertAdjacentElement('afterend', boxContainer)
boxContainer.appendChild(box)
box.appendChild(boxText);
box.appendChild(boxExample);
box.appendChild(howManyCardsInput);


function userInputs(){ 

    boxContainer.style.opacity = '0.8'
    boxContainer.style.display = 'block'
    box.style.margin = '-5rem auto';

    howManyCardsInput.style.display = 'block'
    boxText.innerText = 'How many cards do you want to play with? (Maximum: 40)'; 
    boxExample.innerText = 'Must be an even number!';   

    howManyCardsInput.addEventListener('keypress', function (e) {
        if (e.key == 'Enter' && e.target.value != '') {
            let numOfCards = e.target.value;
            console.log(numOfCards);
            
            if(isNaN(numOfCards)) {
                boxText.innerText = "Only use numbers please!"
            }
            else if (numOfCards % 2 !== 0 || numOfCards > 40) { 

                if(numOfCards > 40) {
                    boxText.innerText = "You can't play with more than 40 cards.. How hard do you want it to be?"
                }
                else if(numOfCards % 2 !== 0) {
                    boxText.innerText = "You can't play memory with an uneven number of cards :( Try again!"
                }

            }
            else {
                howManyCardsInput.style.display = 'none';
                let themeInput = document.createElement('input')
                themeInput.setAttribute('type', 'text');
                themeInput.setAttribute('placeholder', 'Type theme here');
                boxText.innerText = 'What theme you would like to use for your cards?'
                boxExample.innerText = '(For example animal, nature or sport) '
                box.appendChild(themeInput)

                e.target.value = '';
    
                themeInput.addEventListener('keypress', function (e) {
                    if (e.key == 'Enter' && e.target.value != '') {
                        let themeValue = themeInput.value;
                        boxContainer.style.opacity = '0.3'
                        boxContainer.style.display = 'none'
                        startGame(themeValue, numOfCards);

                        themeInput.style.display = 'none'; 
    
                        e.target.value = '';
                    }
                }) 
            }
        e.target.value = '';
        }
    })
}




// }

