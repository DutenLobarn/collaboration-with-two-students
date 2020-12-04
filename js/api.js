/* Main function to fetch images, the parameter is to send in the array of the memoryobjects*/
export function fetchImages(cardArr) {

    const key = 'e97530c4db33a4ae21d65f765fe9c551'
    let theme = 'animal'
    
    const url = `https://www.flickr.com/services/rest/?api_key=${key}&method=flickr.photos.search&text=${theme}&format=json&nojsoncallback=1&page=2&page=1`; 

    fetch(url)
    .then((response) =>{
        return response.json(); 
    }) 
    .then((data) => {
        
        // If no photos are found, for example if "theme" is not a valid seachtext
        if (data.stat === 'ok' && data.photos.photo.length === 0) {
            throw 'No photos found'; 
        }
        
        //If everything is okey! 
        else if (data.stat === 'ok') {
            console.log(data)
            /* Creating array and then push 12 different img-urls into it */
            let arrayOfUrls = []; 
            for (let i = 0; i < 84; i += 7) {
                arrayOfUrls.push(getImageUrl(data.photos.photo[i]));
                arrayOfUrls.push(getImageUrl(data.photos.photo[i])) // added one more so we get two of each url.
            } 

            console.log(arrayOfUrls); 

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
        // display error on DOM
        let errorMessage = document.createElement('p')
        errorMessage.style.fontSize = '1.3rem'; 
        errorMessage.style.marginTop = '1rem'
        errorMessage.style.textAlign = 'center'
        let startPlay = document.querySelector('.play')
        startPlay.appendChild(errorMessage); 

        // showing error message + try again!
        errorMessage.innerText = `${err}, try again!`; 
        console.log(err); 
    })
}

// function to get the imgUrl that we send in to the parameter for the memoryobjects
function getImageUrl(photoObject) {

    let photo = photoObject;
    let size = 'q';

    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg` 

    return imgUrl; 
}
