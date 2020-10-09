import Pokemon from "./Pokemon.js";
import {random, generateLog, countBtn} from './utils.js';
import {pokemons} from './pokemons.js';

//const pikachu = pokemons.find(item => item.name === 'Pikachu');
//const bulbasaur = pokemons.find(item => item.name === 'Bulbasaur');

// const $elImg = document.getElementById('img-player1');
// $elImg.src = pokemons[0].img;
const $control = document.querySelector('.control');

const allSpan = document.querySelectorAll('.lvl');
const allImg = document.querySelectorAll('.sprite');
const names = document.querySelectorAll('.name');
const details = document.querySelector('.details');
const details2 = document.querySelector('#details2');
const textHP = document.querySelectorAll('.text');
const bar = document.querySelectorAll('.bar');


const btnStart = document.querySelector('#button-start')
const player1Container1 = document.querySelector('.player1')
const player1Container2 = document.querySelector('.player2')


allSpan.forEach($item => $item.remove());
allImg.forEach($item => $item.remove());
names.forEach($item => $item.remove());
textHP.forEach($item => $item.style.display = 'none');
bar.forEach($item => $item.style.display = 'none');
// const allButtons = document.querySelectorAll('.button');
// allButtons.forEach($item => $item.remove());

function generatePlayer() {
  return pokemons[random(pokemons.length - 1)];
}

const secondPlayer = generatePlayer();
const pokemonName = pokemons.find(item => item.name === secondPlayer .name);


let player2 = new Pokemon({
  name: pokemonName.name,
  img: pokemonName.img,
  hp: pokemonName.hp,
  type: pokemonName.type,
  attacks: pokemonName.attacks,
  selectors: 'player2',
})

console.log(player2)

btnStart.addEventListener('click', () => {
  btnStart.remove();
  const title = document.createElement('h2');
  title.classList.add('title');
  title.innerText = 'Выбрать своего покемона';
  $control.appendChild(title);
  pokemons.forEach(item => {

    const $btn = document.createElement('button');
    $btn.classList.add('img-button');
    $btn.classList.add('button');
    const $img = document.createElement('img');
    $img.classList.add('image');
    $img.src = item.img;

    const $text = document.createElement('p');
    $text.classList.add('img-text');
    $text.innerText = item.name;

    $control.appendChild($btn);
    $btn.appendChild($img);
    $btn.appendChild($text);

    $btn.addEventListener('click', () => {
      let player1 = new Pokemon({
        name: item.name,
        img: item.img,
        hp: item.hp,
        type: item.type,
        attacks: item.attacks,
        selectors: 'player1',
      })
      console.log(player1)
      title.remove();
      const allButtons = document.querySelectorAll('.control .button');
      allButtons.forEach($item => $item.remove());

      const $imgPlayer1 = document.createElement('img');
      $imgPlayer1.classList.add('sprite');
      $imgPlayer1.src = player1.img;
      player1Container1.appendChild($imgPlayer1);

      const $namePlayer1 = document.createElement('h2');
      $namePlayer1.classList.add('name');
      $namePlayer1.innerText = player1.name;
      details.insertBefore($namePlayer1, document.querySelector('.hp'));


      textHP.forEach($item => $item.style.display = 'block');
      bar.forEach($item => $item.style.display = 'block');

      const $imgPlayer2 = document.createElement('img');
      $imgPlayer2.classList.add('sprite');
      $imgPlayer2.src = player2.img;
      player1Container2.appendChild($imgPlayer2);

      const $namePlayer2 = document.createElement('h2');
      $namePlayer2.classList.add('name');
      $namePlayer2.innerText = player2.name;
      details2.insertBefore($namePlayer2, document.querySelector('.hp2'));

      const $textHp2 = document.createElement('span');
      $textHp2.classList.add('text');
   //   $textHp2.innerText = player2.hp.current + '/' + player2.hp.total;
      document.querySelector('.hp2').appendChild($textHp2);

      attack(player1, player2)
    })
  })
})


function attack(player1, player2) {
  player1.attacks.forEach(item => {
    // console.log(item);
    const $btn = document.createElement('button');
    $btn.classList.add('button');
    $btn.innerText = item.name;
    const countClick = countBtn(item.maxCount, $btn);
    $btn.addEventListener('click', () => {
      countClick();
      console.log("Kick");
      player1.changeHP(random(item.maxDamage, item.minDamage),
        function (count) {
          const log = this === player1
            ? generateLog(player2, player1, count)
            : generateLog(player1, player2, count);
          insertLog(log);
        }, $btn, player1.name, player2.name);
      player2.changeHP(random(item.maxDamage, item.minDamage), function (count) {
        const log =
          this === player2
            ? generateLog(player1, player2, count)
            : generateLog(player2, player1, count);
        console.log(item.maxDamage, item.minDamage)
        insertLog(log);
      }, $btn, player2.name, player1.name);
    });
    $control.appendChild($btn);
  })
}


function insertLog(log) {
  const $logs = document.querySelector('#logs');
  const $p = document.createElement('p');
  $p.innerText = `${log}`
  $logs.insertBefore($p, $logs.children[0]);
}












