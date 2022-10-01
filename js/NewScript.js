let pokemonRepository = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
let pokemonList = [];

 //load list
 function loadList() {
    console.log("Load List");
    return fetch(pokemonRepository).then(function (response) {
    return response.json();
  }).then(function (json) {
    json.results.forEach(function (item) {
      let pokemon = {
        name: item.name,
        detailsUrl: item.url
      };
      pokemonList.push(pokemon);
      addListItem(pokemon);
      console.log(pokemon);
    });
  }).catch(function (e) {
    console.error(e);
  })
};

function addListItem(pokemon) {
    console.log("AddListItem");
    let allPokemon = document.getElementById('pokemon-list');
    console.log(allPokemon);
    var button = document.createElement("button");
    button.innerText = pokemon.name;
    button.onclick = function(){showDetails(pokemon)}; 
    allPokemon.appendChild(button);
    //allPokemon.innerHTML += button
  };

function showDetails(pokemon) {
    let detailsUrl=pokemon.detailsUrl
    return fetch(detailsUrl).then(function (response) {
        return response.json();
    }).then(function (json) {
        console.log(json)
        pokemon.height=json.height
        pokemon.pokemonSprite=json.sprites.front_default
        showDetailsModal(pokemon)
    })
}


function showDetailsModal(pokemon) {
    let modalContainer = document.querySelector('.pokemon-details-modal');

    modalContainer.innerText = '';

    // create all elements in the DOM
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let title = document.createElement('h1');
    title.innerText = pokemon.name;

    let height = document.createElement('p');
    height.innerText = 'Height: ' + pokemon.height;

    let image = document.createElement('img');
    image.src = pokemon.pokemonSprite;

    // appends the above elements to the modal container
    modal.appendChild(title);
    modal.appendChild(height);
    modal.appendChild(image);
    modalContainer.appendChild(modal);

    // hides the modal when clicking on the modal container
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    })

    modalContainer.classList.add('is-visible');
}