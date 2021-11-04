'use strict';

const CARROT_SIZE = 80;
const start = document.querySelector('.start');
const playground = document.querySelector('.playground');
const playgroundRect = playground.getBoundingClientRect();
const items = document.querySelector('.items');
const count = document.querySelector('.count');
const alertDiv = document.querySelector('.alert');
const restart = document.querySelector('.restart');

// start button
start.addEventListener('click', e => {
  console.log(e.target);
  if (e.target.tagName !== 'I') {
    return;
  }
  if (e.target.className == 'fas fa-play') {
    e.target.className = 'fas fa-square';
  } else {
    e.target.className = 'fas fa-play';
  }
});

// count down
let countDown = 9;
function timer() {
  if (countDown >= 0) {
    document.querySelector('.timer').innerHTML = `
    0:${countDown}
    `;
    countDown--;
  } else {
    return;
  }
}
setInterval(timer, 1000);

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

let id = 0;
function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = playgroundRect.width - CARROT_SIZE;
  const y2 = playgroundRect.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.setAttribute('data-id', id);
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.top = `${y}px`;
    item.style.left = `${x}px`;
    items.appendChild(item);
    id++;
  }
}

function initGame() {
  console.log(playgroundRect);
  addItem('carrot', 5, './img/carrot.png');
  addItem('bug', 5, './img/bug.png');
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

initGame();

// carrot pull
function carrotPull() {
  const carrots = document.querySelectorAll('.carrot');
  carrots.forEach(element => {
    console.log(element.dataset.id);
    element.addEventListener('click', e => {
      const carrotId = e.target.dataset.id;
      const toBePull = document.querySelector(`.carrot[data-id="${carrotId}"`);
      toBePull.remove();
      console.log(carrotId);
    });
  });
}
carrotPull();

// count carrot
function countCarrot() {
  document.addEventListener('click', () => {
    const carrots = document.querySelectorAll('.carrot');
    const countNumber = carrots.length;
    console.log(countNumber);
    count.innerHTML = countNumber;
    if (countNumber == '0') {
      alertDiv.classList.add('active');
    }
  });
}
countCarrot();

// restart
restart.addEventListener('click', () => {
  items.innerHTML = '';
  initGame();
  carrotPull();
  countDown = 10;
  setInterval(timer, 1000);

  alertDiv.classList.remove('active');
});
