'user strict';

const vertical = document.querySelector('.vertical');
const horozontal = document.querySelector('.horozontal');
const target = document.querySelector('.target');
const targetRect = target.getBoundingClientRect();
const targetHalfWidth = targetRect.width / 2;
const targetHalfHeight = targetRect.height / 2;
const tag = document.querySelector('.tag');
console.log(targetRect);

addEventListener('load', () => {
  document.addEventListener('mousemove', e => {
    coordinate(e);
  });
  document.addEventListener('drag', e => {
    coordinate(e);
  });
});

function coordinate(e) {
  const x = e.clientX;
  const y = e.clientY;
  console.log(x, y);
  vertical.style.transform = `translateY(${y}px)`;
  horozontal.style.transform = `translateX(${x}px)`;
  target.style.transform = `translate(${x - targetHalfWidth}px,${y - targetHalfHeight}px)`;
  tag.style.transform = `translate(${x + 20}px,${y + 20}px)`;
  tag.innerHTML = `x: ${x}px<br /> y: ${y}px`;
}
