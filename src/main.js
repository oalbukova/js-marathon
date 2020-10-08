import Pokemon from "./Pokemon.js";
import {random, generateLog, countBtn} from './utils.js';
import {pokemons} from './pokemons.js';

const pikachu = pokemons.find(item => item.name === 'Pikachu');
const bulbasaur = pokemons.find(item => item.name === 'Bulbasaur');

// const $elImg = document.getElementById('img-player1');
// $elImg.src = pokemons[0].img;
const $control = document.querySelector('.control');
//const pokemonContainer = document.querySelectorAll('.pokemon');

const btnStart = document.querySelector('#button-start')

//pokemonContainer.forEach($item => $item.style.display = 'none');
// const allButtons = document.querySelectorAll('.button');
// allButtons.forEach($item => $item.remove());

btnStart.addEventListener('click', () => {
  btnStart.remove();
  const title = document.createElement('h2');
  title.classList.add('title');
  title.innerText = 'Выбрать своего покемона';
  $control.appendChild(title);
  pokemons.forEach(item => {
    console.log(item);
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
      console.log( $text.innerText)
      title.remove();
   //   pokemonContainer.forEach($item => $item.style.display = 'flex')
      const allButtons = document.querySelectorAll('.control .button');
      allButtons.forEach($item => $item.remove());
      attack()
    })

  })
})

// function  generatePlayer() {
//   return pokemons[random(pokemons.length - 1)];
// }
// console.log(generatePlayer())


let player1 = new Pokemon({
   ...pikachu,
  selectors: 'player1',
})

let player2 = new Pokemon({
  ...bulbasaur,
  selectors: 'player2',
})


function attack() {
player1.attacks.forEach(item => {
  console.log(item);
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












