'use strict';
import PopUp from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';

export default class GameBuilder {
  gameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }
  carrotCount(num) {
    this.carrotCount = num;
    return this;
  }
  bugCount(num) {
    this.bugCount = num;
    return this;
  }
  level(num) {
    this.level = num;
    return this;
  }
  playSpeed(num) {
    this.playSpeed = num;
    return this;
  }
  build() {
    return new Game(
      this.gameDuration,
      this.carrotCount,
      this.bugCount,
      this.level,
      this.playSpeed
    );
  }
}

class Game {
  constructor(gameDuration, carrotCount, bugCount, level, playSpeed) {
    this.gameDuration = gameDuration;
    this.bugCount = bugCount;
    this.carrotCount = carrotCount;
    this.level = level;
    this.playSpeed = playSpeed;

    this.gameTimer = document.querySelector('.timer');
    this.gameCount = document.querySelector('.count');
    this.startBtn = document.querySelector('.start');
    this.startBtn.addEventListener('click', () => {
      if (this.started) {
        this.stop();
      } else {
        this.start();
      }
    });

    this.bgSound = new Audio('./sound/bg.mp3');
    this.gameFinishBanner = new PopUp();
    this.gameField = new Field(this.carrotCount, this.bugCount);
    this.gameField.setClickListener(this.onItemClick);

    this.started = false;
    this.score = 0;
    this.time = undefined;
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === 'carrot') {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.carrotCount) {
        this.finish(true);
      }
    } else if (item === 'bug') {
      this.finish(false);
    }
  };

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }
  start() {
    this.started = true;
    this.initGame();
    this.hideAlert();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBg(this.playSpeed);
  }

  stop() {
    this.showStopButton();
    this.started = false;
    this.stopGameTimer();
    this.hideStartButton();
    this.gameFinishBanner.showWithText('RESTART?');
    sound.playAlert();
    sound.stopBg();
    this.onGameStop && this.onGameStop('cancel');
  }

  hideAlert() {
    this.gameFinishBanner.hide();
  }

  finish(win) {
    this.started = false;
    this.hideStartButton();
    if (win) {
      sound.playWin();
    } else {
      sound.playBug();
    }
    this.stopGameTimer();
    sound.stopBg();
    this.gameFinishBanner.showWithText(
      win ? `YOU WIN🥰 LEVEL:${this.level}` : `YOU LOST💩 LEVEL:${this.level}`
    );
    this.changeLevel(win);
    if (this.level >= 10) {
      this.level = `${this.level}👑`;
    }

    this.onGameStop && this.onGameStop(win ? 'win' : 'lose');
  }

  showStopButton() {
    const icon = this.startBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    this.startBtn.style.visibility = 'visible';
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = 'visible';
    this.gameCount.style.visibility = 'visible';
  }

  startGameTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.time = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.time);
        this.finish(this.carrotCount === this.score);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.time);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const secon = time % 60;
    this.gameTimer.innerText = `${minutes}:${secon}`;
  }

  initGame() {
    this.score = 0;
    this.gameCount.innerText = this.carrotCount;
    this.gameField.init(this.carrotCount, this.bugCount);
  }

  updateScoreBoard() {
    this.gameCount.innerText = this.carrotCount - this.score;
  }

  hideStartButton() {
    this.startBtn.style.visibility = 'hidden';
  }

  changeLevel(win) {
    if (win) {
      this.carrotCount = this.carrotCount + 1;
      this.bugCount = this.bugCount + 2;
      this.level++;
      this.gameDuration--;
      this.playSpeed = this.playSpeed + 0.1;
      this.bgSound.playbackRate = this.playSpeed;
    } else {
      return;
    }
  }
}
