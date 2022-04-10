console.log('api is running');

//haal de lijst 'ul' op uit de html
// const list = document.querySelector('.list')
// const URL = 'https://pokeapi.co/api/v2/pokemon/'

// //vraag de data op van de api url
// getData(URL).then(function(data){
//   //haal de pokemon lijst uit de resultaten
//   const allPokemon = data.results;
  
//   //loop over alle pokemons heen, pokemon is 1 pokemon in de lijst
//   allPokemon.forEach(function(pokemon) {
//     //maak een li element voor iedere pokemon met de pokemon naam
//      const pokemonListElement = 
//         `
//         <li> ${pokemon.name} </li>
//         `
//      //'insert' de pokemon 'li' in de lijst.
      //list.insertAdjacentHTML('beforeend', pokemonListElement)
//   })
// })

// //returns JSON.
// async function getData(url){
//   const result = await fetch(url)
//   const data = await result.json()
//   return data;
// }

//pickupline api
const list = document.querySelector('.pickupLines');
const newURL = 'https://getpickuplines.herokuapp.com/lines/random'

function getRandomPickupLine() {
  fetch('https://getpickuplines.herokuapp.com/lines/random')
    .then(res => res.json())
    .then(data => {
    const lineListElement = `<li> ${data.line}</li>`
    list.insertAdjacentHTML('beforeend',lineListElement);

  })
};

//nieuwe
const katKnop = document.getElementById('cat_btn');
const result = document.getElementById('result');

cat_btn.addEventListener('click', getRandomCat);

function getRandomCat() {
	fetch('https://aws.random.cat/meow')
		.then(res => res.json())
		.then(data => {
			result.insertAdjacentHTML = `<img src=${data.file} alt="cat" />`
		});
}

//api voor het sharen
console.log('js is working');

const shareData = {
    title: 'School Match',
    text: 'Help je een match te vinden met een leuke school',
    url: 'http://pacific-taiga-01066.herokuapp.com/'
  }

  const btn = document.querySelector('button');
  const resultPara = document.querySelector('.result');

  // web share op de button on click
  btn.addEventListener('click', async () => {
    try {
      await navigator.share(shareData)
      resultPara.textContent = 'Deel de school match app'
    } catch(err) {
      resultPara.textContent = 'Error: ' + err
      console.log('browser support geen Web Share API')
      //google chrome support het niet volledig. Probeer in Safari
    
    }
  });






