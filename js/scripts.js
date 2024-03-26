//self executing function, calls itself with the () at the end
let pokemonRepository = (function () {
    let pokemonList = [    
    {name: 'Bulbasaur',
    height: 0.7,
    types: [
        'grass',
        'poison',
    ]},
    {name: 'Charmander',
    height: 0.6,
    types: [
        'fire'
    ]},
    {name: 'Dratini',
    height: 1.8,
    types: [
        'dragon'
    ]}]

    function add(pokemon){
        if (typeof pokemon !== 'object' ){//|| typeof pokemon.name !== 'string' || typeof pokemon.height !== 'number' || typeof pokemon.types !== 'object' ){
            return alert("Cannot add to list")
        }
        else {pokemonList.push(pokemon);
        }
    }
    function getAll(){
            return pokemonList;
        }

    // filter array items based on search criteria (query
    function filterPokemon(pokemon) {
        return pokemonList.filter((el) => el.name === pokemon)
    }
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
    function showDetails(pokemon){
        console.log(pokemon)
    }

    return {
        filterPokemon: filterPokemon,
        add: add,
        getAll: getAll,
        addListItem: addListItem
    }
    ;
})();

//adds Pikachu to pokemonRepository
pokemonRepository.add({name: 'Pikachu', height: 0.4, types:'electric'});

filtered = pokemonRepository.filterPokemon('Dratini')
console.log(filtered)

//references the function in the IIFE
pokemonRepository.getAll().forEach(function (pokemon){
    pokemonRepository.addListItem(pokemon); 
})