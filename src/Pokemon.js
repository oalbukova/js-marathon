class Selectors {
  constructor(name) {
    this.elHP = document.getElementById(`health-${name}`);
    this.elProgressbar = document.getElementById(`progressbar-${name}`);
    this.$elImg = document.getElementById(`sprite-${name}`);
    this.elName = document.getElementById(`name-${name}`);
  }
}

class Pokemon extends Selectors {
  constructor({name, img, hp, type, selectors, attacks, id}) {
    super(selectors);

    this.name = name;
    this.img = img;
    this.hp = {
      current: hp,
      total: hp,
    }
    this.type = type;
    this.attacks = attacks;
    this.id = id;

    this.renderHP();
  }

  changeHP = (count, cb) => {
    this.hp.current -= count;
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


