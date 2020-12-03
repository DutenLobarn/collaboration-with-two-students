'use strict'
import { fetchImages } from './api.js';

let gameboard = document.querySelector('.gameboard')

// CONSTRUCTOR
function Card(_imgSrc) {
    this.imgSrc = _imgSrc;
    this.flipped = false;
    this.element = document.createElement('div');
    this.element.classList.add('card');
    this.element.classList.add('front');
    this.element.style.order = Math.ceil(Math.random() * 1000);
    gameboard.append(this.element);
}

Card.prototype.flip = function() {
    this.flipped = true;
    this.element.style.background = `url(${this.imgSrc})`;
}
Card.prototype.flipback = function() {
        this.flipped = false;
        this.element.style.background = `lightblue`;
    }
    // Constructor end

// INITIATING CARD-OBJECTS
const cardArray = [];
for (let i = 0; i < 24; i++) {
    let newCard = new Card(null);

    newCard.element.addEventListener('click', function(event) {
        if (!newCard.flipped) {
            newCard.flip();
        } else {
            newCard.flipback();
        }
    });

    cardArray.push(newCard);
};

console.log(cardArray);

// Updating url-property of cards
fetchImages(cardArray);

let images = document.querySelectorAll('.card');