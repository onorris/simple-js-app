//self executing function, calls itself with the () at the end
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');

    // adds pokemon with validations
    function add(pokemon){ //open add fxn
        if (typeof pokemon === "object" && "name" in pokemon)  {
            pokemonList.push(pokemon);
        } else {
            console.log("Pokemon is not correct");
        }
    } // closes add fxn
    
    //returns repository
    function getAll(){
            return pokemonList;
        }
        
    //DOM manipulation
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
    } //closes addListItem

    //PROMIS function loadList - fetch list from API and convert to json
    function loadList(pokemon) {
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
    //PROMIS function loadDetails- fetch details for specific Pokemon
    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        console.log(url)
        return fetch(url)
          .then(function(response) {
           response.json()})
          .then((details) => {
            console.log(details)
            pokemon.imageUrlFront = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types.map((type) => type.type.name);
          })
          .catch((error) => console.error(error));
        }          

    //when you click a pokemon, will show details in a modal
    function showModal(pokemon) {
        
            let modal = document.createElement('div');
            modal.classList.add('modal');

            //Close buttong
            let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.innerText = 'Close';
            closeButtonElement.addEventListener('click', hideModal);

            // adds Pokemon name as title in modal
            let titleElement = document.createElement('h1');
            titleElement.innerText = pokemon.name;

            // add Pokemon height information in modal
            let contentElement = document.createElement('p');
            contentElement.innerText = pokemon.height;
            console.log(loadDetails(pokemon))

            //add Pokemon image
            let imageElement = document.createElement("img");
            imageElement.src = pokemon.imageUrlFront;
            imageElement.alt = pokemon.name;
            imageElement.classList.add("modal-image");

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
    };
      // Function to show details of a Pokémon (loads details and then shows modal)
    function showDetails(pokemon) {
        loadDetails(pokemon).then(() => {
         showModal(pokemon);
        });
    }
    function hideModal() {
        modalContainer.classList.remove('is-visible');
        //when hideModal is called, it replaces the children with nothing
        modalContainer.replaceChildren()
    }
    //ESC to close modal
    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
            hideModal();
        }
    })
    //closeModal (function) should be called when:
    //1) user clicks Close button, 2) when user presses Esc key, 3) when user clicks outside of the modal
    function closeModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');

    //close button 
    let closeButtonElement = document.querySelector('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
  }
                             
    //ALL functions need to be added to return in order to work
    return {
        add: add,
        addListItem: addListItem,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        hideModal: hideModal,
        closeModal: closeModal,
    };
})();

pokemonRepository.loadList().then(function() {
//references the function in the IIFE and data is loaded from the API
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon); 
    });
},);