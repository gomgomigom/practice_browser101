'use strict';

const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('#insert');
const del = document.querySelector('.item__delete');
const form = document.querySelector('.new-form');

function onAdd() {
  // 사용자가 입력한 텍스트를 받아옴
  const text = input.value;
  if (text == '') {
    input.focus();
    return;
  }
  // 새로운 아이템을 만듬 (텍스트 + 삭제 버튼)
  const newItem = createItem(text);
  // items  컨테이너 안에 새로 만든 아이템을 추가한다
  items.appendChild(newItem);
  // 새로 추가된 아이템으로 스크롤링
  newItem.scrollIntoView({ behavior: 'smooth' });
  // 인풋을 초기화
  input.value = '';
  input.focus();
}

let id = 0;
function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');
  itemRow.setAttribute('data-id', id);
  itemRow.innerHTML = `
  <div class="item" data-id=${id}>
    <span class="item__name">${text}</span>
    <button class="item__delete"><i class="fas fa-trash-alt" data-id=${id}></i></button>
  </div>
  <div class="item__divider"></div>
  `;
  id++;
  return itemRow;
}

// addBtn.addEventListener('click', () => {
//   onAdd();
// });

// input.addEventListener('keydown', e => {
//   if (e.isComposing) {
//     return;
//   }
//   if (e.key === 'Enter') {
//     onAdd();
//   }
// });

form.addEventListener('submit', e => {
  e.preventDefault();
  onAdd();
});

items.addEventListener('click', event => {
  const id = event.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
});
