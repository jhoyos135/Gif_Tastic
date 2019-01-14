var url = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

const fetch_gif = async () => {

    var url = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";
    let res = await fetch(url);
    let gifs = await res.json();
    let json = gifs.data;

    // console.log(data)

    for(let i in json) {
        let data = json[i];
        console.log(data)
    }
}

fetch_gif()