'use strict'
import { fetchImages } from './api.js';
import { Card } from './cardsconstructor.js';

let gameboard = document.querySelector('.gameboard')

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