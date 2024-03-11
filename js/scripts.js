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
            pokemonList.push(pokemon);
        }
    function getAll(){
            return pokemonList;
        }
    return {
        add: add,
        getAll: getAll
    };
})();

//adds Pikachu to pokemonRepository
pokemonRepository.add({name: 'Pikachu', height: 0.4, types:'electric'});

pokemonRepository.getAll().forEach(function(pokemon) {
    document.write(pokemon.name + ' is a ' + pokemon.types + ' pokemon type and is this tall: ' + pokemon.height + 'm.  ');
});