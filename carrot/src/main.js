'use strict';
import PopUp from './popup.js';
import Game from './game.js';

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  game.start();
});

const game = new Game(13, 1, 2, 1, 1);
game.setGameStopListener((reason) => {
  console.log(reason);
});
