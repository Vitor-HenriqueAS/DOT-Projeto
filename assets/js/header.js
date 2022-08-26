const myFavorite = document.getElementById('btn-favorite-js')
const myCart = document.getElementById('btn-cart-js')
const addFavorite = document.querySelector('.my-favorites')
const addCart = document.querySelector('.my-cart')

myFavorite.addEventListener('click', _ => {

	let displayF = addFavorite.style.display

	if (displayF == "") {
		addFavorite.style.display = "flex"
		addCart.style.display = ""
	} else { addFavorite.style.display = "" }

})

myCart.addEventListener('click', _ => {

	let displayC = addCart.style.display

	if (displayC == "") {
		addCart.style.display = "flex"
		addFavorite.style.display = ""
	} else { addCart.style.display = "" }
})

// ADICIONAR MEUS FAVORITOS E AO CARRINHO

let listCartMovieEl = []
let listCartPriceEl = []
let listCartImgEl = []

function checkMovie(title, price, img) {

	if (listCartMovieEl.length > 0){

		confirma = listCartMovieEl.indexOf(title)

		if (confirma == -1){
			listCartMovieEl.push(title);
			listCartPriceEl.push(price);
			listCartImgEl.push(img);
			addMovies(title, price);
		}
	}else{
		listCartMovieEl.push(title);
		listCartPriceEl.push(price);
		listCartImgEl.push(img);
		addMovies(title, price);
	}
}

function addMovies(title, price){

	const cartList = document.getElementById('add-movies-js');

	const cartMovieEl = document.createElement('div');
	cartMovieEl.classList.add('movie');
	cartMovieEl.innerHTML += `
		<h4 class="movie-title-cart">${title}</h4>
		<p class="movie-price-cart">R$ ${price}</p>
	`
	cartList.appendChild(cartMovieEl);
}

let listFavoriteMovieEl = []

function checkFavorite(title) {

	if (listFavoriteMovieEl.length > 0){

		confirma = listFavoriteMovieEl.indexOf(title)

		if (confirma == -1){
			listFavoriteMovieEl.push(title);
			addFavorites(title);
		}
	}else{
		listFavoriteMovieEl.push(title);
		addFavorites(title);
	}
}

function addFavorites(title) {

	const favoriteList = document.getElementById('add-favorites-js');

	const favoriteMovieEl = document.createElement('div');
	favoriteMovieEl.classList.add('movie');
	favoriteMovieEl.innerHTML += `
		<h4>${title}</h4>
	`

	favoriteList.appendChild(favoriteMovieEl);
}

// MUDAR DE PÁGINA

const payment = document.querySelector('.finaliza-compra')
const table_body = document.getElementById('table_body')
const table_footer = document.getElementById('table_footer')
let result = 0

function btn_payment () {

	if (listCartMovieEl.length > 0 && listCartPriceEl.length > 0) {

		for (let i = 0; i < listCartMovieEl.length; i++) {

			const productEl = document.createElement('tr');
			productEl.classList.add('productEl');
			productEl.innerHTML = `
				<td class="center">
				<img src= "${listCartImgEl[i]}" class="img-movie-cart" alt="${listCartMovieEl[i]}">
				</td>

				<td class="center">${listCartMovieEl[i]}</td>
				<td class="right">R$ ${listCartPriceEl[i]}</td>
			`
			table_body.appendChild(productEl)

			let num = listCartPriceEl[i].replace(",", ".")
			result += Number(num);
		}
		const totalProduct = document.createElement('tr');
		totalProduct.classList.add('totalEl');
		totalProduct.innerHTML = `
			<tr>
				<th class="left">Total:</th>
				<th class="price-payment right" colspan="2">R$ ${result}</th>
			</tr>
			`
		table_footer.appendChild(totalProduct);

		container_movies.style.display = "none";
		payment.style.display = "flex";

	}
}

function homePage() {
	container_movies.style.display = "flex";
	payment.style.display = "none";
}
