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
