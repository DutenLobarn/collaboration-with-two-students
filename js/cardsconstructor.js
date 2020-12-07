// ELEMENTS
const gameboard = document.querySelector('.gameboard');

// CONSTRUCTOR
export function Card(_imgSrc) {
    this.imgSrc = _imgSrc;
    this.flipped = false;
    this.element = document.createElement('div');
    this.element.classList.add('card');
    this.element.style.order = Math.ceil(Math.random() * 1000);
    gameboard.append(this.element);
    this.img = document.createElement('img');
    this.element.append(this.img);
    this.img.classList.add('back');
};

Card.prototype.flip = function() {
    this.flipped = true;
    this.img.src = this.imgSrc;
    this.element.classList.add('flip');
}
Card.prototype.flipback = function() {
    this.flipped = false;
    this.element.style.background = `lightblue`;
    this.element.classList.remove('flip');
}


// försöker skapa en function som döljer korten om man får en dublett

Card.prototype.dubblett = function() {
        this.element.style.visibility = 'hidden';
    }
    // Constructor end