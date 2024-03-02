let pokemonList = [
    {name: 'Bulbasaur',
    height: 0.7,
    types: [
        'grass',
        'poison'
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
//For loop listing Pokemon name and height, adds comment if greater than 1
for (let i = 0; i <pokemonList.length; i++) {
    if (pokemonList[i].height > 1) {
        result = ' - Wow, that\'s big!'
    } else {
        result = ''
    }
   document.write('<p>'+pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')'+ result +'<p/>')    
 
}