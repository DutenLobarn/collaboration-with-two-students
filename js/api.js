/* Getting Element from DOM */
let gameboard = document.querySelector('.gameboard')


/* Main function to fetch images */
export function fetchImages(cardArr) {

    const key = 'e97530c4db33a4ae21d65f765fe9c551'
    let theme = 'dog'

    const url = `https://www.flickr.com/services/rest/?api_key=${key}&method=flickr.photos.search&text=${theme}&format=json&nojsoncallback=1&page=2&page=1`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {

            /* Creating array and then push 12 different img-urls into it */
            let arrayOfUrls = [];
            for (let i = 0; i < 12; i++) {
                arrayOfUrls.push(getImageUrl(data.photos.photo[i]));
                arrayOfUrls.push(getImageUrl(data.photos.photo[i]));
            }

            /* Creating an array with the card-constructor with the img-url as argument, two of every url */
            // let arrayOfCards = []; 
            for (let i = 0; i < cardArr.length; i++) {
                cardArr[i].imgSrc = arrayOfUrls[i];
            }
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