const firstRow = "мама мыла раму";
const secondRow = "собака друг человека";
const letter = prompt("Введите букву");

function getRow(firstRow, secondRow) {
  let count1 = 0;
  let count2 = 0;

  for (let i = 0; i <= firstRow.length; i++) {
    if (firstRow.charAt(i) === letter) {
      count1++;
    }
  }

  for (let i = 0; i <= secondRow.length; i++) {
    if (secondRow.charAt(i) === letter) {
      count2++;
    }
  }

  if (count1 === count2) {
    return "количество букв одинаково в обоих фразах";
  } else {
    return count1 > count2 ? firstRow : secondRow;
  }
}

alert(getRow(firstRow, secondRow));

function formattedPhone(phone) {
  let result = "";
  result =
    phone.charAt(0) +
    phone.charAt(1) +
    " " +
    "(" +
    phone.charAt(2) +
    phone.charAt(3) +
    phone.charAt(4) +
    ")" +
    " " +
    phone.charAt(5) +
    phone.charAt(6) +
    phone.charAt(7) +
    "-" +
    phone.charAt(8) +
    phone.charAt(9) +
    "-" +
    phone.charAt(10) +
    phone.charAt(11);
  return result;
}

alert(formattedPhone("+71234567890"));
