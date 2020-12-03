console.log('Hello World!');
console.log('Nina skapar detta lokalt på datorn'); 

console.log('Nina Testar att göra en commit från en annan branch'); 

console.log('Det här skrivs i samuelsbranch :)');

/* bara för att ni ska se hur korten ser ut när de skapas på domen! */

let gameboard = document.querySelector('.gameboard')
for (let i = 0; i < 24; i++) {
    let card = document.createElement('div')
    card.classList.add('card')

    let frontCard = document.createElement('div');
    frontCard.classList.add('front')

    let backCard = document.createElement('div');
    backCard.classList.add('back')
    backCard.innerText = "Här ska bilderna från API-vara"

    gameboard.appendChild(card);
    card.appendChild(frontCard)
    card.appendChild(backCard);
}
