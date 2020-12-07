/* Main function to fetch images, the parameter is to send in the array of the memoryobjects*/
export function fetchImages(cardArr, themeInput, numOfCards) {

    const key = 'e97530c4db33a4ae21d65f765fe9c551'
    let theme = themeInput; 
    
    const url = `https://www.flickr.com/services/rest/?api_key=${key}&method=flickr.photos.search&text=${theme}&format=json&nojsoncallback=1&page=2&page=1`; 

    fetch(url)
    .then((response) =>{
        return response.json(); 
    }) 
    .then((data) => {
        
        // If no photos are found, for example if "theme" is not a valid seachtext
        if (data.stat === 'ok' && data.photos.photo.length === 0) {
            throw 'No photos found on that theme, try another one!'; 
        }
        
        //If everything is okey! 
        else if (data.stat === 'ok') {
            /* Creating array and then push the different img-urls into it */
            let num = (numOfCards / 2) * 5; // calculating the number I need in the loop to get the right amount of cards
            let arrayOfUrls = []; 
            for (let i = 0; i < num; i += 5) { // using += 5 to try and get a bit more variety of cards. 
                arrayOfUrls.push(getImageUrl(data.photos.photo[i]));
                arrayOfUrls.push(getImageUrl(data.photos.photo[i])) // added one more so we get two of each url.
            } 

            /* Using the parameter to send the url's into the memoryobject */
            for(let i = 0; i < cardArr.length; i++) {
                cardArr[i].imgSrc = arrayOfUrls[i];
            }
        
        // if API-key is invalid    
        } else if (data.stat === 'fail') {
            throw data.message; 
        }

    })
    .catch((err) => {
        catchError(err); 
    })
}

// function to get the imgUrl that we send in to the parameter for the memoryobjects
function getImageUrl(photoObject) {

    let photo = photoObject;
    let size = 'q';

    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg` 

    return imgUrl; 
}

function catchError(err){
    // display error on DOM
    let errorMessage = document.createElement('p')
    errorMessage.style.fontSize = '1.3rem'; 
    errorMessage.style.marginTop = '1rem'
    errorMessage.style.textAlign = 'center'
    errorMessage.innerText = err; 
    
    const startPlayContainer = document.querySelector('.play')
    startPlayContainer.appendChild(errorMessage); 
    
    // Making the play-btn visible again, so we can try again if something goes wrong!
    const pressToPlay = document.querySelector('.play h3')
    pressToPlay.innerText = 'Press here to try again!'
    pressToPlay.style.visibility = 'visible';

    
    // emptying gameboard so we can't play
    let gameboard = document.querySelector('.gameboard');
    while (gameboard.firstChild) {
        gameboard.removeChild(gameboard.firstChild);
    }
}
