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
    ]}
]

pokemonList.forEach(function(pokemon) {
    document.write(pokemon.name + ' is a ' + pokemon.types + ' pokemon type and is this tall: ' + pokemon.height + '.  ');
});
