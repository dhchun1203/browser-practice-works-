"use strict";

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const CARROT__SIZE = 80;

function initGame() {
	console.log(field);
	addItem("carrot", 5, "img/carrot.png");
	addItem("bug", 5, "img/bug.png");
}

function addItem(className, count, imgPath) {
	const x1 = 0;
	const y1 = 0;
	const x2 = fieldRect.width - CARROT__SIZE;
	const y2 = fieldRect.height - CARROT__SIZE;
	for (let i = 0; i < count; i++) {
		const item = document.createElement("img");
		item.setAttribute("class", className);
		item.setAttribute("src", imgPath);
		item.style.position = "absolute";
		const x = randomNumber(x1, x2);
		const y = randomNumber(y1, y2);
		item.style.left = `${x}px`;
		item.style.top = `${y}px`;
		field.appendChild(item);
	}
}

function randomNumber(min, max) {
	return Math.random() * (max - min) + min;
}

const playtBtn = document.querySelector(".game__button");
playtBtn.addEventListener("click", () => {
	initGame();
	timer();
});
function timer() {
	var sec = 30;
	var timer = setInterval(function () {
		document.querySelector(".game__timer").innerText = `00:${sec}`;
		sec--;
		if (sec < 0) {
			clearInterval(timer);
		}
	}, 1000);
}
