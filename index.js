const firstRow = prompt("Введите первую фразу");
const secondRow = prompt("Введите вторую фразу");
const LETTER = prompt("Введите букву");

function iteratorFunc(nameRow, letter) {
  let count = 0;
  for (let i = 0; i <= nameRow.length; i++) {
    if (nameRow.charAt(i) === letter) {
      count++;
    }
  }
  return count;
}

function getRow(firstRow, secondRow) {
  let firstResult = iteratorFunc(firstRow, LETTER);
  let secondResult = iteratorFunc(secondRow, LETTER);

  if (firstResult === 0 && secondResult === 0) {
    return "Буквы  "+ LETTER + " нет в данных фразах";
  } else if (firstResult === secondResult) {
    return "Количество букв " + LETTER + " одинаково в обоих фразах";
  } else {
    return firstResult > secondResult ? firstRow : secondRow;
  }
}
alert(getRow(firstRow, secondRow));

const phone = prompt("Введите номер телефона");

function formattedPhone(phone) {
  let result = "";

  for (let i = 0; i <= phone.length; i++) {
    if (phone.length === 12 && typeof phone.charAt(i) === "number") {
      if (i === 1) {
        result += phone.charAt(i) + " " + "(";
      } else if (i === 5) {
        result += ")" + " " + phone.charAt(i);
      } else if (i === 8) {
        result += "-" + phone.charAt(i);
      } else if (i === 10) {
        result += "-" + phone.charAt(i);
      } else result += phone.charAt(i);
    } else if (phone.length === 11 && typeof phone.charAt(i) === "number") {
      if (i === 0) {
        result += "+" + "7" + " " + "(";
      } else if (i === 4) {
        result += ")" + " " + phone.charAt(i);
      } else if (i === 7) {
        result += "-" + phone.charAt(i);
      } else if (i === 9) {
        result += "-" + phone.charAt(i);
      } else result += phone.charAt(i);
    } else if (phone.length === 10 && typeof phone.charAt(i) === "number") {
      if (i === 0) {
        result += "+" + "7" + " " + "(" + phone.charAt(i);
      } else if (i === 3) {
        result += ")" + " " + phone.charAt(i);
      } else if (i === 6) {
        result += "-" + phone.charAt(i);
      } else if (i === 8) {
        result += "-" + phone.charAt(i);
      } else result += phone.charAt(i);
    } else return "Введите номер телефона в верном формате";
  }
  return result;
}

alert(formattedPhone(phone));
