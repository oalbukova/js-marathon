import Pokemon from "./Pokemon.js";
import {random, generateLog, countBtn} from './utils.js';
import {pokemons} from './pokemons.js';

const pikachu = pokemons.find(item => item.name === 'Pikachu');
const bulbasaur = pokemons.find(item => item.name === 'Bulbasaur');

// const $elImg = document.getElementById('img-player1');
// $elImg.src = pokemons[0].img;
const $control = document.querySelector('.control');

const allSpan = document.querySelectorAll('.lvl');
const allImg = document.querySelectorAll('.sprite');
const names = document.querySelectorAll('.name');
const details = document.querySelector('.details');
const textHP = document.querySelectorAll('.text');
const bar = document.querySelectorAll('.bar');



const btnStart = document.querySelector('#button-start')
const player1Container = document.querySelector('.player1')


allSpan.forEach($item => $item.remove());
allImg.forEach($item => $item.remove());
names.forEach($item => $item.remove());
textHP.forEach($item => $item.remove());
bar.forEach($item => $item.style.display = 'none');
// const allButtons = document.querySelectorAll('.button');
// allButtons.forEach($item => $item.remove());

btnStart.addEventListener('click', () => {
  btnStart.remove();
  const title = document.createElement('h2');
  title.classList.add('title');
  title.innerText = 'Выбрать своего покемона';
  $control.appendChild(title);
  pokemons.forEach(item => {
 //   console.log(item);
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
      title.remove();
      const allButtons = document.querySelectorAll('.control .button');
      allButtons.forEach($item => $item.remove());

      const $imgPlayer1 = document.createElement('img');
      $imgPlayer1.classList.add('sprite');
      $imgPlayer1.src = item.img;
      player1Container.appendChild($imgPlayer1);

      const $namePlayer1 = document.createElement('h2');
      $namePlayer1.classList.add('name');
      $namePlayer1.innerText = item.name;
      details.insertBefore($namePlayer1, document.querySelector('.hp'));

      const $textHp = document.createElement('span');
      $textHp.classList.add('text');
      $textHp.innerText = item.hp +'/' +item.hp;
      document.querySelector('.hp').appendChild($textHp);
      bar.forEach($item => $item.style.display = 'block');

      attack(item)
    })
    
    const generatePlayer = () => {
      return pokemons[random(pokemons.length - 1)];
    }


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


function attack(player1) {
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












