let playerOne = document.querySelector('.player-one')
let playerTwo = document.querySelector('.player-two')

playerOne.style.display = 'none'; 
playerTwo.style.display = 'none'; 
let pressToPlay = document.querySelector('.play h3'); 

pressToPlay.addEventListener('click', function(e) {
    enterNames(); 
})



function enterNames(){
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

    input[0].style.display = 'none'
    input[1].style.display = 'none'
}

