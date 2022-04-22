document.addEventListener("DOMContentLoaded", () => {
    fetch("https://api.openbrewerydb.org/breweries")
    .then(resp => resp.json())
    .then(breweryDataOld => {
        assignImage(breweryDataOld)
        console.log(breweryData)
        carouselButtons()
        for (i=0; i<4; i++) {
            addToCarousel(breweryData[i])
        }
        addSearchFunction()
})
})
//Global Variables
// const carousel = document.querySelector("#carousel") was not working
const searchForm = document.querySelector("#form");
const searchResults = document.querySelector("#searchResults")
const favoritedResults = document.querySelector("#favorited-results")
let breweryData = []
let carouselMin = 0

//Assigns images to breweries and saves the updated info in breweryData
function assignImage (breweryDataOld) {
    breweryDataOld[0].image = "assets/banging-Banjo.jpg"
    breweryDataOld[1].image = "assets/barrel_brothers.jpeg"
    breweryDataOld[2].image = "assets/bay-brewing.jpg"
    breweryDataOld[3].image = "assets/bent-shovel.jpeg"
    breweryDataOld[4].image = "assets/snow-belt.jpg"
    breweryDataOld[5].image = "assets/boring-brewing.jpeg."
    breweryDataOld[6].image = "assets/brubakers.jpg"
    breweryDataOld[7].image = "assets/camino-brewing.jpeg."
    breweryDataOld[8].image = "assets/cape-ann-lanes.jpeg"
    breweryDataOld[9].image = "assets/center-pivot.jpeg"
    breweryDataOld[10].image = "assets/cerveceria-del-pueblo-pasadena.jpeg"
    breweryDataOld[11].image = "assets/circle-9-brewing-san-diego.jpeg"
    breweryDataOld[12].image = "assets/cerveza-guajira.jpg"
    breweryDataOld[13].image = "assets/common-john-brewing-co-manchester.jpeg"
    breweryDataOld[14].image = "assets/corner-pub-reedsburg.jpeg"
    breweryDataOld[15].image = "assets/cyclers-brewing-montgomery.jpeg"
    breweryDataOld[16].image = "assets/dented-face-brewing-company-delta.jpeg"
    breweryDataOld[17].image = "assets/dfamle-enterprises-lp-dba-four-sons-brewing-huntington-beach.jpeg"
    breweryDataOld[18].image = "assets/devout-brewing-export.jpeg"
    breweryDataOld[19].image = "assets/dirt-road-brewing-corvallis.jpeg"
    breweryData = breweryDataOld
}

function addToCarousel(breweryObj) {
    const carouselImg = document.createElement("img")
    carouselImg.src = breweryObj.image
    document.querySelector("#carousel").append(carouselImg)
}

function carouselButtons () {
    const forward = document.createElement("button")
    const back = document.createElement("button")
    const carousel = document.querySelector("#carousel")
    forward.textContent = "NEXT"
    back.textContent = "BACK"
    forward.addEventListener("click", () => {
        if (carouselMin+4 < breweryData.length) {
        for (let i=0; i<4; i++) {
            carousel.removeChild(carousel.children[2])
        }
        for (let i=carouselMin+4; i<carouselMin+8; i++) {
        addToCarousel(breweryData[i])
        }
        carouselMin = carouselMin + 4
    }
    })
    back.addEventListener("click", () => {
        if (carouselMin != 0) {
            for (let i=0; i<4; i++) {
                carousel.removeChild(carousel.children[2])
            }
            for (let i=carouselMin-4; i<carouselMin; i++) {
                addToCarousel(breweryData[i])
            }
            carouselMin = carouselMin - 4
    }
    })
    carousel.append(back)
    carousel.append(forward)
}

//adds search functionality, Search by type, state, name.
//looks through database using filter, finds matching values and appends them to search results
function addSearchFunction () {
    document.querySelector("#form").addEventListener("submit", (e) => {
        e.preventDefault()
        //Clears out searchResults when button is pressed
        const parent = document.querySelector("#searchResults")
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild)
        }
        parent.textContent = "Search Results"
        //Filters through values and returns results into array
        const matchingBreweries = breweryData.filter (breweryObject => {
            const values = Object.values(breweryObject)
            const searchTerm = e.target.search.value
            return values.find( (str) => {
                if(str){return str.toLowerCase().includes(searchTerm.toLowerCase())}
            })
        });
        //displays each matched brewery
        matchingBreweries.forEach(brewery => {
            displayBrewery(brewery)
        })
    })
}

//displays brewery in search results
function displayBrewery (brewery) {
    const div = document.createElement("div")
    const img = document.createElement("img")
    const name = document.createElement("a")
    const type = document.createElement("h4")
    const cityAndState = document.createElement("h4")
    const favButton = document.createElement("button")
    const commentForm = document.createElement("form")
    const commentList = document.createElement("ul")
    const buttonInput = document.createElement("input")
    const input1 = document.createElement("input")
    const phoneNum = document.createElement("h4")

    img.src = brewery.image
    img.setAttribute("class", "img results")
    name.textContent = brewery.name
    name.setAttribute("class", brewery.name)
    //Conditionally adds hyperlink if link is truthy/is not null
    if (brewery["website_url"]) {
        name.setAttribute("href", brewery["website_url"])
    }
    type.textContent = `Brewery Type: ${brewery["brewery_type"]}`
    cityAndState.textContent = `${brewery.city}, ${brewery.state}`
    favButton.setAttribute("class", "favButton")
    favButton.textContent = "Favorite ☆"
    favButton.addEventListener("click", () => addToFavorites(brewery))
    input1.setAttribute("type", "text")
    input1.setAttribute("name", "comment")
    buttonInput.setAttribute("value", "Comment")
    buttonInput.setAttribute("type", "submit")
    buttonInput.setAttribute("class", "commentButton")
    commentForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const newComment = document.createElement("li")
        commentList.append(newComment)
        newComment.setAttribute("class", "comment")
        newComment.textContent = e.target.comment.value
        commentForm.reset()
    })
    phoneNum.textContent = `Phone ${brewery.phone}`
    commentForm.append(input1)
    commentForm.append(buttonInput)
    div.append(img)
    div.append(name)
    div.append(type)
    div.append(cityAndState)
    div.append(favButton)
    div.append(commentForm)
    div.append(commentList)
    div.append(phoneNum)
    document.querySelector("#searchResults").append(div)
}
//Functionality to add search results to favorite results
function addToFavorites (brewery) {
    const div = document.createElement("div")
    const img = document.createElement("img")
    const name = document.createElement("a")
    const deleteButton = document.createElement("button")
    img.src = brewery.image
    name.textContent = brewery.name
    name.setAttribute("class", brewery.name)
    if (brewery["website_url"]) {
    name.setAttribute("href", brewery["website_url"])
    }
    deleteButton.textContent = "X"
    deleteButton.addEventListener("click", () => {
        div.remove()
    })
    div.append(img)
    div.append(name)
    div.append(deleteButton)
    document.querySelector("#favoritedResults").append(div)
}