const currentColumn = document.querySelector('.current-column > .element-column');
const nextColumn = document.querySelector('.next-column > .element-column');
const currentVideo = document.querySelector('.current-column > .video > video');

let currentElementsId = [];

// Сначала рендерим 1 текущий элемент, потом Массив его вспомогательных, потом Массив следующих элементов

const getData = (currentElementsId, order) => {
	fetch('db/db.json')
		.then((res) => res.json())
		.then((data) => {
			const array = [];
			for (let keyId of currentElementsId) {
				for (let keyDataDb of data.db) {
					if (keyDataDb.id === keyId) {
						array.push(keyDataDb);
					}
				}
			}
			if (order === 'current') {
				renderCurrentElements(array);
			}

			if (order === 'next') {
				renderNextElements(array);
			}
			// localStorage.setItem("goods", JSON.stringify(array)); // Записываем в localStorage
			// window.location.href = "/goods.html"; // Переходим на страницу для отображения товаров
			// renderGoods(array); // Рендерим товары
		});
};

const renderCurrentElements = (array) => {
	const currentColumn = document.querySelector('.current-column');
	array.forEach(({ id, elementName, img, difficulty, previousElements, nextElements, parent, children }) => {
		const element = document.createElement('div');

		element.classList.add('current-element');

		let btn = 'current-element-btn';
		if (parent) {
			btn = 'current-element-variant-btn';
		}

		//+класс 'card'
		element.innerHTML = `
         <button class=${btn}>${elementName}</button>
    `;

		element.querySelector(`.${btn}`).addEventListener('click', (event) => {
			console.log(event.target);
			document.querySelector('.current-column > .column-name').textContent = 'Текущий элемент: ' + elementName;
			const currentVideo = document.querySelector('.current-column > .video > video');
			currentVideo.setAttribute('src', `./db/mp4/${id}.mp4`);
			// currentElementsId = ['0101', '0102', '0103', '0104'];
			// getData(currentElementsId);
			// Добавляем в корзину
		});
		currentColumn.append(element); // Добавляем в конец меню ресторана

		const childrenArray = children;

		if (childrenArray) {
			document.querySelector('.current-column > .column-name').textContent = 'Текущий элемент: ' + elementName;
			getData(childrenArray, 'current');
		}

		const nextElementsArray = nextElements;
		if (nextElementsArray) {
			getData(nextElementsArray, 'next');
		}
	});
};

const renderNextElements = (array) => {
	const nextColumn = document.querySelector('.next-column');

	array.forEach(({ id, elementName, img, difficulty, previousElements, nextElements, parent, children }) => {
		const element = document.createElement('div');
		element.classList.add('next-element');
		// element.classList.add('variant');
		//+класс 'card'
		element.innerHTML = `
    <button class="preview-element-btn">${elementName}</button>
    <button class="go-element-btn">Перейти</button>
    `;
		element.querySelector('.preview-element-btn').addEventListener('click', (event) => {
			console.log(event.target);
			document.querySelector('.next-column > .column-name').textContent = 'Вариант следующего элемента: ' + elementName;
			// currentElementsId = ['0101', '0102', '0103', '0104'];
			// getData(currentElementsId);
			// Добавляем в корзину
		});
		element.querySelector('.go-element-btn').addEventListener('click', (event) => {
			console.log(event.target);
		});

		nextColumn.append(element); // Добавляем в конец меню ресторана

		// const childrenArray = children;
		// if (childrenArray) {
		// 	getData(childrenArray, 'current');
		// }

		// const nextElements = nextElements;
		// if (nextElements) {
		// 	getData(nextElements, 'next');
		// }
	});
};

// setTimeout(() => {
// 	const currentColumn = document.querySelector('.next-column');
// 	currentColumn.innerHTML = '';
// }, 3000);

// console.log('~ currentElementBtnAll', currentElementBtnAll);
// currentElementBtnAll.forEach((item) => {
// 	// console.log(item);
// });
// console.log('~ nextElementBtnAll', nextElementBtnAll);
// nextElementBtnAll.forEach((item) => {
// 	// console.log(item);
// });

currentColumn.innerHTML = '';
nextColumn.innerHTML = '';
currentElementsId = ['0101'];
getData(currentElementsId, 'current');

// console.log('~ currentVideo', currentVideo);
// console.log(currentVideo.getAttribute('src'));
