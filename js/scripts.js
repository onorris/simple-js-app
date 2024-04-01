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
            console.log("Pokmeon is not correct");
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
        button.innerText = pokemon.name;
        button.classList.add("pokemon-button");
        button.addEventListener('click', function(event) {
            showModal(pokemon);
        })
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
    } //closes addListItem

    //PROMIS function loadList - fetch from API
    function loadList() {
        //converting API info to json 
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
    //PROMIS function loadDetails- 
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (details) {
            //console.log(details)
            // now we add details to the item
            let pokemon = {
                imageUrl: details.sprites.front_default,
                height: details.height,
                types: details.types,
            }        
            return pokemon
            //height: item.height,
            //img: item.sprites.front_default
            return item
        }).then((data) => data)
        .catch(function (e) {
            console.error(e);
        });
        
    }

    //when you click a pokemon, will show details in a modal
    function showModal(pokemon) {
        
            let modal = document.createElement('div');
            modal.classList.add('modal');

            //adds modal content
            let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.innerText = 'Close';
            closeButtonElement.addEventListener('click', hideModal);

            // adds pokemon name as title in modal
            let titleElement = document.createElement('h1');
            titleElement.innerText = pokemon.name;

            details = loadDetails(pokemon)
            console.log(details)

            // add pokemon height information in modal
            let contentElement = document.createElement('p');
            contentElement.innerText = 5;

            modal.appendChild(closeButtonElement);
            modal.appendChild(titleElement);
            modal.appendChild(contentElement);
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
    //closeModal (function) should be called when user clicks Close button, when user presses Esc key, when user clicks outside of the modal.
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