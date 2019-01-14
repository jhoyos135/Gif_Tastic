let topics = ["Sad", "Confused", "Love", "Happy", "Chill Out",
"Cry", "Yes", "No", "Excited", "Sorry",
"Congratulations", "Sleepy", "Hello", "Ok", "Thank You",
"Please", "Wink", "Hungry"];
let numberOfGIFs = 10;
let maxRating = "PG-13";
let gifContainer = document.querySelector('#gif-container');
let buttonContainer = document.querySelector('#button-container');
let title = document.querySelector('.title');

let renderBtns = () => {


    for(let i in topics) {
        // console.log(topics[i])
        let newButtons = `
            <button class="btn btn-secondary gif-button">
            ${topics[i]}
            </button>
        `;
        buttonContainer.innerHTML += newButtons;

        //unbind goes here

        document.querySelectorAll('.gif-button').forEach((button) => {
            button.addEventListener('click', (e) => {

                // console.log(e.target.textContent);
                title.textContent = e.target.textContent;
                gifContainer.innerHTML = '';
                fetch_gif(e.target.textContent);
            });
            button.addEventListener('dblclick', (e) => {
                
                e.target.remove();

                //TODO: save again to local Storage
            });
        });

        // let topics_copy = [...topics];
        // console.log(topics_copy)
        //TODO: save to local storage
        // localStorage.setItem('topics_copy', JSON.stringify(topics_copy));

    };
};

let addButton = (show) => {
    if(topics.indexOf(show) === -1) {
        topics.push(show);
        buttonContainer.innerHTML = '';
        renderBtns();
    }
    
    //TODO: save to local storage
    // localStorage.setItem("topics", JSON.stringify(topics));

};

let fetch_gif = async (show) => {

    var url = `https://api.giphy.com/v1/gifs/search?q=${show}&api_key=dc6zaTOxFJmzC&rating=${maxRating}&limit=${numberOfGIFs}`;
    let res = await fetch(url);
    let gifs = await res.json();
    let json = gifs.data;
    // console.log(data)
    for(let i in json) {
        let data = json[i];
        // console.log(data)
        //TODO: show gifs here!
        let img_html = `
        
        <div class="each-gif">
            <img class="gif-image" src="${data.images.fixed_height_still.url}" state="still" still-data=${data.images.fixed_height_still.url} animated-data=${data.images.fixed_height.url}  />
        </div>

        `;

        gifContainer.innerHTML += img_html;

        document.querySelectorAll('.gif-image').forEach( (gif) => {
            gif.addEventListener('click', (e) => {
                // console.log(e.target)
                let moving = e.target.getAttribute('animated-data');
                let still = e.target.getAttribute('still-data');
                // console.log(moving)
                if(e.target.getAttribute('state') === 'still') {
                    e.target.setAttribute('state', 'animated');
                    e.target.setAttribute('src', moving )
                } else {
                    e.target.setAttribute('state', 'still');
                    e.target.setAttribute('src', still)
                }
            });
        });

    };
};

document.addEventListener('DOMContentLoaded', () => {
    renderBtns();
    fetch_gif('hello');
    document.querySelector('#submit').addEventListener('click', (e) => {
        e.preventDefault();

        let favorites = document.querySelector('#favorites');
        // console.log(favorites)
        addButton(favorites.value.trim());
        favorites.value = '';
        

        // console.log(saved_topics)

        // saved_topics = JSON.parse(localStorage.getItem("topics"));
        // console.log(saved_topics)
    });

});
