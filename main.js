const $btnKickJolt = document.getElementById('btn-kick-jolt');
const $btnKickBolt = document.getElementById('btn-kick-bolt');

const character = {
  name: 'Picachu',
  img: document.querySelector('.character'),
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-character'),
  elProgressbar: document.getElementById('progressbar-character')
}

const enemy = {
  name: 'Charmander',
  img: document.querySelector('.enemy'),
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-enemy'),
  elProgressbar: document.getElementById('progressbar-enemy')
}

<<<<<<< HEAD
const phone = prompt("Введите номер телефона");
=======
function init() {
  console.log('Start Game!');
  renderHP(character);
  renderHP(enemy);
}

function renderHP(person) {
  renderHPLife(person);
  renderProgressbarHP(person);
}
>>>>>>> 67a57b2c44b84ec3eb57bede8f4d0d8fccdd5b79

function renderHPLife(person) {
  person.elHP.innerText = person.damageHP + '/' + person.defaultHP;
}

function renderProgressbarHP(person) {
  person.elProgressbar.style.width = person.damageHP + '%';
}

<<<<<<< HEAD
  for (let i = 0; i <= phone.length; i++) {
    if (phone.length === 12) {
      if (i === 1) {
        result += phone.charAt(i) + " " + "(";
      } else if (i === 5) {
        result += ")" + " " + phone.charAt(i);
      } else if (i === 8) {
        result += "-" + phone.charAt(i);
      } else if (i === 10) {
        result += "-" + phone.charAt(i);
      } else result += phone.charAt(i);
    } else if (phone.length === 11) {
      if (i === 0) {
        result += "+" + "7" + " " + "(";
      } else if (i === 4) {
        result += ")" + " " + phone.charAt(i);
      } else if (i === 7) {
        result += "-" + phone.charAt(i);
      } else if (i === 9) {
        result += "-" + phone.charAt(i);
      } else result += phone.charAt(i);
    } else if (phone.length === 10) {
      if (i === 0) {
        result += "+" + "7" + " " + "(" + phone.charAt(i);
      } else if (i === 3) {
        result += ")" + " " + phone.charAt(i);
      } else if (i === 6) {
        result += "-" + phone.charAt(i);
      } else if (i === 8) {
        result += "-" + phone.charAt(i);
      } else result += phone.charAt(i);
    } else return "введите номер телефона в верном формате";
=======
function buttonDisabled() {
  $btnKickJolt.disabled = true;
  $btnKickBolt.disabled = true;
}

function changeHP(count, person) {
  if (person.damageHP < count) {
    person.damageHP = 0;
    person.img.style.backgroundColor = 'red';
    alert('Бедный ' + person.name + ' проиграл бой')
    buttonDisabled();
  } else {
    person.damageHP -= count;
>>>>>>> 67a57b2c44b84ec3eb57bede8f4d0d8fccdd5b79
  }
  renderHP(person);
}

function random(num) {
  return Math.ceil(Math.random() * num)
}

<<<<<<< HEAD
alert(formattedPhone(phone));
=======
function setEventListener(num) {
  console.log('Kick');
  changeHP(random(num), character);
  changeHP(random(num), enemy);
}

init();

$btnKickJolt.addEventListener('click', () => setEventListener(15));
$btnKickBolt.addEventListener('click', () => setEventListener(25));


>>>>>>> 67a57b2c44b84ec3eb57bede8f4d0d8fccdd5b79
