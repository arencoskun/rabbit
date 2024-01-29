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

var benchmark_isFound: boolean = false;
var benchmark_currentGuess: number = 0;
var benchmark_turn: number = 1;

function resetBenchmark() {
  benchmark_isFound = false;
  benchmark_currentGuess = 0;
  benchmark_turn = 1;
}
// async (url: string): Promise<T> =>
export const runBenchmarkAsync = async (
  n: number,
  guessesArray: Array<number>,
  beginTime: number
): Promise<number | undefined> => {
  resetBenchmark();
  var rp: number = getRandomInt(n);
  while (!benchmark_isFound) {
    if (benchmark_currentGuess === rp) {
      benchmark_isFound = true;
      return new Promise<number>((resolve) => {
        resolve(performance.now() - beginTime);
      });
    }

    benchmark_currentGuess =
      guessesArray![n % 2 != 0 ? benchmark_turn - 1 : benchmark_turn];

    if (rp === 0) {
      rp++;
    } else if (rp === n - 1) {
      rp--;
    } else {
      rp = Math.random() < 0.5 ? rp - 1 : rp + 1;
    }

    benchmark_turn++;
  }
  return undefined;
};

export const getAverageBenchmarkResultAsync = async (
  n: number,
  guessesArray: Array<number>,
  beginTime: number
): Promise<number | undefined> => {
  var sum: number = 0;
  for (var i = 0; i < 1000; i++) {
    const bench = await runBenchmarkAsync(n, guessesArray, beginTime);
    if (bench === undefined) return undefined;
    sum += bench;
  }

  return new Promise<number>((resolve) => {
    resolve(sum / 1000);
  });
};
