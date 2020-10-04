const $btnKickJolt = document.getElementById("btn-kick-jolt");
const $btnKickBolt = document.getElementById("btn-kick-bolt");

const character = {
  name: "Picachu",
  img: document.querySelector(".character"),
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById("health-character"),
  elProgressbar: document.getElementById("progressbar-character"),
  renderHPLife,
  renderProgressbarHP,
  renderHP,
  changeHP,
};

const enemy = {
  name: "Charmander",
  img: document.querySelector(".enemy"),
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById("health-enemy"),
  elProgressbar: document.getElementById("progressbar-enemy"),
  renderHPLife,
  renderProgressbarHP,
  renderHP,
  changeHP,
};

const {name, ...rest} = character;
const {name: nameEnemy, ...restEnemy} = enemy;

const init = () => {
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

const buttonDisabled = (btn) => {
  btn.disabled = true;
}

const winnerText = (player1, player2) => {
  return (`Бедный ${player1} проиграл бой!  А счастливый ${player2} выиграл!`)
}

function changeHP(count) {
  this.damageHP -= count;
  const log =
    this === enemy
      ? generateLog(this, character)
      : generateLog(this, enemy);
  const $logs = document.querySelector('#logs');
  const $p = document.createElement('p');

  $p.innerText = `${log} -${count}, [${this.damageHP}/${this.defaultHP}]`
  $logs.insertBefore($p, $logs.children[0]);
  if (this.damageHP <= count) {
    this.damageHP = 0;
    this.img.style.backgroundColor = "red";
    alert(winnerText(name, nameEnemy));
    buttonDisabled($btnKickJolt);
    buttonDisabled($btnKickBolt);
  }
  this.renderHP();
}

const random = (num) => {
  return Math.ceil(Math.random() * num);
}

const generateLog = (firstPerson, secondPerson) => {
  const logs = [
    `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага.`,
    `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага.`,
    `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
    `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар.`,
    `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком <вырезанно цензурой> противника.`,
    `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар.`,
    `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар.`,
    `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника.`,
    `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника.`,
    `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику.`,
  ];
  return logs[random(logs.length - 1)];
}

const setEventListener = (num) => {
  console.log("Kick");
  character.changeHP(random(num));
  enemy.changeHP(random(num));
}

const countClick = (btn, btnTextContent) => {
  let count = 0;
  return function () {
    count ++;
    if (count >= 6) {
      btn.innerText = `${btnTextContent} (0)`;
      buttonDisabled(btn);
    } else {
      btn.innerText = `${btnTextContent} (${6 - count})`;
      console.log(count)
    }
  }
}

const countClickJolt = countClick($btnKickJolt, 'Thunder Jolt');
const countClickBolt = countClick($btnKickBolt, 'Thunder Bolt');

init();

$btnKickJolt.addEventListener("click", () => {
  setEventListener(15);
  countClickJolt();
});
$btnKickBolt.addEventListener("click", () => {
  setEventListener(25);
  countClickBolt();
});
