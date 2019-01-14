// var topics = ["Rugrats", "Digimon", "Pokemon", "Arthur", "Teen Titans",
// "Hey Arnold", "Rocket Power", "Spongebob Squarepants", "Recess", "Doug",
// "Garfield", "Yu Gi Oh", "Ed Ed n Eddy", "The Wild Thornberrys", "Scooby-Doo",
// "The Simpsons", "DuckTales", "Pinky and the Brain"];
var numberOfGIFs = 10;
var cutOffRating = "PG-13";

let show = 'Matrix';



const fetch_gif = async () => {

    var url = `https://api.giphy.com/v1/gifs/search?q=${show}&api_key=dc6zaTOxFJmzC&rating=${cutOffRating}&limit=${numberOfGIFs}`;
    let res = await fetch(url);
    let gifs = await res.json();
    let json = gifs.data;

    // console.log(data)

    for(let i in json) {
        let data = json[i];
        console.log(data)
    }
}

fetch_gif();

//dc6zaTOxFJmzC