/* Getting Element from DOM - no need for this anymore */ 
// let gameboard = document.querySelector('.gameboard')

/* Removed temporary constructor */

/* Main function to fetch images, the parameter is to send in the array of the memoryobjects*/
function fetchImages(cardArr) {

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
            arrayOfUrls.push(getImageUrl(data.photos.photo[i])) // added one more so we get two of each url.
        }

        /* Using the parameter to send the url's into the memoryobject */
        for(let i = 0; i < cardArr.length; i++) {
            cardArr[i].imgSrc = arrayOfUrls[i];
        }

        /* Moving creation of cards to memory module */
        // let arrayOfCards = []; 
        // for(let i = 0; i < 12; i++) {
        //     arrayOfCards.push(new Card(arrayOfUrls[i]))
        //     arrayOfCards.push(new Card(arrayOfUrls[i]))
        // }

        /* Shuffling of the cards added to the constructor instead! */
        // let shuffledArrayOfCards = arrayOfCards.sort(() => Math.random() -0.5); 
    
        // /* Putting the cards on the DOM ---- MOVED */ 
        // createCards(shuffledArrayOfCards); 
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

// Skapandet av kort flyttas till prototyp
// function createCards(arr){
//     for (let i = 0; i < 24; i++) {
//         let card = document.createElement('div')
//         card.classList.add('card')
    
//         let frontCard = document.createElement('div');
//         frontCard.classList.add('front')
    
//         let dogImg = document.createElement('img');
//         dogImg.classList.add('back')
        
//         /* Here I add the img-url as the src to the backside of the memorycard */
//         dogImg.src = arr[i].imgSrc; 
    
//         gameboard.appendChild(card);
//         card.appendChild(frontCard)
//         card.appendChild(dogImg);
//     }
// }



