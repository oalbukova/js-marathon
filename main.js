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

const {name, ...rest} = character;
const {name: nameEnemy, ...restEnemy} = enemy;

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

function winnerText(player1, player2) {
  return (
    "Бедный " +
    player1 +
    " проиграл бой!  А счастливый " +
    player2 +
    " выиграл!"
  );
}

function changeHP(count) {
  const damage = this.damageHP -= count;
  const log =
    this === enemy
      ? generateLog(this, character)
      : generateLog(this, enemy);


  const $logs = document.querySelector('#logs');
  const $p = document.createElement('p');
  $p.innerText = `${log + ' ' + '-' + count +',' + ' ' + '[' + this.damageHP + "/" + this.defaultHP + ']'}`;
  $logs.insertBefore($p, $logs.children[0]);
  if (this.damageHP <= count) {
    this.damageHP = 0;
    this.img.style.backgroundColor = "red";
    alert(winnerText(name, nameEnemy));
    buttonDisabled();
  }
  this.renderHP();
}

function random(num) {
  return Math.ceil(Math.random() * num);
}

function generateLog(firstPerson, secondPerson) {
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


function setEventListener(num) {
  console.log("Kick");
  character.changeHP(random(num));
  enemy.changeHP(random(num));
}

init();

$btnKickJolt.addEventListener("click", () => setEventListener(15));
$btnKickBolt.addEventListener("click", () => setEventListener(25));



