/* Getting Element from DOM */
let gameboard = document.querySelector('.gameboard')

/* Temporary Constructor, should be imported from construtor-module */ 
function Card(_imgSrc) {
    this.imgSrc = _imgSrc
}

Card.prototype.flip = function(){
    this.classList.add('flip')
}
Card.prototype.flipback = function(){
    this.classList.remove('flip')
}


fetchImages(); 

/* Main function to fetch images */
// Can I just export this function??? 
function fetchImages() {

    const key = 'e97530c4db33a4ae21d65f765fe9c551'
    let theme = 'dog'
    
    const url = `https://www.flickr.com/services/rest/?api_key=${key}&method=flickr.photos.search&text=${theme}&format=json&nojsoncallback=1&page=2&page=1`; 

    fetch(url)
    .then((response) => response.json())
    .then((data) => {

        // TODO: ADD ERRORHANDLING 
        
        /* Creating array and then push 12 different img-urls into it */
        let arrayOfUrls = []; 
        for (let i = 0; i < 12; i++) {
            arrayOfUrls.push(getImageUrl(data.photos.photo[i]));
        }

        
        /* Creating an array with the card-constructor with the img-url as argument, two of every url */
        let arrayOfCards = []; 
        for(let i = 0; i < 12; i++) {
            arrayOfCards.push(new Card(arrayOfUrls[i]))
            arrayOfCards.push(new Card(arrayOfUrls[i]))
        }

        /* Putting the cards on the DOM */ 
        createCards(arrayOfCards); 

    })
    .catch((err) => {
        console.log(err)

    })

}


function getImageUrl(photoObject) {

    let photo = photoObject;
    let size = 'q';

    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg` 

    return imgUrl; 
}

function createCards(arr){
    for (let i = 0; i < 24; i++) {
        let card = document.createElement('div')
        card.classList.add('card')
    
        let frontCard = document.createElement('div');
        frontCard.classList.add('front')
    
        let dogImg = document.createElement('img');
        dogImg.classList.add('back')
        
        /* Here I add the img-url as the src to the backside of the memorycard */
        dogImg.src = arr[i].imgSrc; 
    
        gameboard.appendChild(card);
        card.appendChild(frontCard)
        card.appendChild(dogImg);
    }
}


