'use strict';

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.alert');
    this.popUpText = document.querySelector('.state');
    this.popUpRefresh = document.querySelector('.restart');
    this.popUpRefresh.addEventListener('click', () => {
      this.onClick && this.onClick();
      hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  hide() {
    this.popUp.classList.remove('active');
  }

  showWithText(text) {
    this.popUp.classList.add('active');
    this.popUpText.innerText = `${text}`;
  }
}
