'use strict';

const CARROT_SIZE = 80;
const CARROT = 5;
const BUG = 5;
const GAME_DURATION_SECOND = 5;

const start = document.querySelector('.start');
const playground = document.querySelector('.playground');
const playgroundRect = playground.getBoundingClientRect();
const items = document.querySelector('.items');
const alertDiv = document.querySelector('.alert');
const alertState = document.querySelector('.state');
const restart = document.querySelector('.restart');
const gameTimer = document.querySelector('.timer');
const gameCount = document.querySelector('.count');

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

    // if (e.target.tagName !== 'I') {
    //   return;
    // }
    // if (e.target.className == 'fas fa-play') {
    //   e.target.className = 'fas fa-square';
    // } else {
    //   e.target.className = 'fas fa-play';
    // }
  });
}
startBtn();

function startGame() {
  started = true;
  initGame();
  countCarrot();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}

function stopGame() {
  started = false;
  const icon = start.querySelector('.fas');
  icon.classList.add('fa-play');
  icon.classList.remove('fa-stop');
  stopGameTimer();
  showPopUpWithText('REPLAY?');
  hideStartButton();
}

function finishGame() {
  started = false;
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SECOND;
  updateTimerText(remainingTimeSec);
  time = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(time);
      showPopUpWithText('Time OUT 💩');
      finishGame();
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
}

function hideStartButton() {
  start.style.visibility = 'hidden';
}

function showPopUpWithText(text) {
  alertDiv.classList.add('active');
  alertState.innerText = `${text}`;
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

// count carrot
function countCarrot() {
  document.addEventListener('click', () => {
    const carrots = document.querySelectorAll('.carrot');
    const countNumber = carrots.length;
    console.log(countNumber);
    gameCount.innerHTML = countNumber;
    if (countNumber == '0') {
      alertDiv.classList.add('active');
      alertState.innerText = 'YOU WON🥰';
      stopGameTimer();
    }
  });
}

// restart
function restartGame() {
  restart.addEventListener('click', () => {
    items.innerHTML = '';
    startGame();
    start.style.visibility = 'visible';
    alertDiv.classList.remove('active');
  });
}
restartGame();

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
    score++;
    updateScoreBoard();
    console.log(score);
  } else if (target.matches('.bug')) {
    console.log('벌레!!');
    stopGameTimer();
    showPopUpWithText('YOU LOSE 💩');
    finishGame();
  }
}

function updateScoreBoard() {
  gameCount.innerText = CARROT - score;
}

// setInterval(timer, 1000);

// random
// const playgroundY = playground.getBoundingClientRect().height;
// const playgroundX = playground.getBoundingClientRect().width;

// let id = 0;
// function repeat(itemsName) {
//   for (let i = 0; i < 10; i++) {
//     let randomX = playgroundX * Math.random() * 0.9;
//     let randomY = playgroundY * Math.random() * 0.7;
//     const obj = document.createElement('img');
//     obj.setAttribute('style', `top: ${randomY}px; left:${randomX}px;`);
//     obj.setAttribute('src', `./img/${itemsName}.png`);
//     obj.setAttribute('alt', `${itemsName}`);
//     obj.setAttribute('data-id', id);
//     obj.setAttribute('class', `${itemsName}`);
//     items.appendChild(obj);
//     id++;
//   }
// }
// repeat('carrot');
// repeat('bug');
// random carrot & bug

// // carrot pull
// function carrotPull() {
//   const carrots = document.querySelectorAll('.carrot');
//   carrots.forEach(element => {
//     console.log(element.dataset.id);
//     element.addEventListener('click', e => {
//       const carrotId = e.target.dataset.id;
//       console.log('click');
//       const toBePull = document.querySelector(`.carrot[data-id="${carrotId}"`);
//       toBePull.remove();
//       console.log(carrotId);
//     });
//   });
// }
