const $btnKickJolt = document.getElementById(('btn-kick-jolt'));
const $btnKickBolt = document.getElementById(('btn-kick-bolt'));

const character = {
  name: 'Picachu',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-character'),
  elProgressbar: document.getElementById('progressbar-character')
}

const enemy = {
  name: 'Charmander',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-enemy'),
  elProgressbar: document.getElementById('progressbar-enemy')
}

function init() {
  console.log('Start Game!');
  renderHP(character);
  renderHP(enemy);
}

function renderHP(person) {
  renderHPLife(person);
  renderProgressbarHP(person);
}

function renderHPLife(person) {
  person.elHP.innerText = person.damageHP + '/' + person.defaultHP;
}

function renderProgressbarHP(person) {
  person.elProgressbar.style.width = person.damageHP + '%';
}

function buttonDisabled() {
  $btnKickJolt.disabled = true;
  $btnKickBolt.disabled = true;
}

function changeHP(count, person) {
  if (person.damageHP < count) {
    person.damageHP = 0;
    alert('Бедный ' + person.name + ' проиграл бой')
    buttonDisabled();
  } else {
    person.damageHP -= count;
  }
  renderHP(person);
}

function random(num) {
  return Math.ceil(Math.random() * num)
}

function setEventListener(num) {
  console.log('Kick');
  changeHP(random(num), character);
  changeHP(random(num), enemy);
}

$btnKickJolt.addEventListener('click', () => setEventListener(15));
$btnKickBolt.addEventListener('click', () => setEventListener(25));

init();
