const firstRow = "мама мыла раму";
const secondRow = "собака друг человека";
const letter = prompt("Введите букву");

function iteratorFunc(nameRow) {
  let count = 0;
  for (let i = 0; i <= nameRow.length; i++) {
    if (nameRow.charAt(i) === letter) {
      count++;
    }
  }
  return count;
}

function getRow(firstRow, secondRow) {
  if (iteratorFunc(firstRow) === 0 && iteratorFunc(secondRow) === 0) {
    return "этой буквы нет в данных фразах";
  } else if (iteratorFunc(firstRow) === iteratorFunc(secondRow)) {
    return "количество букв одинаково в обоих фразах";
  } else {
    return iteratorFunc(firstRow) > iteratorFunc(secondRow)
      ? firstRow
      : secondRow;
  }
}
alert(getRow(firstRow, secondRow));

const phone = prompt("Введите номер телефона");

function formattedPhone(phone) {
  let result = "";

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
  }
  return result;
}

alert(formattedPhone(phone));
