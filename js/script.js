"use strict";

const currentElementBtnAll = document.querySelector(".current-column");
console.log("~ currentElementBtnAll", currentElementBtnAll);
const nextElementBtnAll = document.querySelector(".next-column");
console.log("~ nextElementBtnAll", nextElementBtnAll);

nextElementBtnAll.addEventListener("click", (event) => {
	console.log(event.target);
});

const renderCurrentItems = () => {
	currentElementBtnAll.innerHTML = "";
};
