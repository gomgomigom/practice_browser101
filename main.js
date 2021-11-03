'use strict';

function add(num1, num2) {
  return num1 + num2;
}

function surprise(operator) {
  const result = operator(2, 5);
  console.log(result);
}

function a(a, b) {
  return `${a}보다 ${b}가 낫다`;
}

surprise(add);

class Counter {
  constructor(runEvery5Times) {
    this.counter = 0;
    this.callBack = runEvery5Times;
  }

  increase() {
    this.counter++;
    if (this.counter % 5 === 0) {
      this.callBack && this.callBack(this.counter);
    } else {
      console.log(this.counter);
    }
  }
}

function console5Times(num) {
  console.log(`${num} yo!`);
}

function alertNum(num) {
  alert(`${num} yo!`);
}

console.log(Counter);
const coolCounter = new Counter();

const printCounter = new Counter(console5Times);
const alertCounter = new Counter(alertNum);

printCounter.increase();
