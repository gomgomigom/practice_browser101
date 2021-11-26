'use strict';
import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';

const gameFinishBanner = new PopUp();

const game = new GameBuilder()
  .gameDuration(13)
  .carrotCount(1)
  .bugCount(2)
  .level(1)
  .playSpeed(1)
  .build();

game.setGameStopListener((reason, level) => {
  console.log(reason, level);
  let message;
  switch (reason) {
    case Reason.cancel:
      message = `Level:${level}  RESTART❓`;
      break;
    case Reason.win:
      message = `YOU WON🎊 LEVEL:${level}`;
      break;
    case Reason.lose:
      message = `Level:${level}💩YOU LOST💩`;
      break;
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
