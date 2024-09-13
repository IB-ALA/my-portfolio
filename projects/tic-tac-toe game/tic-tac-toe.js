// console.log('we go');

let allowedToPlay = true;
let isPlaying = false;
let whoseTurn = true;
let move;
let winner;
let gridArray = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
let scores = {
  player1: 0,
  player2: 0
};
let winningSide;

const playGameElem = document.querySelector('.js-play-game-button');
const gameInfoElem = document.querySelector('.js-game-info');
const gridContainerElem = document.querySelector('.js-game-grid-container');
const player1MessageElem = document.querySelector('.js-player1-message');
const player2MessageElem = document.querySelector('.js-player2-message');



// EVENTLISTENERS
playGameElem.addEventListener('click', () => {
  renderFreshGrid();
  renderGameInfo();
  showWhoseTurn();


  document.querySelector('.js-new-game-button')
  .addEventListener('click', () => {
    if (document.querySelector('.js-new-game-button').classList.contains('isPlaying')) {
      if (!allowedToPlay) {
        if (whoseTurn) {
          whoseTurn = true;
        } else {
          whoseTurn = false;
        }
      }

      allowedToPlay = true;
      winner = undefined;
      isPlaying = false;
      winningSide = undefined;

      renderFreshGrid();
      displayMove();
      showWhoseTurn();
      boldenNewGameButton();
    }
  });


  document.querySelector('.js-reset-game-button')
  .addEventListener('click', () => {
    if (document.querySelector('.js-reset-game-button').classList.contains('isPlaying')) {
      allowedToPlay = true;
      whoseTurn = true;
      winner = undefined;
      isPlaying = false;
      scores.player1 = 0;
      scores.player2 = 0;
      winningSide = undefined;

      renderScores();
      renderFreshGrid();
      displayMove();
      showWhoseTurn();
      boldenNewGameButton();
      boldenResetScoreButton();
    }
  });
})
// EVENT LISTENERS END HERE.



function yourMove(firstIndex, secondIndex) {
  if ((gridArray[firstIndex][secondIndex] === '') && (allowedToPlay === true)) {
    findMove(firstIndex, secondIndex);
    displayMove();
    checkMoves();
    showingWinDrawEffect();
    displayWinner();
    showWhoseTurn();
    updateScores();
  }
}


function findMove(firstIndex, secondIndex) {
  whoseTurn ? move = 'X' : move = 'O';
  gridArray[firstIndex][secondIndex] = move;
  isPlaying = true;
  whoseTurn ? whoseTurn = false : whoseTurn = true;

  boldenNewGameButton();
}


function displayMove() {
  document.querySelector('.js-00').innerHTML = gridArray[0][0];
  document.querySelector('.js-01').innerHTML = gridArray[0][1];
  document.querySelector('.js-02').innerHTML = gridArray[0][2];
  document.querySelector('.js-10').innerHTML = gridArray[1][0];
  document.querySelector('.js-11').innerHTML = gridArray[1][1];
  document.querySelector('.js-12').innerHTML = gridArray[1][2];
  document.querySelector('.js-20').innerHTML = gridArray[2][0];
  document.querySelector('.js-21').innerHTML = gridArray[2][1];
  document.querySelector('.js-22').innerHTML = gridArray[2][2];
}


function showWhoseTurn() {
  let player1Text = document.querySelector('.js-player1-text');
  let player2Text = document.querySelector('.js-player2-text');

  if (allowedToPlay === false) {
    if (player1Text.classList.contains('player-turn')) {
      player1Text.classList.remove('player-turn');
    }
    if (player2Text.classList.contains('player-turn')) {
      player2Text.classList.remove('player-turn');
    }
  } else if (whoseTurn) {
    player1Text.classList.add('player-turn');
    if (player2Text.classList.contains('player-turn')) {
      player2Text.classList.remove('player-turn');
    }
  } else if (!whoseTurn) {
    player2Text.classList.add('player-turn');
    if (player1Text.classList.contains('player-turn')) {
      player1Text.classList.remove('player-turn');
    }
  }
}


function boldenNewGameButton() {
  if (isPlaying) {
    document.querySelector('.js-new-game-button').classList.add('isPlaying');
  } else {
    document.querySelector('.js-new-game-button').classList.remove('isPlaying');
  }
}


function checkMoves() {
//   // VERTICAL WINS
  if ((gridArray[0][0] === gridArray[1][0]) && (gridArray[1][0] === gridArray[2][0]) && (gridArray[0][0] !== '')) {
    winner = gridArray[0][0];
    winningSide = 'row1';
  } else if ((gridArray[0][1] === gridArray[1][1]) && (gridArray[1][1] === gridArray[2][1]) && (gridArray[0][1] !== '')) {
    winner = gridArray[0][1];
    winningSide = 'row2';
  } else if ((gridArray[0][2] === gridArray[1][2]) && (gridArray[1][2] === gridArray[2][2]) && (gridArray[0][2] !== '')) {
    winner = gridArray[0][2];
    winningSide = 'row3';
  } 
  
  // HORINZONTAL WINS
  else if ((gridArray[0][0] === gridArray[0][1]) && (gridArray[0][1] === gridArray[0][2]) && (gridArray[0][0] !== '')) {
    winner = gridArray[0][0];
    winningSide = 'col1';
  } else if ((gridArray[1][0] === gridArray[1][1]) && (gridArray[1][1] === gridArray[1][2]) && (gridArray[1][0] !== '')) {
    winner = gridArray[1][0];
    winningSide = 'col2';
  } else if ((gridArray[2][0] === gridArray[2][1]) && (gridArray[2][1] === gridArray[2][2]) && (gridArray[2][0] !== '')) {
    winner = gridArray[2][0];
    winningSide = 'col3';
  } 
  
  // DIAGONAL WINS
  else if ((gridArray[0][0] === gridArray[1][1]) && (gridArray[1][1] === gridArray[2][2]) && (gridArray[0][0] !== '')) {
    winner = gridArray[0][0];
    winningSide = '-slope';
  } else if ((gridArray[0][2] === gridArray[1][1]) && (gridArray[1][1] === gridArray[2][0]) && (gridArray[0][2] !== '')) {
    winner = gridArray[0][2];
    winningSide = '+slope';
  } 

  // DRAW CHECK
  else if (!checkForDraw()) {
    winner = 'draw';
  }
}


// DRAW CHECK
function checkForDraw() {
  let draw = false;
  for (let i = 0; i < gridArray.length; i++) {
    for (let j = 0; j < gridArray[i].length; j++) {
      if (gridArray[i][j] === '') {
        draw = true;
      }
    }
  }
  return draw;
}


function showingWinDrawEffect() {
  let elem00 = document.querySelector('.js-00');
  let elem01 = document.querySelector('.js-01');
  let elem02 = document.querySelector('.js-02');
  let elem10 = document.querySelector('.js-10');
  let elem11 = document.querySelector('.js-11');
  let elem12 = document.querySelector('.js-12');
  let elem20 = document.querySelector('.js-20');
  let elem21 = document.querySelector('.js-21');
  let elem22 = document.querySelector('.js-22');

  if (winningSide === 'row1') {
    removeHoverClassName();

    elem00.classList.add('win-game');
    elem10.classList.add('win-game');
    elem20.classList.add('win-game');
  } 
  else if (winningSide === 'row2') {
    removeHoverClassName();

    elem01.classList.add('win-game');
    elem11.classList.add('win-game');
    elem21.classList.add('win-game');
  } 
  else if (winningSide === 'row3') {
    removeHoverClassName();

    elem02.classList.add('win-game');
    elem12.classList.add('win-game');
    elem22.classList.add('win-game');
  } 
  else if (winningSide === 'col1') {
    removeHoverClassName();

    elem00.classList.add('win-game');
    elem01.classList.add('win-game');
    elem02.classList.add('win-game');
  } 
  else if (winningSide === 'col2') {
    removeHoverClassName();

    elem10.classList.add('win-game');
    elem11.classList.add('win-game');
    elem12.classList.add('win-game');
  } 
  else if (winningSide === 'col3') {
    removeHoverClassName();

    elem20.classList.add('win-game');
    elem21.classList.add('win-game');
    elem22.classList.add('win-game');
  } 
  else if (winningSide === '-slope') {
    removeHoverClassName();

    elem00.classList.add('win-game');
    elem11.classList.add('win-game');
    elem22.classList.add('win-game');
  } 
  else if (winningSide === '+slope') {
    removeHoverClassName();

    elem02.classList.add('win-game');
    elem11.classList.add('win-game');
    elem20.classList.add('win-game');
  } else if (winner === 'draw') {
    document.querySelectorAll('.each-box')
    .forEach((eachBox) => {
      eachBox.classList.remove('hover');
      eachBox.classList.add('draw-game');
    });
  }
}


function removeHoverClassName() {
  document.querySelectorAll('.each-box')
  .forEach((eachBox) => {
    eachBox.classList.remove('hover');
  });
}


function displayWinner() {
  if (winner === 'X') {
    player1MessageElem.innerHTML = `
      <div>PLAYER 1</div>
        <button>${winner}</button>
      <div>WINS</div>
    `;
    allowedToPlay = false;
    whoseTurn = false;
    setTimeout(() => {
      player1MessageElem.innerHTML = '';
    }, 3000);
  } else if (winner === 'O') {
    player2MessageElem.innerHTML = `
      <div>PLAYER 2</div>
        <button>${winner}</button>
      <div>WINS</div>
    `;
    allowedToPlay = false;
    whoseTurn = true;
    setTimeout(() => {
      player2MessageElem.innerHTML = '';
    }, 3000);
  } else if (winner === 'draw') {
    allowedToPlay = false;
    player1MessageElem.innerHTML = `
      <div>DRAW</div>
      <div>GAME</div>
    `;
    player2MessageElem.innerHTML = `
      <div>DRAW</div>
      <div>GAME</div>
    `;
    setTimeout(() => {
      player1MessageElem.innerHTML = '';
      player2MessageElem.innerHTML = '';
    }, 3000);
  }
}


function updateScores() {
  if (winner === 'X') {
    scores.player1++;
    renderScores();
  } else if (winner === 'O') {
    scores.player2++;
    renderScores();
  }

  boldenResetScoreButton();
}


function renderScores() {
  document.querySelector('.p1').innerHTML = scores.player1;
  document.querySelector('.p2').innerHTML = scores.player2;
}


function boldenResetScoreButton() {
  if ((scores.player1 > 0) || (scores.player2 > 0)) {
    document.querySelector('.js-reset-game-button').classList.add('isPlaying');
  } else if ((scores.player1 === 0) || (scores.player2 === 0)) {
    document.querySelector('.js-reset-game-button').classList.remove('isPlaying');
  }
}


function renderGameInfo() {
  gameInfoElem.innerHTML = `
    <section class="score-board js-score-board">
      <div class="players">
        <div class="player1-text js-player1-text">PLAYER 1</div>
        <button class="player-symbol">X</button>
        <button class="score-container p1">${scores.player1}</button>
      </div>
      <div class="players">
        <button class="score-container p2">${scores.player2}</button>
        <button class="player-symbol">O</button> 
        <div class="player2-text js-player2-text">PLAYER 2</div>
      </div>
    </section>

    <section class="control-side">
      <div class="control-buttons-container">
        <button class="restart-game-button js-new-game-button">NEW GAME</button>
        <button class="reset-game-button js-reset-game-button">RESET SCORE</button>
      </div>
    </section>
  `;
}


function renderFreshGrid() {
  gridArray = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  gridContainerElem.innerHTML = `
  <div class="game-grid">
    <div class="each-box hover js-00"></div>
    <div class="each-box hover js-01"></div>
    <div class="each-box hover js-02"></div>
    <div class="each-box hover js-10"></div>
    <div class="each-box hover js-11"></div>
    <div class="each-box hover js-12"></div>
    <div class="each-box hover js-20"></div>
    <div class="each-box hover js-21"></div>
    <div class="each-box hover js-22"></div>
  </div>
  `;

  document.querySelector('.js-00').addEventListener('click', () => {
    yourMove(0, 0);
  });
  document.querySelector('.js-01').addEventListener('click', () => {
    yourMove(0, 1);
  });
  document.querySelector('.js-02').addEventListener('click', () => {
    yourMove(0, 2);
  });
  document.querySelector('.js-10').addEventListener('click', () => {
    yourMove(1, 0);
  });
  document.querySelector('.js-11').addEventListener('click', () => {
    yourMove(1, 1);
  });
  document.querySelector('.js-12').addEventListener('click', () => {
    yourMove(1, 2);
  });
  document.querySelector('.js-20').addEventListener('click', () => {
    yourMove(2, 0);
  });
  document.querySelector('.js-21').addEventListener('click', () => {
    yourMove(2, 1);
  });
  document.querySelector('.js-22').addEventListener('click', () => {
    yourMove(2, 2);
  });

  document.body.addEventListener('keydown', (event) => {
    if (event.key === '1') {
      yourMove(0, 0);
    } else if (event.key === '2') {
      yourMove(0, 1);
    } else if (event.key === '3') {
      yourMove(0, 2);
    } else if (event.key === '4') {
      yourMove(1, 0);
    } else if (event.key === '5') {
      yourMove(1, 1);
    } else if (event.key === '6') {
      yourMove(1, 2);
    } else if (event.key === '7') {
      yourMove(2, 0);
    } else if (event.key === '8') {
      yourMove(2, 1);
    } else if (event.key === '9') {
      yourMove(2, 2);
    }
  });
}