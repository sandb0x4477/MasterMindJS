// Variables
let colors = {
  0: 'white',
  1: 'black',
  2: 'red',
  3: 'yellow',
  4: 'green',
  5: 'blue'
}

let code = [],
    guess = [],
    secretSockets = document.getElementsByClassName('secret'),
    selections = document.getElementsByClassName('selection');
    hintPegs = document.getElementsByClassName('h-peg');


// Functions
function GameSetup() {
  for (let i = 0; i < selections.length; i++) {
    selections[i].addEventListener('click', insertGuess, false);
  }
}


function insertGuess() {
  let self = this;
  let value = parseInt(self.value);
  let socket = document.getElementById(guess.length);

  socket.className += ' ' + colors[value];
  guess.push(value);

  if (guess.length % 4 == 0) {
    compare();
  }
}


function compare() {
  let guessLastFour = guess.slice(-4);
  let blacks = 0;
  let whites = 0;

  // Compare how many black pegs
  for (let i = 0; i < code.length; i++) {
    if (guessLastFour[i] === code[i]) {
      blacks++
    }
  }

  if (blacks === 4) {
    console.log('Bingo');
  }

  //Compare how many white pegs
  for (var j = 0; j < code.length; j++) {
    if (guessLastFour.indexOf(code[j]) !== -1) {
      whites++;
      guessLastFour[guessLastFour.indexOf(code[j])] = 0;
    }
  }
  insertHints(blacks, (whites - blacks));
}


function insertHints(blacks, whites) {
  let tempArr = [];

  for (let i = 0; i < blacks; i++) {
    tempArr.push(1);
  }

  for (let j = 0; j < whites; j++) {
    tempArr.push(0);
  }

  for (let k = 0; k < tempArr.length; k++) {
    hintPegs[(32 - guess.length) + k].className += ' ' + colors[tempArr[k]];
  }
}


function generateCode() {
  for (let i = 0; i < 4; i++) {
    code[i] = Math.floor(Math.random() * 6);
  }
}


function assignColors(code) {
  code.forEach(el => {
    console.log(colors[el]);
  });
}


function revealCode() {
  for (let i = 0; i < 4; i++) {
    secretSockets[i].className += ' ' + colors[code[i]];
    secretSockets[i].innerHTML = '';
  }
}


GameSetup();
generateCode();
// assignColors(code);
revealCode();
