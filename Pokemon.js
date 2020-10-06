class Selectors {
  constructor(name) {
    this.elHP = document.getElementById(`health-${name}`);
    this.elProgressbar = document.getElementById(`progressbar-${name}`);
  }
}

class Pokemon extends Selectors {
  constructor({name, img, defaultHP, damageHP, type, selectors}) {
    super(selectors);

    this.name = name;
    this.img = img;
    this.defaultHP = defaultHP;
    this.damageHP = damageHP;
    this.type = type;

    this.renderHP();
  }

  changeHP = (count, cb, btn1, btn2, name1, name2) => {
    this.damageHP -= count;
    const buttonDisabled = (btn) => {
      btn.disabled = true;
    }
    const winnerText = () => {
      return (`Бедный ${name1} проиграл бой!  А счастливый ${name2} выиграл!`)
    }

    if (this.damageHP <= 0) {
      this.damageHP = 0;
      this.img.style.backgroundColor = "red";
      alert(winnerText(name1, name2));
      buttonDisabled(btn1);
      buttonDisabled(btn2);
    }
    this.renderHP();
    cb && cb(count);
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


