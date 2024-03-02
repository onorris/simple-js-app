let pokemonList = [
    {name: 'Bulbasaur',
    height: 7,
    types: [
        'grass',
        'poison'
    ]},
    {name: 'Charmander',
    height: 6,
    types: [
        'fire'
    ]},
    {name: 'Dratini',
    height: 18,
    types: [
        'dragon'
    ]}
]
for (let i = 0; i <pokemonList.length; i++) {
    document.write('<p>'+pokemonList[i].name + ' (height: ' + pokemonList[i].height+')'+'<p/>')
}