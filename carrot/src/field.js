'use strict';

import * as sound from './sound.js';

const CARROT_SIZE = 80;

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.playground = document.querySelector('.playground');
    this.items = document.querySelector('.items');
    this.playgroundRect = this.playground.getBoundingClientRect();
    this.playground.addEventListener('click', this.onClick);
  }
  init(carrotCount, bugCount) {
    this.items.innerHTML = '';
    this._addItem('carrot', carrotCount, './img/carrot.png');
    this._addItem('bug', bugCount, './img/bug.png');
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.playgroundRect.width - CARROT_SIZE;
    const y2 = this.playgroundRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.top = `${y}px`;
      item.style.left = `${x}px`;
      this.items.appendChild(item);
    }
  }

  onClick = (event) => {
    const target = event.target;
    if (target.matches('.carrot')) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick('carrot');
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick('bug');
    }
  };
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
