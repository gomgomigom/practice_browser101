'use strict';

const start = document.querySelector('.start');

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
