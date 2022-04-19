document.addEventListener("DOMContentLoaded", 
    fetch("https://api.openbrewerydb.org/breweries")
    .then(resp => resp.json())
    .then(data => {
    addBrewery()
    addSearch()

}))
//Search by type, state, name.

//Selectors
const carousel = document.querySelector("#carousel")
const form = document.querySelector("form");
const searchResults = document.querySelector("#search-results")
const favoritedResults = document.querySelector("#favorited-results")

function addBrewery(brewery) {
    const brewery = document.createElement("div")
    const breweryName = brewery.name
    const breweryType = brewery.Brewery_type
    const breweryState = brewery.state
    const brewerySite = brewery.Website_url
    const likeButton = document.createElement("button")
    brewery.append(likeButton)

}

//adds search functionality
function addSearch () {
    //looks through database using filter, finds matching values and appends them to search results
}
