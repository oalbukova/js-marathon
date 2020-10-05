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

function insertLog (log, damageHP, defaultHP) {
  const $logs = document.querySelector('#logs');
  const $p = document.createElement('p');
  $p.innerText = `${log}, [${damageHP}/${defaultHP}]`
  $logs.insertBefore($p, $logs.children[0]);
}

function changeHP(count) {
  this.damageHP -= count;
  const log =
    this === enemy
      ? generateLog(this, character, count)
      : generateLog(this, enemy, count);

  insertLog(log, this.damageHP, this.defaultHP);

  if (this.damageHP <= count) {
    this.damageHP = 0;
    this.img.style.backgroundColor = "red";
    alert(winnerText(name, nameEnemy));
    buttonDisabled($btnKickJolt);
    buttonDisabled($btnKickBolt);
  }
  this.renderHP();
}

const random = (max, min=0) => {
  const num = max-min;
  return Math.ceil(Math.random() * num) + min;
}

const generateLog = (firstPerson, secondPerson, count) => {
  const logs = [
    `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага. -${count}`,
    `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага. -${count}`,
    `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил. -${count}`,
    `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар. -${count}`,
    `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком <вырезанно цензурой> противника. -${count}`,
    `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар. -${count}`,
    `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар. -${count}`,
    `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника. -${count}`,
    `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника. -${count}`,
    `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику. -${count}`,
  ];
  return logs[random(logs.length - 1)];
}

const setEventListener = (max, min) => {
  console.log("Kick");
  character.changeHP(random(max, min));
  enemy.changeHP(random(max, min));
}

function countBtn(count, el) {
  const innerText = el.innerText;
  el.innerText = `${innerText} (${count})`;
  return function () {
    count--;
    if (count === 0) {
      el.disabled = true;
    }
    el.innerText = `${innerText} (${count})`;
    return count;
  }
}

const countClickJolt = countBtn(6, $btnKickJolt);
const countClickBolt = countBtn(10, $btnKickBolt);

init();

$btnKickJolt.addEventListener("click", () => {
  countClickJolt();
  setEventListener(60,20);
});
$btnKickBolt.addEventListener("click", () => {
  countClickBolt();
  setEventListener(20, 0);

});
