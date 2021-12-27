'use strict';

const currentElementBtnAll = document.querySelectorAll('.current-element-btn');
const currentColumn = document.querySelector('.current-column');

const nextElementBtnAll = document.querySelectorAll('.next-element-btn');
const nextColumn = document.querySelector('.next-column');

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
		element.classList.add('variant');
		//+класс 'card'
		element.innerHTML = `
         <button class="current-element-btn">${elementName}</button>
    `;
		element.querySelector('.current-element-btn').addEventListener('click', (event) => {
			console.log(event.target);
			document.querySelector('.column-name.current-element').textContent = 'Текущий элемент: ' + elementName;
			// currentElementsId = ['0101', '0102', '0103', '0104'];
			// getData(currentElementsId);
			// Добавляем в корзину
		});
		currentColumn.append(element); // Добавляем в конец меню ресторана

		const childrenArray = children;

		if (childrenArray) {
			document.querySelector('.column-name.current-element').textContent = 'Текущий элемент: ' + elementName;
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
		element.classList.add('variant');
		//+класс 'card'
		element.innerHTML = `
    <button class="element-btn preview-btn">${elementName}</button>
    <button class="element-btn go-btn">Перейти</button>
    `;
		element.querySelector('.preview-btn').addEventListener('click', (event) => {
			console.log(event.target);
			document.querySelector('.column-name.next-element').textContent = 'Вариант следующего элемента: ' + elementName;
			// currentElementsId = ['0101', '0102', '0103', '0104'];
			// getData(currentElementsId);
			// Добавляем в корзину
		});
		element.querySelector('.go-btn').addEventListener('click', (event) => {
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
