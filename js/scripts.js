//self executing function, calls itself with the () at the end
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // adds pokemon with validations
    function add(pokemon){
        if (
            typeof pokemon === "object" &&
            "name" in pokemon //&"detailsUrl" in pokemon
        )  {
            pokemonList.push(pokemon);
        } else {
            console.log("Pokmeon is not correct");
        }
    }
    //returns repository
    function getAll(){
            return pokemonList;
        }
    //DOM manipulation
    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list");
        let listPokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("pokemon-button");
        button.addEventListener('click', function(event) {
            showDetails(pokemon);
        })
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
    }
    //PROMIS functions loadList and loadDetails - fetch 
    function loadList() {
        //converting API info to json 
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            //forEach loop using json result, for each item
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // now we add details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }
        //when you click a pokemon, will show details in console
function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
            console.log(pokemon);
        });
}
    
    //ALL functions need to be added to return in order to work
    return {
        add: add,
        addListItem: addListItem,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
    };
})();

pokemonRepository.loadList().then(function() {
//references the function in the IIFE and data is loaded from the API
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon); 
    });
},);