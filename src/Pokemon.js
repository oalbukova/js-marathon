class Selectors {
  constructor(name) {
    this.elHP = document.getElementById(`health-${name}`);
    this.elProgressbar = document.getElementById(`progressbar-${name}`);
   // this.$elImg = document.getElementById(`sprite-${name}`);
    // this.elName = document.getElementById(name-${name});
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
    const winnerText = () => {
      return (`Бедный ${name1} проиграл бой!  А счастливый ${name2} выиграл!`)
    }

    if (this.hp.current <= 0) {
      this.hp.current = 0;
   //   this.$elImg.style.background = "red";
      const allButtons = document.querySelectorAll('.button');
      allButtons.forEach($item => $item.remove());
      alert(winnerText(name1, name2));
    }
    this.renderHP();
    cb && cb(count);
  }

  renderHP = () => {
    this.renderHPLife();
    this.renderProgressbarHP();
  }

  renderHPLife = () => {
    const {elHP, hp: {current, total}} = this;
    elHP.innerText = current + "/" + total;
  }

  renderProgressbarHP = () => {
    const {elProgressbar, hp: {current, total}} = this;
    const procent = current / (total / 100);
    elProgressbar.style.width = procent + "%";
    if (current <=150 && current >= 80) {
      elProgressbar.classList.add ('low')
    }
    else if (current < 80) {
      elProgressbar.classList.add ('critical')
    }
  }
}
export default Pokemon;


