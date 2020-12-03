// CONSTRUCTOR
export function Card(_imgSrc) {
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