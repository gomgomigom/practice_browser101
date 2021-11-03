'use strict';

const start = document.querySelector('.start');
const playground = document.querySelector('.playground');

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
let count = 9;
function timer() {
  if (count >= 0) {
    document.querySelector('.timer').innerHTML = count;
    count--;
  } else {
    return;
  }
}
setInterval(timer, 1000);

// random
const playgroundY = playground.getBoundingClientRect().height;
const playgroundX = playground.getBoundingClientRect().width;
const randomX = playgroundX * Math.random() * 0.9;
const randomY = playgroundY * Math.random() * 0.9;
console.log(playgroundY);
console.log(playgroundX);

console.log(randomX);
console.log(randomY);

function addBugAndCarrot() {
  playground.innerHTML = `
  <img style="top: ${randomY}px; left:${randomX}px;" src="./img/bug.png" alt="벌레" class="bug" />
  `;
}
{
  /* <img style="top: ${randomY}px; left:${randomX}px;" src="./img/carrot.png" alt="당근" class="carrot" /> */
}

addBugAndCarrot();
