import {$control } from './constants.js';

class Selectors {
  constructor(name) {
    this.elHP = document.getElementById(`health-${name}`);
    this.elProgressbar = document.getElementById(`progressbar-${name}`);
    this.$elImg = document.getElementById(`sprite-${name}`);
    this.elName = document.getElementById(`name-${name}`);
    this.$elPokemon = document.getElementById(`pokemon-${name}`);
  }
}

class Pokemon extends Selectors {
  constructor({name, img, hp, type, selectors, attacks}) {
    super(selectors);

    this.name = name;
    this.img = img;
    this.hp = {
      current: hp,
      total: hp,
    }
    this.type = type;
    this.attacks = attacks;

    this.renderHP();
  }

  changeHP = (count, cb, btn, name1, name2) => {
    this.hp.current -= count;
    const allButtons = document.querySelectorAll('.button');
    const winnerText = () => {
      return (`Бедный ${name1} пал на поле боя! `)
    }
    const endGame = () => {
      allButtons.forEach($item => $item.remove());

      const $btn = document.createElement('a');
      $btn.classList.add('button');
      $btn.innerText = 'Поиграем еще?';
      $btn.setAttribute('href', '../index.html')
      $control.appendChild($btn);

      const title = document.createElement('h2');
      title.classList.add('title');
      title.innerText = winnerText(name1, name2);
      $control.insertBefore(title, $btn);

      this.$elPokemon.style.background = "red";
    }

    if (this.hp.current <= 0) {
      this.hp.current = 0;
      endGame();
    }
    this.renderHP();
    cb && cb(count);
  }

  renderHP = () => {
    this.renderHPLife();
    this.renderProgressbarHP();
    this.renderInfo();
  }

  renderHPLife = () => {
    const {elHP, hp: {current, total}} = this;
    elHP.innerText = current + "/" + total;
  }

  renderInfo = () => {
    this.elName.innerText = this.name;
    this.$elImg.src = this.img;
  }

  renderProgressbarHP = () => {
    const {elProgressbar, hp: {current, total}} = this;
    const procent = current / (total / 100);
    elProgressbar.style.width = procent + "%";
    if (procent <= 60 && procent >= 35) {
      elProgressbar.classList.add('low')
    } else if (procent < 35) {
      elProgressbar.classList.add('critical')
    }
  }
}

export default Pokemon;


