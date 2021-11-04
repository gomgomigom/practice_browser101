'use strict';

const start = document.querySelector('.start');
const playground = document.querySelector('.playground');
const items = document.querySelector('.items');
const count = document.querySelector('.count');
const alertDiv = document.querySelector('.alert');

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
let coundDown = 9;
function timer() {
  if (coundDown >= 0) {
    document.querySelector('.timer').innerHTML = `
    0:${coundDown}
    `;
    coundDown--;
  } else {
    return;
  }
}
setInterval(timer, 1000);

// random
const playgroundY = playground.getBoundingClientRect().height;
const playgroundX = playground.getBoundingClientRect().width;

let id = 0;
function repeat(itemsName) {
  for (let i = 0; i < 10; i++) {
    let randomX = playgroundX * Math.random() * 0.9;
    let randomY = playgroundY * Math.random() * 0.7;
    const obj = document.createElement('img');
    obj.setAttribute('style', `top: ${randomY}px; left:${randomX}px;`);
    obj.setAttribute('src', `./img/${itemsName}.png`);
    obj.setAttribute('alt', `${itemsName}`);
    obj.setAttribute('data-id', id);
    obj.setAttribute('class', `${itemsName}`);
    items.appendChild(obj);
    id++;
  }
}
repeat('carrot');
repeat('bug');

// carrot pull
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

// count carrot
document.addEventListener('click', () => {
  const carrots = document.querySelectorAll('.carrot');
  const countNumber = carrots.length;
  console.log(countNumber);
  count.innerHTML = countNumber;
  if (countNumber == '0') {
    alertDiv.classList.add('active');
  }
});

// alert
