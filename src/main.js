import Pokemon from "./Pokemon.js";
import {random, generateLog, countBtn} from './utils.js';
import {pokemons} from './pokemons.js';
import {$control,allSpan, pokemonContainer, btnStart, $btn } from './constants.js';

pokemonContainer.forEach($item => $item.style.display = 'none');

const createTitle = (titleText) => {
  const title = document.createElement('h2');
  title.classList.add('title');
  title.innerText = titleText;
  $control.appendChild(title);
}

function startGame() {
btnStart.addEventListener('click', () => {
  btnStart.remove();
  createTitle('Выбрать своего покемона');

  pokemons.forEach(item => {
    const $btn = document.createElement('button');
    $btn.classList.add('img-button');
    $btn.classList.add('button');
    $control.appendChild($btn);

    const $img = document.createElement('img');
    $img.classList.add('image');
    $img.src = item.img;
    $btn.appendChild($img);

    const $text = document.createElement('p');
    $text.classList.add('img-text');
    $text.innerText = item.name;
    $btn.appendChild($text);

    $btn.addEventListener('click', () => {

      pokemons.splice(pokemons.indexOf(item, 0), 1);
      const secondPlayer = pokemons[random(pokemons.length - 1)];
      const pokemonName = pokemons.find(elem => elem.name === secondPlayer .name);

      let player2 = new Pokemon({
        ...pokemonName,
        selectors: 'player2',
      })

      let player1 = new Pokemon({
        ...item,
        selectors: 'player1',
      })

      document.querySelector('.title').remove();
      const allButtons = document.querySelectorAll('.control .button');
      allButtons.forEach($item => $item.remove());

      pokemonContainer.forEach($item => $item.style.display = 'block');
      allSpan.forEach($item => $item.innerText = 'Lv. 1')
      attack(player1, player2)
    })
  })
})
}

function attack(player1, player2) {
  player1.attacks.forEach(item => {
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

startGame()













