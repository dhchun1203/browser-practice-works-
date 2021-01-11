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
const popUpText = document.querySelector(".pop-up__message");
const popUpRefresh = document.querySelector(".pop-up__refresh");

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener("click", onFieldClick);

gameBtn.addEventListener("click", () => {
	if (started) {
		stopGame();
	} else {
		startGame();
	}

	counter();
});

popUpRefresh.addEventListener("click", () => {
	startGame();
	hidePopUp();
});

function startGame() {
	started = true;
	initGame();
	showStopButton();
	showTimerAndScore();
	startGameTimer();
}
function stopGame() {
	started = false;
	stopGameTimer();
	hideGameButton();
	showPopUpWithText("REPLAY❓");
}

function finishGame(win) {
	started = false;
	hideGameButton();
	showPopUpWithText(win ? "YOU WON 🎉" : "YOU LOSE 💩");
}

function showStopButton() {
	const icon = gameBtn.querySelector(".fas");
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
			finishGame(CARROT__COUNT === score);
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

function showPopUpWithText(text) {
	popUpText.innerText = text;
	popUp.classList.remove("pop-up--hide");
}

function hidePopUp() {
	popUp.classList.add("pop-up--hide");
}

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

function onFieldClick(event) {
	if (!started) {
		return;
	}
	const target = event.target;
	if (target.matches(".carrot")) {
		target.remove();
		score++;
		updateScoreBoard();
		if (score === CARROT__COUNT) {
			finishGame(true);
		}
	} else if (target.matches(".bug")) {
		stopGameTimer();
		finishGame(false);
	}
}

function updateScoreBoard() {
	gameScore.innerText = CARROT__COUNT - score;
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
		item.setAttribute("draggable", "false");
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
