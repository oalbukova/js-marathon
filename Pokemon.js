class Selectors {
  constructor(name) {
    this.elHP = document.getElementById(`health-${name}`);
    this.elProgressbar = document.getElementById(`progressbar-${name}`);
  }
}

class Pokemon extends Selectors {
  constructor({name, defaultHP, damageHP, type, selectors}) {
    super(selectors);

    this.name = name;
    this.defaultHP = defaultHP;
    this.damageHP = damageHP;
    this.type = type;

    this.renderHP();
  }

  renderHP = () => {
    this.renderHPLife();
    this.renderProgressbarHP();
  }

  renderHPLife = () => {
    this.elHP.innerText = this.damageHP + "/" + this.defaultHP;
  }

  renderProgressbarHP = () => {
    this.elProgressbar.style.width = this.damageHP + "%";
  }

}

export default Pokemon;

// damageHP: 100,
//img: document.querySelector(".character"),
//   renderHPLife,
//   renderProgressbarHP,
//   renderHP,
//   changeHP,
