document.addEventListener("DOMContentLoaded", () => {
    fetch("https://api.openbrewerydb.org/breweries")
    .then(resp => resp.json())
    .then(breweryDataOld => {
        assignImage(breweryDataOld)
        console.log(breweryData)
        //breweryData.forEach(brewery => addToCarousel(brewery))
        addSearchFunction()
})
})

//Global Variables
// const carousel = document.getElementById("carousel")
const searchForm = document.querySelector("#form");
const searchResults = document.querySelector("#searchResults")
const favoritedResults = document.querySelector("#favorited-results")
let breweryData = []

//Assigns images to breweries and saves the updated info in breweryData
function assignImage (breweryDataOld) {
    breweryDataOld[0].image = "char-pikachu.png" //Banjo Brewing pic
    //breweryDataOld[1].image = ""
    //breweryDataOld[2].image = ""
    //Continue until 19 with Dirt Road Brewing
    breweryData = breweryDataOld
}

function addToCarousel(breweryObj) {
    const carouselImg = document.createElement("img")
    carouselImg.src = breweryObj.image
    document.querySelector("#carousel").append(carouselImg)
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
    })
    phoneNum.textContent = brewery.phone
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