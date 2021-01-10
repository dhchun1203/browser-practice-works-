"use strict";

const CARROT__SIZE = 80;
const CARROT__COUNT = 5;
const BUG__COUNT = 5;
const GAME__DURATION_SEC = 5;

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

const popUp = document.querySelector(".pop-up");

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener("click", () => {
	if (started) {
		stopGame();
	} else {
		startGame();
	}
	started = !started;
	counter();
});

function startGame() {
	initGame();
	showStopButton();
	showTimerAndScore();
	startGameTimer();
}
function stopGame() {
	stopGameTimer();
	hideGameButton();
	showPopUpWithText("REPLAY❓");
}

function showStopButton() {
	const icon = gameBtn.querySelector(".fa-play");
	icon.classList.add("fa-stop");
	icon.classList.remove("fa-play");
}

function hideGameButton() {
	gameBtn.style.visibility = "hidden";
}

function showTimerAndScore() {
	gameTimer.style.visibility = "visible";
	gameScore.style.visibility = "visible";
}
function startGameTimer() {
	let remainingTimeSec = GAME__DURATION_SEC;
	updateTimerText(remainingTimeSec);
	timer = setInterval(() => {
		if (remainingTimeSec <= 0) {
			clearInterval(timer);
			return;
		}
		updateTimerText(--remainingTimeSec);
	}, 1000);
}

function stopGameTimer() {
	clearInterval(timer);
}

function updateTimerText(time) {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	gameTimer.innerText = `${minutes}:${seconds}`;
}

function showPopUpWithText(text) {}

function counter() {
	const carrotNum = document.querySelectorAll(".carrot");
	gameScore.innerText = `${carrotNum.length}`;
}

function initGame() {
	field.innerHTML = "";
	gameScore.innerText = CARROT__COUNT;
	addItem("carrot", CARROT__COUNT, "img/carrot.png");
	addItem("bug", BUG__COUNT, "img/bug.png");
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
