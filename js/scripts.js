//self executing function, calls itself with the () at the end
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // adds pokemon
    function add(pokemon){
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "height" in pokemon &&
            "types" in pokemon
        )  {
            pokemonRepository.push(pokemon);
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
        let list = document.querySelector('.pokemon-list')
        let listItem = document.createElement('li')
        let button = document.createElement('button')
        button.innerText = pokemon.name
        button.classList.add('pokemon-button')
        button.addEventListener('click', function(showDetails) {
            console.log(pokemon);
        })
        listItem.appendChild(button)
        list.appendChild(listItem)  
    }
    //PROMIS function - fetch 
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
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            console.log(pokemon);
        });
    }

    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

pokemonRepository.loadList().then(function() {
//references the function in the IIFE and data is loaded from the API
pokemonRepository.getAll().forEach(function (pokemon){
    pokemonRepository.addListItem(pokemon); 
});
});