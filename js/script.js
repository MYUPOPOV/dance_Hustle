'use strict';

const currentElementBtnAll = document.querySelectorAll('.current-element-btn');
const nextElementBtnAll = document.querySelectorAll('.next-element-btn');
let currentElementsId = [];

// Сначала рендерим 1 текущий элемент, потом Массив его вспомогательных, потом Массив следующих элементов

const getData = (currentElementsId) => {
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
			renderCurrentElements(array);

			// localStorage.setItem("goods", JSON.stringify(array)); // Записываем в localStorage
			// window.location.href = "/goods.html"; // Переходим на страницу для отображения товаров
			// renderGoods(array); // Рендерим товары
		});
};

const renderCurrentElements = (array) => {
	const currentColumn = document.querySelector('.current-column');
	currentColumn.innerHTML = '';

	array.forEach(({ id, elementName, img, difficulty, previousElements, extElements, parent, children }) => {
		const element = document.createElement('div');
		element.classList.add('current-element');
		element.classList.add('variant');
		//+класс 'card'
		element.innerHTML = `
         <button class="current-element-btn">${elementName}</button>
    `;
		element.querySelector('.current-element-btn').addEventListener('click', (event) => {
			console.log(event.target);
			currentElementsId = ['0101', '0102', '0103', '0104'];
			getData(currentElementsId);
			// Добавляем в корзину
		});
		currentColumn.append(element); // Добавляем в конец меню ресторана
	});

	//   // Для каждого обхекта БД
	//   const card = document.createElement("div"); // card = контейнер блюда
	//   card.classList.add("card"); //+класс 'card'
	//   // Происываем содержимое контейнера блюда
	//   card.innerHTML = `
	//     <img src="${image}" alt="${name}" class="card-image" />
	//     <div class="card-text">
	//       <div class="card-heading">
	//         <h3 class="card-title card-title-reg">${name}</h3>
	//       </div>
	//       <div class="card-info">
	//         <div class="ingredients">
	//         ${description}
	//         </div>
	//       </div>
	//       <div class="card-buttons">
	//         <button class="button button-primary button-add-cart">
	//           <span class="button-card-text">В корзину</span>
	//           <span class="button-cart-svg"></span>
	//         </button>
	//         <strong class="card-price-bold">${price} ₽</strong>
	//       </div>
	//     </div>
	//   </div>
	//   `;
	//   /* Обработчик события: нажатие на блюдо */
	//   card.querySelector(".button-card-text").addEventListener("click", () => {
	//     addToCart({ name, price, id, count: 1 }); // Добавляем в корзину
	//   });
	//   cardsMenu.append(card); // Добавляем в конец меню ресторана
	// });
};

setTimeout(() => {
	const currentColumn = document.querySelector('.next-column');
	currentColumn.innerHTML = '';
}, 3000);

console.log('~ currentElementBtnAll', currentElementBtnAll);
currentElementBtnAll.forEach((item) => {
	// console.log(item);
});
console.log('~ nextElementBtnAll', nextElementBtnAll);
nextElementBtnAll.forEach((item) => {
	// console.log(item);
});

currentElementsId = ['0101'];
getData(currentElementsId);

// nextElementBtnAll.addEventListener("click", (event) => {
// 	console.log(event.target);
// });

// const renderCurrentItems = () => {
// 	currentElementBtnAll.innerHTML = "";
// };
