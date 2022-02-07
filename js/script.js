let elForm = document.querySelector(".form");
let elInput = document.querySelector(".input");
let elList = document.querySelector(".list");

const renderElement = function(obj, element) {
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
    const newArray = obj.results;

    console.log(newArray);

    newArray.forEach(film => {

        const html = `
        <li class="card" style="width: 18rem;">
        <img class="card-img-top" src="${IMG_PATH}${film.poster_path}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title text-light">${film.original_title}</h5>
            <p class="card-text text-light">${film.release_date}</p>
            <h4 class="text-light"><i class="bi bi-star-fill"></i>${film.vote_average}</h4>
        </div>
        </li>
        `

        element.insertAdjacentHTML('beforeend', html);
    })
}

const renderApi = async function(country) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="${country}`)

    const data = await response.json()

    renderElement(data, elList);
    console.log(data);
}

renderApi("spider");

elInput.oninput = () => {
    let inputValue = elInput.value;

    if (inputValue === "") {
        renderApi("spider");
    }

    elList.innerHTML = null;

    renderApi(`${inputValue}`);
}