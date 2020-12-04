let input = document.querySelectorAll('input')
let playerOne = document.querySelector('.player-one')
let playerTwo = document.querySelector('.player-two')
playerOne.style.display = 'none'; 
playerTwo.style.display = 'none'; 

input[0].addEventListener('keypress', function (e) {
    if (e.key == 'Enter' && e.target.value != '') {
        playerOne.style.display = 'block'; 
        playerOne.innerText = e.target.value; 
        input[0].style.display = 'none'
    }
})

input[1].addEventListener('keypress', function (e) {
    if (e.key == 'Enter' && e.target.value != '') {
        playerTwo.style.display = 'block'; 
        playerTwo.innerText = e.target.value;
        input[1].style.display = 'none'
    }
})