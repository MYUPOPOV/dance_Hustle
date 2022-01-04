/*jshint esversion: 6 */

const columnName = document.querySelectorAll('.column-name');

// Сначала рендерим 1 текущий элемент, потом массив его вариантов, потом массив следующих элементов
const getData = (currentElementsId, order) => {
	fetch('db/db.json')
		.then((res) => res.json())
		.then((data) => {
			const array = [];
			// console.log(currentElementsId);
			for (let keyId of currentElementsId) {
				for (let keyDataDb of data.db) {
					if (keyDataDb.id === keyId) {
						array.push(keyDataDb);
					}
				}
			}
			if (order === 'current') {
				renderCurrentElements(array);
				// console.log(array);
			}
			if (order === 'next') {
				renderNextElements(array);
			}
			// localStorage.setItem("goods", JSON.stringify(array)); // Записываем в localStorage
			// window.location.href = "/goods.html"; // Переходим на страницу для отображения товаров
			// renderGoods(array); // Рендерим товары
		});
};

const getChildren = (id) => {
	fetch('db/db.json')
		.then((res) => res.json())
		.then((data) => {
			const array = [];
			for (let key of data.db) {
				if (key.id.substring(0, 3) === id.substring(0, 3) && key.id.substring(3) !== '01') {
					array.push(key.id);
				}
			}
			// return array;
			// console.log(array);
			getData(array, 'current');
		});
};

const restart = () => {
	clearColumns();
	showCurrentElement('Базовый шаг', '01001');
	getData(['01001'], 'current');
};

const showCurrentElement = (elementName, id) => {
	document.querySelector('.current-column > .column-name > .name').textContent = elementName;
	const currentVideo = document.querySelector('.current-column > .video > video');
	currentVideo.setAttribute('src', `./db/mp4/${id}.mp4`);
};

const showNextElement = (elementName, id) => {
	document.querySelector('.next-column > .column-name > .name').textContent = elementName;
	const nextVideo = document.querySelector('.next-column > .video > video');
	nextVideo.setAttribute('src', `./db/mp4/${id}.mp4`);
};

/* Очистка всех столбцов перед рендером  */
const clearColumns = () => {
	const currentColumnElements = document.querySelector('.current-column > .element-column');
	const nextColumnElements = document.querySelector('.next-column > .element-column');
	currentColumnElements.innerHTML = '';
	nextColumnElements.innerHTML = '';
	const nextVideo = document.querySelector('.next-column > .video > video');
	nextVideo.setAttribute('src', `./db/mp4/0000.mp4`);
	document.querySelector('.current-column > .column-name > .name').textContent = '';
	document.querySelector('.next-column > .column-name > .name').textContent = '';
};

/* Анимация кнопок при наведении */
const btnMouseEnterLeave = function (btnClass, colorMain, colorEnter) {
	this.querySelector(`.${btnClass}`).addEventListener('mouseenter', (event) => {
		event.target.style.background = colorEnter;
	});
	this.querySelector(`.${btnClass}`).addEventListener('mouseleave', (event) => {
		event.target.style.background = colorMain;
	});
};

const renderCurrentElements = (array) => {
	const currentColumn = document.querySelector('.current-column > .element-column');
	array.forEach(({ id, elementName, nextElements }) => {
		const element = document.createElement('div');
		element.classList.add('current-element');

		let btnClass, colorMain, colorEnter;
		if (id.substring(3) === '01') {
			btnClass = 'current-element-btn';
			colorMain = '#A0DCBE';
			colorEnter = '#6edfa6';
		} else {
			btnClass = 'current-element-variant-btn';
			colorMain = '#FAFABE';
			colorEnter = '#f5f591';
		}
		element.innerHTML = `<button class=${btnClass}>${elementName}</button>`;
		element.querySelector(`.${btnClass}`).addEventListener('click', () => showCurrentElement(elementName, id));
		btnMouseEnterLeave.bind(element)(btnClass, colorMain, colorEnter);
		currentColumn.append(element);

		if (id.substring(3) === '01') {
			getChildren(id);
		}
		if (nextElements) {
			getData(nextElements, 'next');
		}
	});
};

const renderNextElements = (array) => {
	const nextColumn = document.querySelector('.next-column > .element-column');
	array.forEach(({ id, elementName, nextElements }) => {
		const element = document.createElement('div');
		element.classList.add('next-element');
		element.innerHTML = `
    <button class="preview-element-btn">${elementName}</button>
    <button class="go-element-btn">Go</button>`;
		// element.querySelector('.go-element-btn').style.display = 'none';
		element.querySelector('.preview-element-btn').addEventListener('click', () => {
			showNextElement(elementName, id);
			// element.querySelector('.go-element-btn').style.display = 'block';
		});
		btnMouseEnterLeave.bind(element)('preview-element-btn', '#A0DCBE', '#6edfa6');
		btnMouseEnterLeave.bind(element)('go-element-btn', '#FAFABE', '#f5f591');

		/* Перезагрузка страницы при нажатии на шапку таблицы */
		element.querySelector('.go-element-btn').addEventListener('click', () => {
			clearColumns();
			showCurrentElement(elementName, id);
			getData([id], 'current');
		});
		nextColumn.append(element);
	});
};

columnName.forEach((item) => {
	item.addEventListener('click', restart);
	item.addEventListener('mouseenter', () => {
		item.style.cursor = 'pointer';
	});
});

restart();
