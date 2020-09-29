const $btnKickJolt = document.getElementById("btn-kick-jolt");
const $btnKickBolt = document.getElementById("btn-kick-bolt");

const character = {
  name: "Picachu",
  img: document.querySelector(".character"),
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById("health-character"),
  elProgressbar: document.getElementById("progressbar-character"),
  renderHPLife: renderHPLife,
  renderProgressbarHP: renderProgressbarHP,
  renderHP: renderHP,
  changeHP: changeHP,
};

const enemy = {
  name: "Charmander",
  img: document.querySelector(".enemy"),
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById("health-enemy"),
  elProgressbar: document.getElementById("progressbar-enemy"),
  renderHPLife: renderHPLife,
  renderProgressbarHP: renderProgressbarHP,
  renderHP: renderHP,
  changeHP: changeHP,
};

function init() {
  console.log("Start Game!");
  character.renderHP();
  enemy.renderHP();
}

function renderHP() {
  this.renderHPLife();
  this.renderProgressbarHP();
}

function renderHPLife() {
  this.elHP.innerText = this.damageHP + "/" + this.defaultHP;
}

function renderProgressbarHP() {
  this.elProgressbar.style.width = this.damageHP + "%";
}

function buttonDisabled() {
  $btnKickJolt.disabled = true;
  $btnKickBolt.disabled = true;
}

function changeHP(count) {
  if (this.damageHP < count) {
    this.damageHP = 0;
    this.img.style.backgroundColor = "red";
    alert("Бедный " + this.name + " проиграл бой");
    buttonDisabled();
  } else {
    this.damageHP -= count;
  }
  this.renderHP();
}

function random(num) {
  return Math.ceil(Math.random() * num);
}

function setEventListener(num) {
  console.log("Kick");
  character.changeHP(random(num));
  enemy.changeHP(random(num));
}

init();

$btnKickJolt.addEventListener("click", () => setEventListener(15));
$btnKickBolt.addEventListener("click", () => setEventListener(25));
