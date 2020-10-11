import {$control, allSpan, btnStart, pokemonContainer} from "./constants";
import {countBtn, generateLog} from "./utils";
import Pokemon from "./Pokemon.js";
let i = 1;

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
            player1.hp.total = 200
            player1.hp.current= 200;

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

                  if (player1.hp.current <= 0) {
                    player1.hp.current = 0;
                    const allButtons = document.querySelectorAll('.button');
                    const winnerText = () => {
                      return (`Бедный ${player1.name} пал на поле боя! `)
                    }
                    allButtons.forEach($item => $item.remove());
                    const $btn = document.createElement('a');
                    $btn.classList.add('button');
                    $btn.innerText = 'Начать сначала?';
                    $btn.setAttribute('href', '../index.html')
                    $control.appendChild($btn);
                    const title = document.createElement('h2');
                    title.classList.add('title');
                    title.innerText = winnerText(player1, player2);
                    $control.insertBefore(title, $btn);
                    document.getElementById('pokemon-player1').style.backgroundColor = "red";
                  }
                }, $btn, player1.name, player2.name);
              player2.changeHP(damage.kick.player1, function (count) {
                const log =
                  this === player2
                    ? generateLog(player1, player2, count)
                    : generateLog(player2, player1, count);
                insertLog(log);


                if (player2.hp.current <= 0 && player1.hp.current > 0) {
                  player2.hp.current = 0;


                  const allButtons = document.querySelectorAll('.button');
                  const winnerText = () => {
                    return (`Бедный ${player2.name} пал на поле боя! `)
                  }
                  allButtons.forEach($item => $item.remove());

                  const $btn = document.createElement('a');
                  $btn.classList.add('button');
                  $btn.classList.add('button-start');
                  $btn.innerText = 'Начать сначала?';
                  $btn.setAttribute('href', '../index.html')
                  $control.append($btn);

                  const btnStart = document.createElement('button');
                  btnStart.classList.add('button');
                  btnStart.classList.add('button-start');
                  btnStart.innerText = 'Продолжить?';
                  $control.appendChild(btnStart);




                     i++;
                  document.getElementById('lvl-player1').innerText = `Lv. ${i}`;

                  const title = document.createElement('h2');
                  title.classList.add('title');
                  title.innerText = winnerText(player1, player2);
                  $control.insertBefore(title, btnStart);
                  document.getElementById('pokemon-player2').style.backgroundColor = "red";

                  btnStart.addEventListener('click', () => {
                    const getNewRendomPokemon = async () => {
                      const response = await fetch('https://reactmarathon-api.netlify.app/api/pokemons?random=true');
                      const body = await response.json();
                      return body;
                    }
                    const startNextRaund = async () => {
                      const nextRendomPokemon = await getNewRendomPokemon();
                      let player2 = new Pokemon({
                        ...nextRendomPokemon,
                        selectors: 'player2',
                      })

                      player1.hp.current = player1.hp.total;
                      document.getElementById('health-player1').innerText = player1.hp.current + "/" + player1.hp.total;
                      document.getElementById('progressbar-player1').style.width = 100 + "%";
                      document.getElementById('progressbar-player1').classList.remove('critical');
                      document.getElementById('progressbar-player1').classList.remove('low');
                      document.getElementById('progressbar-player2').classList.remove('critical');
                      document.getElementById('progressbar-player2').classList.remove('low');
                      document.getElementById('pokemon-player2').style.backgroundColor = "transparent";
                      title.remove();
                      btnStart.remove();
                      document.getElementById('logs').innerText = '';

                      attack(player1, player2);
                    }
                    startNextRaund();
                  })
                }

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

