const pokemonName = document.querySelector('.pokemon_name'); // busca span com nome 
const pokemonNumber = document.querySelector('.pokemon_number'); // busca span com id
const pokemonImage = document.querySelector('.pokemon_image'); // busca img

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 143;


const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); // buscando dados da api

    if(APIResponse.status === 200){    
    const data = await APIResponse.json(); // formatando dados para json
    return data;    // retorna a função com os dados
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';

    const data = await fetchPokemon(pokemon); // chama a funcao com input 'id'
    if(data) {    
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name; //escreve na tela o nome do pokemon
    pokemonNumber.innerHTML = data.id; //escreve na tela o numero do pokemon
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']
    ['animated']['front_default']; // renderiza a img
    input.value= '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :(';
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => { 
    event.preventDefault(); // impede a pagina de carregar
    
    renderPokemon(input.value.toLowerCase()); //chama a funcao passando o valor do input
    input.value = '';
});

buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1) {
searchPokemon -=1;
renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => { 
searchPokemon += 1;
renderPokemon(searchPokemon);
    
});

renderPokemon(searchPokemon);

