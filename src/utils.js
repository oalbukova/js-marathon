export const random = (max, min = 0) => {
  const num = max - min;
  return Math.ceil(Math.random() * num) + min;
}

export function countBtn(count, el) {
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

export const generateLog = (player1, player2, count) => {
  const {name, hp: {current, total} } = player1;
  const {name: player2Name} = player2;

  const logs = [
    `${name} вспомнил что-то важное, но неожиданно ${player2Name}, не помня себя от испуга, ударил в предплечье врага. -${count}, [${current}/${total}]`,
    `${name} поперхнулся, и за это ${player2Name} с испугу приложил прямой удар коленом в лоб врага. -${count}, [${current}/${total}]`,
    `${name} забылся, но в это время наглый ${player2Name}, приняв волевое решение, неслышно подойдя сзади, ударил. -${count}, [${current}/${total}]`,
    `${name} пришел в себя, но неожиданно ${player2Name} случайно нанес мощнейший удар. -${count}, [${current}/${total}]`,
    `${name} поперхнулся, но в это время ${player2Name} нехотя раздробил кулаком <вырезанно цензурой> противника. -${count}, [${current}/${total}]`,
    `${name} удивился, а ${player2Name} пошатнувшись влепил подлый удар. -${count}, [${current}/${total}]`,
    `${name} высморкался, но неожиданно ${player2Name} провел дробящий удар. -${count}, [${current}/${total}]`,
    `${name} пошатнулся, и внезапно наглый ${player2Name} беспричинно ударил в ногу противника. -${count}, [${current}/${total}]`,
    `${name} расстроился, как вдруг, неожиданно ${player2Name} случайно влепил стопой в живот соперника. -${count}, [${current}/${total}]`,
    `${name} пытался что-то сказать, но вдруг, неожиданно ${player2Name} со скуки, разбил бровь сопернику. -${count}, [${current}/${total}]`,
  ];
  return logs[random(logs.length - 1)];
}

