'use strict';

import PopUp from './popup.js';

let CARROT_SIZE = 80;
let CARROT = 1;
let BUG = 1;
let GAME_DURATION_SECOND = 14;
let LEVEL = 0;
let playSpeed = 1;

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

let started = false;
let score = 0;
let time = undefined;

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
  score = 0;
  playSound(bgSound);
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
  playSound(alertSound);
  stopSound(bgSound);
}

function finishGame(win) {
  started = false;
  hideStartButton();
  if (win) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }
  stopGameTimer();
  stopSound(bgSound);
  changeLevel(win);
  if (LEVEL >= 10) {
    LEVEL = `${LEVEL}👑`;
  }
  gameFinishBanner.showWithText(win ? `YOU WON🎊 LEVEL: ${LEVEL}` : `YOU LOST 💩 LEVEL: ${LEVEL}`);
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

function stopSound(sound) {
  sound.pause();
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

// let id = 0;
function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = playgroundRect.width - CARROT_SIZE;
  const y2 = playgroundRect.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    // item.setAttribute('data-id', id);
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.top = `${y}px`;
    item.style.left = `${x}px`;
    items.appendChild(item);
    // id++;
  }
}

function initGame() {
  console.log(playgroundRect);
  items.innerHTML = '';
  gameCount.innerText = CARROT;

  addItem('carrot', CARROT, './img/carrot.png');
  addItem('bug', BUG, './img/bug.png');
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

gameFinishBanner.setClickListener(() => {
  startGame();
});

playground.addEventListener('click', onFieldClick);

function onFieldClick(event) {
  if (!started) {
    return;
  }
  const target = event.target;
  console.log(target);
  if (target.matches('.carrot')) {
    console.log('당근');
    target.remove();
    playSound(carrotSound);
    score++;
    updateScoreBoard();
    if (score === CARROT) {
      finishGame(true);
    }
  } else if (target.matches('.bug')) {
    console.log('벌레!!');
    finishGame(false);
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function updateScoreBoard() {
  gameCount.innerText = CARROT - score;
}
