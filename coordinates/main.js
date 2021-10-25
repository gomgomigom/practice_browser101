'user strict';

const vertical = document.querySelector('.vertical');
const horozontal = document.querySelector('.horozontal');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');

document.addEventListener('mousemove', e => {
  const x = e.clientX;
  const y = e.clientY;
  console.log(x, y);
  vertical.style.top = `${y}px`;
  horozontal.style.left = `${x}px`;
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
  tag.style.left = `${x}px`;
  tag.style.top = `${y}px`;
});

document.addEventListener('mousedown', () => {
  target.style.background = 'red';
});
document.addEventListener('mouseup', () => {
  target.style.background = 'transparent';
});
