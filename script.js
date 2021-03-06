let topics = ["sad", "confused", "love", "happy", "chill out",
"cry", "yes", "no", "excited", "sorry",
"congratulations", "sleepy", "hello", "ok", "thank you",
"please", "wink", "hungry"];
let numberOfGIFs = 12;
let offset = 1;
let maxRating = "pg-13";
let gifContainer = document.querySelector('#gif-container');
let buttonContainer = document.querySelector('#button-container');
let title = document.querySelector('.title');
let next = document.querySelector('.next')
let prev = document.querySelector('.prev');
let favorites = document.querySelector('#favorites');

//save to localstorage function
let SaveDataToLocalStorage = (data) => {
    var a = [];
    a = JSON.parse(localStorage.getItem('topics'));
    a.push(data);

    localStorage.setItem('topics', JSON.stringify(a));
}

let final_topics = JSON.parse(localStorage.getItem('topics'));

let renderBtns = () => {

    for(let i in final_topics) {
        let newButtons = `
            <button class="btn btn-secondary gif-button">
            ${final_topics[i]}
            </button>
        `;
        buttonContainer.innerHTML += newButtons;

        //unbind goes here

        document.querySelectorAll('.gif-button').forEach((button) => {
            button.addEventListener('click', (e) => {
                offset = 1
                // console.log(e.target.textContent);
                title.textContent = e.target.textContent;
                gifContainer.innerHTML = '';
                fetch_gif(e.target.textContent);
            });
            button.addEventListener('dblclick', (e) => {

                // console.log(e.target.textContent.trim())
                let target_text = e.target.textContent.trim();
                let target = final_topics.indexOf(target_text);
                // console.log(target)
                final_topics.splice(target, 1);
                // console.log(deleteFromArray)
                e.target.remove();
                // console.log(final_topics)

                localStorage.setItem('topics', JSON.stringify(final_topics));

            });
        });
    };
};

let addButton = (show) => {
    if(final_topics.indexOf(show) === -1) {

        offset = 1
        final_topics.push(show);

        buttonContainer.innerHTML = '';
        // console.log(final_topics)
        renderBtns();

        SaveDataToLocalStorage(show);

    }
};

let fetch_gif = async (show) => {
    
    let url = `https://api.giphy.com/v1/gifs/search?q=${show}&api_key=qs8JdHDGkOSsrfB4fYFOkdxlP1RRy2IW&rating=${maxRating}&limit=${numberOfGIFs}&offset=${offset}`;
    let res = await fetch(url);
    let gifs = await res.json();
    let json = gifs.data;
    
    // console.log(gifs)

    for(let i in json) {
        let data = json[i];
        // console.log(data.images)

        //renders GIFS
        let img_html = `
        
        <div class="each-gif">
            <img class="gif-image" src="${data.images.original_still.url}" state="still" still-data=${data.images.original_still.url} animated-data=${data.images.original.url} />
            <p class="rating"> Rating: ${data.rating}</p>
        </div>

        `;

        gifContainer.innerHTML += img_html;

        // Event when the each gif is click
        document.querySelectorAll('.gif-image').forEach( (gif) => {

            gif.addEventListener('click', (e) => {
                e.stopPropagation();
                // console.log(e.target)
                let moving = e.target.getAttribute('animated-data');
                let still = e.target.getAttribute('still-data');
                // console.log(moving)
                if(e.target.getAttribute('state') === 'still') {
                    e.target.setAttribute('state', 'animated');
                    e.target.setAttribute('src', moving )
                } else {
                    e.target.setAttribute('state', 'still');
                    e.target.setAttribute('src', still);
                }
            });
        });
    };  
};

// Pagination functionality
let page_up = () => {
    offset = offset + 13;
};
let page_down = () => {
    offset = offset - 13;
};

next.addEventListener('click', () => {
    page_up();
    fetch_gif(title.textContent);
    gifContainer.innerHTML = '';

});

prev.addEventListener('click', () => {
    if(offset !== 1) {
        page_down();
        fetch_gif(title.textContent);
        gifContainer.innerHTML = '';
    }
});

document.addEventListener('DOMContentLoaded', () => {

    renderBtns();
    fetch_gif('hello');
    
    // when the page loads for the first time load the main topics
    let run = () => {
        location.reload();
        return localStorage.setItem('topics', JSON.stringify(topics));
    }
    if(localStorage.getItem('topics') === null) {
        run();
    }

    document.querySelector('#submit').addEventListener('click', (e) => {
        e.preventDefault();
        offset = 1;
        let favorites = document.querySelector('#favorites');
        gifContainer.innerHTML = '';
        title.textContent = favorites.value;
        fetch_gif(favorites.value);
        addButton(favorites.value.trim().toLowerCase());
        favorites.value = '';
        
    });

});

let success = () => {
    let submit = document.querySelector('.submit');
    if(favorites.value.length == 0 || favorites.value.length === '' ) { 
           submit.disabled = true; 
       } else { 
           submit.disabled = false;

       }
   }

   
