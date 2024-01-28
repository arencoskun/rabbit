export function fillGuesses(n: number): Array<number> {
  var guessesArray: Array<number> = [];

  if (n % 2 == 0) {
    for (let i = 0; i < n; i++) {
      guessesArray.push(i);
    }

    for (let j = 1; j < n; j++) {
      guessesArray.push(j);
    }
  } else {
    for (let j = 1; j < n; j++) {
      guessesArray.push(j);
    }

    for (let i = 0; i < n; i++) {
      guessesArray.push(i);
    }
  }

  console.log(guessesArray);

  return guessesArray;
}

export function fillBoxes(n: number): Array<number> {
  var boxesArray: Array<number> = [];

  for (let i = 0; i < n; i++) {
    boxesArray.push(0);
  }

  return boxesArray;
}

export function getBGColorWithCorrespondingBoxID(id: number): string {
  var bgcolor: string = "";

  switch (id) {
    case 0:
      bgcolor = "";
      break;
    case 1:
      bgcolor = "bg-blue-500";
      break;
    case 2:
      bgcolor = "bg-yellow-500";
      break;
    case 3:
      bgcolor = "bg-red-500";
      break;
  }

  return bgcolor;
}

export function getMarginWithCorrespondingN(n: number) {
  if (n <= 40) return "-mt-96";
  if (n > 40 && n <= 70) return "-mt-72";
  if (n > 70 && n <= 100) return "-mt-48";

  return "";
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
