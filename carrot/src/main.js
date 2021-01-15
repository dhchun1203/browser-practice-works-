"use strict";
import PopUp from "./popup.js";
import * as sound from "./sound.js";
import { GameBuilder, Reason } from "./game.js";

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
	.gameDuration(5)
	.carrotCount(3)
	.bugCount(3)
	.build();

game.setGameStopListener((reason) => {
	let message;
	switch (reason) {
		case Reason.cancel:
			sound.playAlert();
			message = "Replay❓";
			break;
		case Reason.win:
			sound.playWin();
			message = "YOU WIN 🎉";
			break;
		case Reason.lose:
			sound.playBug();
			message = "YOU LOSE 💩";
			break;
		default:
			throw new Error("not valid reason");
	}
	gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
	game.start();
});
