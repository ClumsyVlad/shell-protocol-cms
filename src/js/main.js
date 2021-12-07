const html = document.querySelector('html');
const body = document.querySelector('.body');
const headerMenu = body.querySelector('.header__menu');
const burger = body.querySelector('.burger');

body.addEventListener('click', (event) => {
	if (event.target.classList.contains('link')) {
		body.classList.remove('burger-active');
		html.classList.remove('burger-active');
		burger.classList.remove('is-active');
		headerMenu.classList.remove('is-active');
	} else if (event.target == burger) {
		if (burger.classList.contains('is-active')) {
			body.classList.remove('burger-active');
			html.classList.remove('burger-active');
			burger.classList.remove('is-active');
			headerMenu.classList.remove('is-active');
		} else {
			body.classList.add('burger-active');
			html.classList.add('burger-active');
			burger.classList.add('is-active');
			headerMenu.classList.add('is-active');
		}
	} else if (
		!event.target.classList.contains('link') &&
		event.target != headerMenu &&
		event.target != burger &&
		burger.classList.contains('is-active')
	) {
		body.classList.remove('burger-active');
		html.classList.remove('burger-active');
		burger.classList.remove('is-active');
		headerMenu.classList.remove('is-active');
	}
})