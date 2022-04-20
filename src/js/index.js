document.addEventListener("DOMContentLoaded", () => {
    fetch("https://api.openbrewerydb.org/breweries")
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        assignImage(data)
        console.log(dataWithImage)
        //dataWithImage.forEach(object => addToCarousel(object))
        addSearchFunction()
})
})

//Global Variables
const carousel = document.querySelector("#carousel")
const searchForm = document.querySelector("#form");
const searchResults = document.querySelector("#search-results")
const favoritedResults = document.querySelector("#favorited-results")
let dataWithImage = []

//Assign images to breweries
function assignImage (data) {
    data[0].image = "char-pikachu.png" //Banjo Brewing pic
    data[1].image = ""
    data[2].image = ""
    //Continue until 19 with Dirt Road Brewing
    dataWithImage = data
}

function addToCarousel(object) {
    const carouselImg = document.createElement("img")
    carouselImg.src = object.image
    document.querySelector("#carousel").append(carouselImg)
    // const searchImg = document.createElement("img")
    // const nameField = document.createElement("")

    // const breweryName = brewery.name
    // const breweryType = brewery["Brewery_type"]
    // const breweryState = brewery.state
    // const brewerySite = brewery["Website_url"]
    // const likeButton = document.createElement("button")
}

//adds search functionality, Search by type, state, name.
//looks through database using filter, finds matching values and appends them to search results
function addSearchFunction () {
    document.querySelector("#form").addEventListener("submit", (e) => {
        e.preventDefault()
        console.log("test")
        dataWithImage.forEach (breweryObject => {
            const values = Object.values(breweryObject)
            const searchTerm = e.target.search.value
            console.log(values)
            console.log(searchTerm)
            for (let string of values) {
                if (string.includes(searchTerm)) {
                    foundBrewery(breweryObject.name)
                    console.log("value was found")
            }
        }
        });
    })
}


//adds searched brewery to search results
function foundBrewery (breweryName) {
    console.log(breweryName)
}