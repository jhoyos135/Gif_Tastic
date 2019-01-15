let topics = ["Sad", "Confused", "Love", "Happy", "Chill Out",
"Cry", "Yes", "No", "Excited", "Sorry",
"Congratulations", "Sleepy", "Hello", "Ok", "Thank You",
"Please", "Wink", "Hungry"];
let numberOfGIFs = 12;
let maxRating = "pg-13";
let gifContainer = document.querySelector('#gif-container');
let buttonContainer = document.querySelector('#button-container');
let title = document.querySelector('.title');

// console.log(topics)

// localStorage.setItem('topics', JSON.stringify(topics));

let SaveDataToLocalStorage = (data) => {
    var a = [];
    a = JSON.parse(localStorage.getItem('topics'));
    a.push(data);

    localStorage.setItem('topics', JSON.stringify(a));
    
}

let final_topics = JSON.parse(localStorage.getItem('topics'));
// console.log(final_topics)




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

                // console.log(e.target.textContent);
                title.textContent = e.target.textContent;
                gifContainer.innerHTML = '';
                fetch_gif(e.target.textContent);
            });
            button.addEventListener('dblclick', (e) => {
                
               

                //TODO: save again to local Storage
                // localStorage.removeItem(e.target.textContent.trim());
                console.log(e.target.textContent.trim())

                let target_text = e.target.textContent.trim();

                // final_topics.splice( final_topics.indexOf(target_text), 1)

                let target = final_topics.indexOf(target_text)
                // console.log(target)

                final_topics.splice(target,1)
    
                // console.log(deleteFromArray)

                e.target.remove();
                console.log(final_topics)

                localStorage.setItem('topics', JSON.stringify(final_topics));


            });
        });


    };

};

let addButton = (show) => {
    if(final_topics.indexOf(show) === -1) {

        final_topics.push(show);

        buttonContainer.innerHTML = '';
        console.log(final_topics)
        renderBtns();

        SaveDataToLocalStorage(show)

    }

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

        //renders GIFS
        let img_html = `
        
        <div class="each-gif">
            <img class="gif-image" src="${data.images.fixed_height_still.url}" state="still" still-data=${data.images.fixed_height_still.url} animated-data=${data.images.fixed_height.url}  />
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

document.addEventListener('DOMContentLoaded', () => {

    renderBtns();
    fetch_gif('hello');
    
    let run = () => {
        location.reload()
        return localStorage.setItem('topics', JSON.stringify(topics));
    }
    if(localStorage.getItem('topics') === null) {

        run()

    }


    // topics.push(final_topics)

    document.querySelector('#submit').addEventListener('click', (e) => {
        e.preventDefault();

        let favorites = document.querySelector('#favorites');
        // console.log(favorites)

        // console.log(topics)
        addButton(favorites.value.trim());
        favorites.value = '';
        
    });

});
