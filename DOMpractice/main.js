'use strict';

const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('#insert');
const del = document.querySelector('.item__delete');

function onAdd() {
  // 사용자가 입력한 텍스트를 받아옴
  const text = input.value;
  if (text == '') {
    input.focus();
    console.log('내용을 입력하세요');
    return;
  }
  console.log(text);
  // 새로운 아이템을 만듬 (텍스트 + 삭제 버튼)
  const newItem = createItem(text);
  console.log(newItem);
  // items  컨테이너 안에 새로 만든 아이템을 추가한다
  items.appendChild(newItem);
  // 새로 추가된 아이템으로 스크롤링
  newItem.scrollIntoView({ behavior: 'smooth' });
  // 인풋을 초기화
  input.value = '';
  input.focus();
}

addBtn.addEventListener('click', () => {
  onAdd();
});

function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');

  const item = document.createElement('div');
  item.setAttribute('class', 'item');

  const itemName = document.createElement('span');
  itemName.setAttribute('class', 'item__name');
  itemName.innerText = text;

  const itemDelete = document.createElement('button');
  itemDelete.setAttribute('class', 'item__delete');
  itemDelete.innerHTML = '<i class="fas fa-trash-alt"></i>';
  itemDelete.addEventListener('click', e => {
    items.removeChild(itemRow);
  });

  const itemDivider = document.createElement('div');
  itemDivider.setAttribute('class', 'item__divider');

  item.appendChild(itemName);
  item.appendChild(itemDelete);

  itemRow.appendChild(item);
  itemRow.appendChild(itemDivider);

  return itemRow;
}

input.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    onAdd();
  }
});
