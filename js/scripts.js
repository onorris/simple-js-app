//self executing function, calls itself with the () at the end
//IIFE
let pokemonRepository = (function () {
    //declaring variables
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=155';
  
    // adds pokemon to pokemonList (empty array[] at top) by confirming type and name
    function add(pokemon){ //open add fxn
        if (typeof pokemon === "object" && "name" in pokemon)  {
            pokemonList.push(pokemon);
        } else {
            console.log("Pokemon is not correct");
        }
    }
    
    //returns repository of 150 pokemon
    function getAll(){
            return pokemonList;
        }
        
    //DOM manipulation - function to add button for a given pokemon
    function addListItem(pokemon){ //open addListItem
        let pokemonList = document.querySelector(".list-group");
        let listPokemon = document.createElement("div");
        listPokemon.setAttribute("id", "results");
        let button = document.createElement("button");
        //button information
        button.innerText = pokemon.name;
        //changed classes and attributes to work with Bootstrap
        button.classList.add("btn-primary", "btn-lg", "mb-3");
        button.setAttribute("data-target", "#exampleModal");
        button.setAttribute("data-toggle", "modal");

        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);

        addEventListenerButton(button, pokemon);
    }

    function addEventListenerButton(button, pokemon) {
        button.addEventListener('click', function() {
            showModal(pokemon);
        })
    }

    //PROMIS function fetchAllPokemon - fetch pokemon list from API (just name and url) and convert to json
    function fetchAllPokemon(pokemon) {
        return fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        //forEach loop using json result, for each item
        .then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        })
        .catch(function (e) {
            console.error(e);
        })
    }
    //PROMIS function loadDetails- fetch details for given specific Pokemon (2nd url in API)
    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
       
        return fetch(url)
          .then(function(response) {
           return response.json()})
          .then((details) =>  {
            pokemon.imageUrlFront = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.weight = details.weight;
            pokemon.types = details.types.map((type) => type.type.name);
            pokemon.abilities = details.abilites;
            return pokemon;
          })
          .catch((error) => console.error(error));
        }          

    //building information needed for modal prior to showing it
    function buildModal(pokemon) {
            let modalBody = $(".modal-body");
            let modalHeader = $(".modal-header");
            modalBody.innerHTML = '';
            
            //clear existing content of the modal
            modalBody.empty();
            modalHeader.empty();

            //Modal closes when Close button is clicked. 
            let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.innerText = 'Close';
            
            // adds Pokemon name in modal
            let titleElement = $('<h1 class = "modal-title">' + pokemon.name + '</h1>')
            //console.log(titleElement)
            //add Pokemon image
            let imageElementFront = $('<img class="modal-img" style="width:50%">');
            imageElementFront.attr("src", pokemon.imageUrlFront);
            
            let imageElementBack = $('<img class="modal-img" style= "width:50%">');
            imageElementBack.attr("src", pokemon.imageElementBack);

            // add Pokemon height information in modal
            let heightElement = $("<p>" + "This Pokemon is " + pokemon.height/10 + " m." + "</p>");
            
            //add Pokemon weight information in modal - DOUBLE CHECK IF WEIGHT IS DEFINED?
            let weightElement = $("<p>" + "This Pokemon is " + pokemon.weight/10 + " kg." + "</p>" );

            //add Pokemon type element in modal 
            let typesElement = $("<p>" + "Pokemon type(s): " + pokemon.types + ".</p>");
            
            modalHeader.append(titleElement);
            modalBody.append(imageElementFront);
            modalBody.append(imageElementBack);
            modalBody.append(heightElement);
            modalBody.append(weightElement);
            modalBody.append(typesElement);

    };

// calls loadDetails to get the details and passes that into buildModal to actually show the modal
    function showModal(pokemon){
        loadDetails(pokemon).then((details) => {
            buildModal(details)
        }).catch((error) => {console.error('Error in Show Modal' + error)})
    }

    //Logic used to hide modal when called
     function hideModal() {
        modal.classList.remove('is-visible');
        //when hideModal is called, it replaces the children with nothing
        modal.replaceChildren()
        }

    //ALL functions need to be added to return in order to work
    return {
        add: add,
        addListItem: addListItem,
        addEventListenerButton: addEventListenerButton,
        getAll: getAll,
        fetchAllPokemon: fetchAllPokemon,
        loadDetails: loadDetails,
        showModal: showModal,
        hideModal: hideModal
    };
})();

pokemonRepository.fetchAllPokemon().then(function() {
//references the function in the IIFE and data is loaded from the API
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon); 
    });
},);

function searchFunction() {
    // Declare variables
  var input, filter, li, a, i, txtValue;
  input = document.getElementById('search-bar');
  filter = input.value.toUpperCase();
  li = document.querySelectorAll(".list-group > #results");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("button")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}