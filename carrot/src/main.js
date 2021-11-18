'use strict';

import PopUp from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';

let CARROT_SIZE = 80;
let CARROT = 1;
let BUG = 1;
let GAME_DURATION_SECOND = 14;
let LEVEL = 0;
let playSpeed = 1;

let started = false;
let score = 0;
let time = undefined;

const start = document.querySelector('.start');
const playground = document.querySelector('.playground');
const playgroundRect = playground.getBoundingClientRect();
const items = document.querySelector('.items');
const gameTimer = document.querySelector('.timer');
const gameCount = document.querySelector('.count');

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

const gameFinishBanner = new PopUp();
const gameField = new Field(CARROT, BUG);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
  if (!started) {
    return;
  }
  if (item === 'carrot') {
    score++;
    updateScoreBoard();
    if (score === CARROT) {
      finishGame(true);
    }
  } else if (item === 'bug') {
    finishGame(false);
  }
}

// start button
function startBtn() {
  start.addEventListener('click', e => {
    console.log(e.target);
    if (started) {
      stopGame();
    } else {
      startGame();
    }
  });
}
startBtn();

function startGame() {
  started = true;
  sound.playBg(playSpeed);
  initGame();
  hideAlert();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}

function hideAlert() {
  gameFinishBanner.hide();
}

function stopGame() {
  started = false;
  const icon = start.querySelector('.fas');
  icon.classList.add('fa-play');
  icon.classList.remove('fa-stop');
  stopGameTimer();
  gameFinishBanner.showWithText('REPLAY?');
  hideStartButton();
  sound.playAlert();
  sound.stopBg();
}

function finishGame(win) {
  started = false;
  hideStartButton();
  if (win) {
    sound.playWin();
  } else {
    sound.playBug();
  }
  stopGameTimer();
  sound.stopBg();
  changeLevel(win);
  if (LEVEL >= 10) {
    LEVEL = `${LEVEL}👑`;
  }
  gameFinishBanner.showWithText(win ? `YOU WON🎊 LEVEL: ${LEVEL}` : `YOU LOST 💩 LEVEL: ${LEVEL}`);
}

function initGame() {
  score = 0;
  gameCount.innerText = CARROT;
  gameField.init(CARROT, BUG);
}

function changeLevel(win) {
  if (win) {
    CARROT = CARROT + 1;
    BUG = BUG + 2;
    LEVEL++;
    GAME_DURATION_SECOND--;
    playSpeed = playSpeed + 0.1;
    bgSound.playbackRate = playSpeed;
  } else {
    return;
  }
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SECOND;
  updateTimerText(remainingTimeSec);
  time = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(time);
      finishGame(CARROT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const secon = time % 60;
  gameTimer.innerText = `${minutes}:${secon}`;
}

function showStopButton() {
  const icon = start.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
  start.style.visibility = 'visible';
}

function hideStartButton() {
  start.style.visibility = 'hidden';
}

function stopGameTimer() {
  clearInterval(time);
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameCount.style.visibility = 'visible';
}

gameFinishBanner.setClickListener(() => {
  startGame();
});

function updateScoreBoard() {
  gameCount.innerText = CARROT - score;
}
