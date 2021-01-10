"use strict";

const CARROT__SIZE = 80;
const CARROT__COUNT = 5;
const BUG__COUNT = 5;

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");

function initGame() {
	console.log(field);
	addItem("carrot", CARROT__COUNT, "img/carrot.png");
	addItem("bug", BUG__COUNT, "img/bug.png");
	// gameBtn.innerHTML = `<i class="fas fa-stop"></i>`;
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

gameBtn.addEventListener("click", () => {
	initGame();
	timer();
	counter();
});

function timer() {
	let sec = 30;
	gameTimer.classList.add("active");
	const timer = setInterval(function () {
		gameTimer.innerText = `0:${sec}`;
		sec--;
		if (sec < 0) {
			clearInterval(timer);
		}
	}, 1000);
}

const gameScore = document.querySelector(".game__score");
function counter() {
	gameScore.classList.add("active");
	const carrotNum = document.querySelectorAll(".carrot");
	gameScore.innerText = `${carrotNum.length}`;
}
