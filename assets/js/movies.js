// API

const API_KEY  = 'api_key=29f4068968006b32c2ef2a07ead8b41b';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL + 'discover/movie?sort_by=popularity.desc&' + API_KEY + '&language=pt-BR';
const SEARCH_URL = BASE_URL + 'search/movie?' + API_KEY;

const IMG_URL = 'https://image.tmdb.org/t/p/w500/'

// TODOS OS GENEROS

const all_genres = [
	{ "id": 28, 	"name": "Ação" },
	{ "id": 12, 	"name": "Aventura" },
	{ "id": 16, 	"name": "Animação" },
	{ "id": 35, 	"name": "Comédia"},
	{ "id": 80, 	"name": "Crime"},
	{ "id": 99, 	"name": "Documentário"},
	{ "id": 18, 	"name": "Drama"},
	{ "id": 10751,"name": "Família"},
	{ "id": 14,		"name": "Fantasia"},
	{ "id": 36,		"name": "História"},
	{ "id": 27,		"name": "Terror"},
	{ "id": 10402,"name": "Música"},
	{ "id": 9648,	"name": "Mistério"},
	{ "id": 10749,"name": "Romance"},
	{ "id": 878,	"name": "Ficção científica"},
	{ "id": 10770,"name": "TV Movie"},
	{ "id": 53,		"name": "Thriller"},
	{ "id": 10752,"name": "Guerra"},
	{ "id": 37,		"name": "Faroeste"}
]

const container_movies = document.getElementById('container_movies');
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')

var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalPages = 100;

const genres = all_genres.reduce((all_genres, {id, name}) => {
  all_genres[id] = name;
  return all_genres;
}, {});

getMovies(API_URL);

function getMovies(url) {
  lastUrl = url;

	fetch(url).then(res => res.json()).then(data => {

		if(data.results.length !== 0){
			showMovies(data.results);
			currentPage = data.page;
			nextPage = currentPage + 1;
			prevPage = currentPage - 1;
			totalPages = data.total_pages;

			current.innerText = currentPage;

			if(currentPage <= 1){
				prev.classList.add('disabled');
				next.classList.remove('disabled')

			}else if(currentPage >= totalPages){
				prev.classList.remove('disabled');
				next.classList.add('disabled')

			}else{
				prev.classList.remove('disabled');
				next.classList.remove('disabled')
			}

		} else{
			container_movies.innerHTML= `<h1 class="no-results">Nenhum resultado encontrado</h1>`
		}

		//console.log(data.results);
	})
}

function showMovies(data) {

	container_movies.innerHTML = "";

	data.forEach(movie => {
		const {title, poster_path, vote_average, release_date, genre_ids} = movie;

		const movieGenres = genre_ids && genre_ids.map(id => genres[id]);

		const movieEl = document.createElement('div');
		movieEl.classList.add('card');
		movieEl.innerHTML = `
			<figure class="card__img">
		 		<img src= "${IMG_URL+poster_path}" class="img-movie" alt="${title}">
		 		<img class="favorite" src="assets/images/coracao-b.png"  onclick="checkFavorite('${title}')" alt="Heart Icon">
		 		<figcaption class="date">
					${release_date.split("-").reverse().join("/")}
				</figcaption>
			</figure>

		 	<div class="card__text">
		 		<h1 class="title">${title}</h1>
		 		<div class="details">
		 			<div>
					 	<img src="assets/images/estrela.png" alt="Star Icon">
		 				<span class="${getColor(vote_average)}"> ${vote_average} </span>
					</div>
					<span class="genres">${movieGenres}</span>
		 		</div>

		 		<p class="price">R$ ${getPrice(vote_average)}</p>

		 		<div>
					<button type="button" onclick="checkMovie('${title}','${getPrice(vote_average)}','${IMG_URL+poster_path}')" class="btn-add">
						Adicionar
					</button>
				</div>
		 	</div>
			`
		container_movies.appendChild(movieEl);
	})
}

// TROCA ENTRE PÁGINAS (20 FILMES CADA) 5 PAGINAS

prev.addEventListener('click', () => {
  if(prevPage > 0){
    pageCall(prevPage);
  }
})

next.addEventListener('click', () => {
  if(nextPage <= totalPages){
    pageCall(nextPage);
  }
})

function pageCall(page){
  let urlSplit = lastUrl.split('?');
  let queryParams = urlSplit[1].split('&');
  let key = queryParams[queryParams.length -1].split('=');
  if(key[0] != 'page'){
    let url = lastUrl + '&page='+page
    getMovies(url);
  }else{
    key[1] = page.toString();
    let a = key.join('=');
    queryParams[queryParams.length -1] = a;
    let b = queryParams.join('&');
    let url = urlSplit[0] +'?'+ b
    getMovies(url);
  }
}

// BARRA DE PESQUISA

let search = document.getElementById('search-txt')
let btnSearch = document.getElementById('search-btn')

btnSearch.addEventListener('click', (e) => {
	e.preventDefault();

	if(search.value.length > 0) {
		const searchTerm = search.value;

		getMovies(SEARCH_URL + '&query=' + searchTerm)
	}else {
		getMovies(API_URL)
	}
})

// COR E PREÇO

function getColor(vote) {

	if(vote >= 8) return 'green';

	else if(vote >= 5) return 'orange';

	else return 'red';
}

function getPrice(vote) {

	if(vote >= 8) return '29,99';

	else if(vote >= 5) return '14,99';

	else return '8,99';
}
