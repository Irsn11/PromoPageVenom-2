
const menuBurger = document.querySelector('.burger')
const navMenu = document.querySelector('.nav__menu')
const close = document.querySelector('.close')
const underway = document.querySelectorAll('._underway')








menuBurger.addEventListener('click', () => {
	navMenu.classList.add('is-active');
	close.classList.add('is-active');
});

close.addEventListener('click', () => {
	navMenu.classList.remove('is-active')
	close.classList.remove('is-active')
});

//всплывающая форма
const hideForm = document.querySelector('.hide-form');
const orderTicket = document.querySelector('.order-ticket');
const orderTrigger = document.querySelector('.order-trigger');
const orderTicketForm = document.querySelector('.order-ticket__form');


const orderTicketFormWrapper = document.querySelector('.order-ticket__form-wrapper');
const orderTicketPreloaderWrapper = document.querySelector('.order-ticket__preloader-wrapper');
const orderTicketThanksWrapper = document.querySelector('.order-ticket__thanks-wrapper');
const orderTicketThanksName = document.querySelector('.order-ticket__thanks-name');

window.onload = function () {
	setTimeout(() => {
		hideForm.style.bottom = -orderTicket.offsetHeight + 'px';
	}, 1000)
}


/* Отправляем данные на сервер*/
const sendData = (data, callback, callbefore) => {
	if (callbefore) callbefore();
	fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json; charset=utf-8'
		},
		body: JSON.stringify(data)
	}).then(response => {
		return response.json()
	}).then(callback)
}

/* Показываем загрузку*/
const showPreload = (data) => {
	orderTicketFormWrapper.style.display = 'none';
	orderTicketPreloaderWrapper.style.display = 'block';


}

/* Показываем спасибо-за-отправку*/
const showThankYou = (data) => {

	setTimeout(() => {
		orderTicketPreloaderWrapper.style.display = 'none';
		orderTicketThanksWrapper.style.display = 'block';
		orderTicketThanksName.textContent = data.name;
	}, 2000)


}


//скрыть/показать форму
orderTrigger.addEventListener('click', () => {
	hideForm.classList.toggle('hide-form-active')
	if (!(hideForm.classList.contains("hide-form-active"))) {
		hideForm.style.bottom = -orderTicket.offsetHeight + 'px';
		orderTicketThanksWrapper.style.display = 'none';
		orderTicketFormWrapper.style.display = 'flex';
		hideForm.style.bottom = -orderTicket.offsetHeight + 'px';
	}

})

orderTicketForm.addEventListener('change', (event) => {
	const tar = event.target;
	const label = tar.labels[0];
	if (label && tar.value) {
		label.classList.add('order-ticket__label-focus')
	}
	else { label.classList.remove('order-ticket__label-focus') }
})

orderTicketForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const formData = new FormData(orderTicketForm)
	const data = {};

	for (const [name, value] of formData) {
		data[name] = value;
	}
	sendData(data, showThankYou, showPreload);
})

for (let i = 0; i <= underway.length; i++) {
	underway[i].onclick = () => {
		alert('данная ссылка находится в стадии разработки');
	};
}