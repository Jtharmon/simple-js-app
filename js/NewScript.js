let pokemonRepository = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
let pokemonList = [];


/*eslint-disable */
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
}
/*eslint-disable*/

function addListItem(pokemon) {
  console.log("AddListItem");
  let allPokemon = document.getElementById('pokemon-list');
  console.log(allPokemon);
  var button = document.createElement("button");
  button.classList.add('list-group-item', 'btn');
  button.setAttribute("data-toggle", "modal");
  button.setAttribute("data-target","#pokemon-modal");
  console.log({ button }.classList);
  button.innerText = pokemon.name;
  button.onclick = function () { showDetails(pokemon) };
  allPokemon.appendChild(button);
  //allPokemon.innerHTML += button
}

function showDetails(pokemon) {
  let detailsUrl = pokemon.detailsUrl
  return fetch(detailsUrl).then(function (response) {
    return response.json();
  }).then(function (json) {
    console.log(json)
    pokemon.height = json.height
    pokemon.pokemonSprite = json.sprites.front_default
    pokemon.types = ""
    pokemon.weight = json.weight
    for (let index = 0; index < json.types.length; index++) {
      pokemon.types += json.types[index].type.name + ",";

    }
    showDetailsModal(pokemon)
  })
}


function showDetailsModal(pokemon) {
  let modalTitle = document.getElementById('modal-title');
  console.log("show details modal")
  let modalBody = document.getElementById('modal-body');
  modalTitle.innerText = pokemon.name;
  modalBody.innerText = '';

  let pokemonImage = document.createElement('img');
  pokemonImage.classList.add('pokemon-img');
  pokemonImage.alt = 'A front image of the choosen pokemon';
  pokemonImage.src = pokemon.pokemonSprite

  let pokemonHeight = document.createElement("p");
  pokemonHeight.innerText = `Height: ${pokemon.height || 'N/A'}`;

  let pokemonWeight = document.createElement("p");
  pokemonWeight.innerText = `Weight: ${pokemon.weight || 'N/A'}`;

  let pokemonTypes = document.createElement("p");
  pokemonTypes.innerText = 'Type: ' + (pokemon.types || 'N/A');

  let previousButton = document.createElement('button');
  previousButton.innerText = 'Previous';
  previousButton.onclick = function () {
    if (currentPokemonIndex > 0) {
      currentPokemonIndex--;
      showDetailsModal();
    }
  };

  modalBody.appendChild(pokemonImage);
  modalBody.appendChild(pokemonHeight);
  modalBody.appendChild(pokemonWeight);
  modalBody.appendChild(pokemonTypes);
  modalBody.appendChild(previousButton);
  modalBody.appendChild(nextButton);

  console.log(modalBody)
}