import Pokemon from "./Pokemon.js";

function $getElById(id) {
  return document.getElementById(id);
}

const $btnKickJolt = $getElById("btn-kick-jolt");
const $btnKickBolt = $getElById("btn-kick-bolt");

const player1 = new Pokemon({
  name: 'Picachu',
  img: document.querySelector(".character"),
  defaultHP: 150,
  damageHP: 150,
  type: 'electric',
  selectors: 'character',
})

const player2 = new Pokemon({
  name: 'Charmander',
  img: document.querySelector(".enemy"),
  defaultHP: 150,
  damageHP: 150,
  type: 'fire',
  selectors: 'enemy',
})

const init = () => {
  console.log("Start Game!");
}

const random = (max, min = 0) => {
  const num = max - min;
  return Math.ceil(Math.random() * num) + min;
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

const generateLog = (player1, player2, count) => {
  const {name, defaultHP, damageHP} = player1;
  const {name: enemyName} = player2;

  const logs = [
    `${name} вспомнил что-то важное, но неожиданно ${enemyName}, не помня себя от испуга, ударил в предплечье врага. -${count}, [${damageHP}/${defaultHP}]`,
    `${name} поперхнулся, и за это ${enemyName} с испугу приложил прямой удар коленом в лоб врага. -${count}, [${damageHP}/${defaultHP}]`,
    `${name} забылся, но в это время наглый ${enemyName}, приняв волевое решение, неслышно подойдя сзади, ударил. -${count}, [${damageHP}/${defaultHP}]`,
    `${name} пришел в себя, но неожиданно ${enemyName} случайно нанес мощнейший удар. -${count}, [${damageHP}/${defaultHP}]`,
    `${name} поперхнулся, но в это время ${enemyName} нехотя раздробил кулаком <вырезанно цензурой> противника. -${count}, [${damageHP}/${defaultHP}]`,
    `${name} удивился, а ${enemyName} пошатнувшись влепил подлый удар. -${count}, [${damageHP}/${defaultHP}]`,
    `${name} высморкался, но неожиданно ${enemyName} провел дробящий удар. -${count}, [${damageHP}/${defaultHP}]`,
    `${name} пошатнулся, и внезапно наглый ${enemyName} беспричинно ударил в ногу противника. -${count}, [${damageHP}/${defaultHP}]`,
    `${name} расстроился, как вдруг, неожиданно ${enemyName} случайно влепил стопой в живот соперника. -${count}, [${damageHP}/${defaultHP}]`,
    `${name} пытался что-то сказать, но вдруг, неожиданно ${enemyName} со скуки, разбил бровь сопернику. -${count}, [${damageHP}/${defaultHP}]`,
  ];
  return logs[random(logs.length - 1)];
}

function insertLog(log) {
  const $logs = document.querySelector('#logs');
  const $p = document.createElement('p');
  $p.innerText = `${log}`
  $logs.insertBefore($p, $logs.children[0]);
}

const setEventListener = (max, min) => {
  console.log("Kick");
  player1.changeHP(random(max, min),
    function (count) {
      const log = this === player1
        ? generateLog(player2, player1, count)
        : generateLog(player1, player2, count);
      insertLog(log);
    }, $btnKickJolt, $btnKickBolt, player1.name, player2.name);
  player2.changeHP(random(max, min), function (count) {
    const log =
      this === player2
        ? generateLog(player1, player2, count)
        : generateLog(player2, player1, count);

    insertLog(log);
  }, $btnKickJolt, $btnKickBolt, player2.name, player1.name);
}

$btnKickJolt.addEventListener("click", () => {
  countClickJolt();
  setEventListener(60, 20);
});
$btnKickBolt.addEventListener("click", () => {
  countClickBolt();
  setEventListener(20, 0);
});

init();











