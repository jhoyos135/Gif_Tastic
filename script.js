let topics = ["Sad", "Confused", "Love", "Happy", "Chill Out",
"Cry", "Yes", "No", "Excited", "Sorry",
"Congratulations", "Sleepy", "Hello", "Ok", "Thank You",
"Please", "Wink", "Hungry"];
let numberOfGIFs = 10;
let maxRating = "PG-13";
let gifContainer = document.querySelector('#gif-container');
let buttonContainer = document.querySelector('#button-container');

let renderBtns = () => {
    for(let i in topics) {
        // console.log(topics[i])
        let newButtons = `
            <button class="btn btn-secondary gif-button">
            ${topics[i]}
            </button>
        `
        buttonContainer.innerHTML += newButtons;

        //unbind goes here

        document.querySelectorAll('.gif-button').forEach((button) => {
            button.addEventListener('click', (e) => {

                gifContainer.innerHTML = '';
                // console.log(e.target.textContent)
                fetch_gif(e.target.textContent);
            });
            button.addEventListener('dblclick', (e) => {
                
                e.target.remove();

                //TODO: save again to local Storage
            });
        });

    };
};

let addButton = (show) => {
    if(topics.indexOf(show) === -1) {
        topics.push(show);
        buttonContainer.innerHTML = '';
        renderBtns();
    }
    //TODO: save to local storage
};

let fetch_gif = async (show) => {

    var url = `https://api.giphy.com/v1/gifs/search?q=${show}&api_key=dc6zaTOxFJmzC&rating=${maxRating}&limit=${numberOfGIFs}`;
    let res = await fetch(url);
    let gifs = await res.json();
    let json = gifs.data;

    // console.log(data)

    for(let i in json) {
        let data = json[i];
        console.log(data.images.original.url)
        //TODO: show gifs here!
    };
};

document.addEventListener('DOMContentLoaded', () => {
    renderBtns();

    document.querySelector('#submit').addEventListener('click', (e) => {
        e.preventDefault();

        let favorites = document.querySelector('#favorites');
        // console.log(favorites)
        addButton(favorites.value.trim());
        favorites.value = '';

        //TODO: save to local storage

    });

});
