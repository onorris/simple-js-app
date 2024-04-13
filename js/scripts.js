//self executing function, calls itself with the () at the end
//IIFE
let pokemonRepository = (function () {
    //declaring variables
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');
  
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
        let pokemonList = document.querySelector(".pokemon-list");
        let listPokemon = document.createElement("li");
        let button = document.createElement("button");
        //button information
        button.innerText = pokemon.name;
        button.classList.add("pokemon-button");
        button.addEventListener('click', function(event) {
            showModal(pokemon);
        })
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
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
            pokemon.types = details.types.map((type) => type.type.name);
            return pokemon;
          })
          .catch((error) => console.error(error));
        }          

    //building information needed for modal prior to showing it
    function buildModal(pokemon) {
            let modalBody = $(".modal-body");
            let modalHeader = $(".modal-header");
            let modalTitle = $(".modal-title");
            
            //clear existing content of the modal
            modalTitle.empty();
            modalBody.empty();
            modalHeader.empty();
        
            let modal = document.createElement('div');
            modal.classList.add('modal');

            //Modal closes when Close button is clicked. 
            let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.innerText = 'Close';
            
            // adds Pokemon name in modal
            let titleElement = $("<h1>" + pokemon.name + "</h1>")
            
            // add Pokemon height information in modal
            let contentElement = document.createElement('p');
            contentElement.innerText = "This Pokemon is " + pokemon.height/10 + " m.";
            
            //add Pokemon image
            

            //let imageElement = document.createElement("img");
            //imageElement.src = pokemon.imageUrlFront;
            //imageElement.alt = pokemon.name;
            //imageElement.classList.add("modal-image");

            modal.appendChild(closeButtonElement);
            modal.appendChild(titleElement);
            modal.appendChild(contentElement);
            modal.appendChild(imageElement);
            modalContainer.appendChild(modal);

            modalContainer.classList.add('is-visible');

            //click outside of modal container closes it
            modalContainer.addEventListener('click', (e) => {
                let target = e.target;
                if (target === modalContainer) {
                    hideModal();
                }
            })

            //ESC button closes modal
            window.addEventListener('keydown', (e) => {
                let modalContainer = document.querySelector('#modal-container');
                if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
                hideModal();
            }
        })
            //Adds hideModal to the close button within the modal
            closeButtonElement.addEventListener('click', hideModal);
    };
// calls loadDetails to get the details and passes that into buildModal to actually show the modal
    function showModal(pokemon){
        loadDetails(pokemon).then((details) => {
            buildModal(details)
        }).catch((error) => {console.error('Error in Show Modal' + error)})
    }

    //Logic used to hide modal when called
    function hideModal() {
        modalContainer.classList.remove('is-visible');
        //when hideModal is called, it replaces the children with nothing
        modalContainer.replaceChildren()
    }

    //ALL functions need to be added to return in order to work
    return {
        add: add,
        addListItem: addListItem,
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