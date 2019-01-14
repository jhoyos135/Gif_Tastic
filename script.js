var topics = ["Sad", "confused", "Love", "Happy", "Chill Out",
"Cry", "Yes", "No", "Excited", "Sorry",
"Congratulations", "Sleepy", "Hello", "Ok", "Thank you",
"Please", "Wink", "Hungry"];
var numberOfGIFs = 10;
var cutOffRating = "PG-13";
let gifContainer = document.querySelector('#gif-container');
let buttonContainer = document.querySelector('#button-container');

let renderBtns = () => {
    for(let i in topics) {
        // console.log(topics[i])
        let newButtons = `
            <button class="btn btn-secondary gif-button">
            ${topics[i]}
            </button
        `
        buttonContainer.innerHTML += newButtons;

        //unbind goes here

        document.querySelectorAll('.gif-button').forEach((button) => {
            button.addEventListener('click', (e) => {

                gifContainer.innerHTML = '';
                // console.log(e.target.textContent)
                fetch_gif(e.target.textContent);
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
}

let fetch_gif = async (show) => {

    var url = `https://api.giphy.com/v1/gifs/search?q=${show}&api_key=dc6zaTOxFJmzC&rating=${cutOffRating}&limit=${numberOfGIFs}`;
    let res = await fetch(url);
    let gifs = await res.json();
    let json = gifs.data;

    // console.log(data)

    for(let i in json) {
        let data = json[i];
        console.log(data.images.original.url)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderBtns();
    document.querySelector('#submit').addEventListener('click', (e) => {
        e.preventDefault();

        let favorites = document.querySelector('#favorites').value.trim();
        // console.log(favorites)
        addButton(favorites);
        favorites.value = '';

    });
});
