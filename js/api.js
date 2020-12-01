export { arrayOfUrls }

fetchImages(); 

let arrayOfUrls = [];

function fetchImages() {
    const key = 'e97530c4db33a4ae21d65f765fe9c551'
    let theme = 'dog'
    
    const url = `https://www.flickr.com/services/rest/?api_key=${key}&method=flickr.photos.search&text=${theme}&format=json&nojsoncallback=1&page=2&page=1`; 

    fetch(url)
    .then((response) => response.json())
    .then((data) => {

        for (let i = 0; i < 12; i++) {
            arrayOfUrls.push(getImageUrl(data.photos.photo[i]));
        }

        console.log(arrayOfUrls); 
    })
    .catch((err) => {
        console.log(err)
    })
}

// console.log(arrayOfUrls); // Här är arrayen tom!

// setTimeout(function(){
//     console.log(arrayOfUrls); // här finns 12 url'er i
// }, 1000)


function getImageUrl(photoObject) {

    let photo = photoObject;
    let size = 'q';

    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg` 

    return imgUrl; 
}


