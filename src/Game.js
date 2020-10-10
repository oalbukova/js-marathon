import {$control, allSpan, btnStart, pokemonContainer} from "./constants";
import {countBtn, generateLog} from "./utils";
import Pokemon from "./Pokemon.js";

export default class Game {
  getPokemons = async () => {
    const response = await fetch('https://reactmarathon-api.netlify.app/api/pokemons');
    const body = await response.json();
    return body;
  }
  getRendomPokemon = async () => {
    const response = await fetch('https://reactmarathon-api.netlify.app/api/pokemons?random=true');
    const body = await response.json();
    return body;
  }

  start = async () => {
    const pokemons = await this.getPokemons();
    const rendomPokemon = await this.getRendomPokemon();

    pokemonContainer.forEach($item => $item.style.display = 'none');

    const createTitle = (titleText) => {
      const title = document.createElement('h2');
      title.classList.add('title');
      title.innerText = titleText;
      $control.appendChild(title);
      $control.style.maxWidth = '630px';
    }

    const startGame = () => {
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
            let player2 = new Pokemon({
              ...rendomPokemon,
              selectors: 'player2',
            })

            let player1 = new Pokemon({
              ...item,
              selectors: 'player1',
            })

            $control.style.maxWidth = '425px';
            document.querySelector('.title').remove();
            const allButtons = document.querySelectorAll('.control .button');
            allButtons.forEach($item => $item.remove());
            pokemonContainer.forEach($item => $item.style.display = 'block');
            allSpan.forEach($item => $item.innerText = 'Lv. 1')

            attack(player1, player2);
          })
        })
      })
    }

    const attack = (player1, player2) => {
      player1.attacks.forEach(item => {
          const $btn = document.createElement('button');
          $btn.classList.add('button');
          $btn.innerText = item.name;
          const countClick = countBtn(item.maxCount, $btn);
          $btn.addEventListener('click', () => {
            countClick();
            console.log("Kick");


            const getDamage = async () => {
              const response = await fetch('https://reactmarathon-api.netlify.app/api/fight?player1id=25&attackId=1&player2id=1');
              const body = await response.json();
              return body;
            }
            const getDamagePlayer = async () => {
              const damage = await getDamage();
              console.log(damage);
              console.log(damage.kick);
              console.log(damage.kick.player1);
              console.log(damage.kick.player2);

              player1.changeHP(damage.kick.player2,
                function (count) {
                  const log = this === player1
                    ? generateLog(player2, player1, count)
                    : generateLog(player1, player2, count);
                  insertLog(log);
                }, $btn, player1.name, player2.name);
              player2.changeHP(damage.kick.player1, function (count) {
                const log =
                  this === player2
                    ? generateLog(player1, player2, count)
                    : generateLog(player2, player1, count);
                insertLog(log);
              }, $btn, player2.name, player1.name);
            }
            getDamagePlayer();
          });
          $control.appendChild($btn);
        }
      )
  
    }

    const insertLog = (log) => {
      const $logs = document.querySelector('#logs');
      const $p = document.createElement('p');
      $p.innerText = `${log}`
      $logs.insertBefore($p, $logs.children[0]);
    }

    startGame();

  }
}

