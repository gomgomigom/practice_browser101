'use strict';
import PopUp from './popup.js';
import GameBuilder from './game.js';

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  gameBuilder.start();
});

const gameBuilder = new GameBuilder()
  .gameDuration(13)
  .carrotCount(1)
  .bugCount(2)
  .level(1)
  .playSpeed(1)
  .build();

gameBuilder.setGameStopListener((reason) => {
  console.log(reason);
});
