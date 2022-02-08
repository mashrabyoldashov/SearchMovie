let elForm = document.querySelector(".form");
let elInput = document.querySelector(".input");
let elList = document.querySelector(".list");
let elPrevBtn = document.querySelector(".btn-1");
let elNextBtn = document.querySelector(".btn-2");
let elBtnList = document.querySelector(".button-list");
let paginationBox = document.querySelector(".none");
let filmName = "spider";
let page = 1;

const renderElement = function(obj, element) {
    setTimeout(() => {
        elForm.style.display = "block"
        paginationBox.style.display = "block"
        img.style.display = "none"

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
    }, 2000);
}

const renderApi = async function(country) {

    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${page}&query="${country}`)

    const data = await response.json();

    elBtnList.innerHTML = null;

    for (let i = 1; i <= data.total_pages; i++) {
        let newLi = document.createElement("li")
        let newButton = document.createElement("button")

        newButton.textContent = i;

        newButton.dataset.buttonId = newButton.textContent;

        newButton.setAttribute("class", "btn btn-primary");

        elBtnList.appendChild(newLi);
        newLi.appendChild(newButton);
    }


    if (page == 1) {
        elPrevBtn.disabled = true;
    } else {
        elPrevBtn.disabled = false;
    }

    if (page == data.total_pages) {
        elNextBtn.disabled = true;
    } else {
        elNextBtn.disabled = false;
    }

    renderElement(data, elList);
    console.log(data);
}

elForm.addEventListener("submit", (evt) => {

    evt.preventDefault()

    elForm.style.display = "none"
    paginationBox.style.display = "none"
    img.style.display = "block"

    let inputValue = elInput.value;
    page = 1;

    elList.innerHTML = null;

    if (inputValue === "") {
        page = 1;
        renderApi(`${filmName}`);
    }

    renderApi(`${inputValue}`)
})


elNextBtn.addEventListener("click", () => {
    setTimeout(() => {
        elForm.style.display = "none"
        paginationBox.style.display = "none"
        img.style.display = "block"

        elList.innerHTML = null;
        let inputValue = elInput.value;

        page++

        renderApi(`${inputValue || filmName}`);
    }, 2000);
})

elPrevBtn.addEventListener("click", () => {
    setTimeout(() => {
        elForm.style.display = "none"
        paginationBox.style.display = "none"
        img.style.display = "block"

        elList.innerHTML = null;

        let inputValue = elInput.value;

        page--
        renderApi(`${inputValue || filmName}`)
    }, 2000);
})

elBtnList.addEventListener("click", (evt) => {

    elForm.style.display = "none"
    paginationBox.style.display = "none"
    img.style.display = "block"

    if (evt.target.matches(".btn-primary")) {

        elList.innerHTML = null;

        let inputValue = elInput.value;
        let filmName = "spider";

        let pageId = evt.target.dataset.buttonId;
        page = pageId;

        renderApi(`${inputValue || filmName}`)

    }

})

renderApi(`${filmName}`)