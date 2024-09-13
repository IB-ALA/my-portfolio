let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};
let canPlay = true;
let timeOutId;
let isAutoPlaying = false;
let intervalId;

const moveElement = document.querySelector('.js-move');
const scoreElement = document.querySelector('.js-score');

updateScoreElement();


//EVENTS LISTENERS FOR BUTTONS.
document.querySelector('.js-rock-button')
.addEventListener('click', () => {
  if (canPlay) {
    playGame('rock');
  }
});

document.querySelector('.js-paper-button')
.addEventListener('click', () => {
  if (canPlay) {
    playGame('paper');
  }
});

document.querySelector('.js-scissors-button')
.addEventListener('click', () => {
  if (canPlay) {
    playGame('scissors')
  }
});

document.querySelector('.js-reset-score-button')
.addEventListener('click', () => {
  if (score.wins !== 0 || score.losses !== 0 || score.ties !== 0) {
    document.querySelector('.js-consent-container')
    .innerHTML = `
      <div class="consent-message-holder">
        <div class="consent-message">
          <p>Are you sure you want to reset the score? </p>
      
          <div class="consent-message-buttons">
            <button class="yes-button js-yes-button">Yes</button>
            <button class="no-button js-no-button">No</button>
          </div>
        </div>
      </div>
    `;
    canPlay = false;

    if (document.querySelector('.js-auto-play-button').innerHTML === 'Stop Playing') {
      document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
      clearInterval(intervalId);
      isAutoPlaying = false;
    } 
  
    document.querySelector('.js-yes-button')
    .addEventListener('click', () => {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0
  
      updateScoreElement();
      localStorage.removeItem('score');
  
      document.querySelector('.js-consent-container').innerHTML = '';
      canPlay = true;
    });
  
    document.querySelector('.js-no-button')
    .addEventListener('click', () => {
      document.querySelector('.js-consent-container').innerHTML = '';
      canPlay = true;
    });
  }
});

document.querySelector('.js-auto-play-button')
.addEventListener('click', () => {
  if (canPlay) {
    autoPlay();

    if (document.querySelector('.js-auto-play-button').innerHTML === 'Stop Playing') {
      document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
    } else {
      document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
    }
  }
});

//EVENT LISTENERS FOR KEYDOWN.
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    if (canPlay) {
      playGame('rock');
    }
  } 
  else if (event.key === 'p') {
    if (canPlay) {
      playGame('paper');
    }
  } 
  else if (event.key === 's') {
    if (canPlay) {
      playGame('scissors')
    }
  } 
  else if (event.key === 'a') {
    if (canPlay) {
      autoPlay();
  
      if (document.querySelector('.js-auto-play-button').innerHTML === 'Stop Playing') {
        document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
      } else {
        document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
      }
    }
  } 
  else if (event.key === 'Backspace') {
    if (score.wins !== 0 || score.losses !== 0 || score.ties !== 0) {
      document.querySelector('.js-consent-container')
      .innerHTML = `
        <div class="consent-message-holder">
          <div class="consent-message">
            <p>Are you sure you want to reset the score? </p>
        
            <div class="consent-message-buttons">
              <button class="yes-button js-yes-button">Yes</button>
              <button class="no-button js-no-button">No</button>
            </div>
          </div>
        </div>
      `;
      canPlay = false;
  
      if (document.querySelector('.js-auto-play-button').innerHTML === 'Stop Playing') {
        document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
        clearInterval(intervalId);
        isAutoPlaying = false;
      } 
    
      document.querySelector('.js-yes-button')
      .addEventListener('click', () => {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0
    
        updateScoreElement();
        localStorage.removeItem('score');
    
        document.querySelector('.js-consent-container').innerHTML = '';
        canPlay = true;
      });
    
      document.querySelector('.js-no-button')
      .addEventListener('click', () => {
        document.querySelector('.js-consent-container').innerHTML = '';
        canPlay = true;
      });
    }
  }


  // TRYING TO ADD ENTER TO GIVE A YES RESPONSE TO RESETING  SCORES
  /*
  document.querySelector('.js-reset-score-button')
  .addEventListener('keydown', (event) => {
    console.log(event)
    if (event.key === 'Enter') {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
  
      updateScoreElement();
  
      // resultElem.innerHTML = '';
  
      // moveElement.innerHTML = '';
  
      localStorage.removeItem('score');
  
      document.querySelector('.js-consent-container').innerHTML = 'hjkgf';
    }
    // else if (event.key === 'n') {
    //   document.querySelector('.js-consent-container').innerHTML = '';
    // }
  });
  */

});



function playGame(playerMove) {
  const computerMove = pickComputerMove(); 
  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You Lose';
    } else if (computerMove === 'scissors') {
      result = 'Tie'; 
    } else if (computerMove === 'paper') {
      result = 'You Win';
    }
  } 
    else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You Win';
    } else if (computerMove === 'scissors') {
      result = 'You Lose'; 
    } else if (computerMove === 'paper') {
      result = 'Tie';
    }
  }
    else if (playerMove === 'rock') { 
    if (computerMove === 'rock') {
      result = 'Tie';
    } else if (computerMove === 'scissors') {
      result = 'You Win'; 
    } else if (computerMove === 'paper') {
      result = 'You Lose';
    }
  }

  if (result === 'You Win') {
    score.wins++;
  } else if (result === 'You Lose') {
    score.losses++;
  } else if (result === 'Tie') {
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  moveElement.innerHTML = `
  <div>
    <p>You</p>
    <img src="images/${playerMove}-emoji.png" alt="" class="player-move-icon">
  </div>
  <div class="js-result result">${result}</div>
  <div>
    <img src="images/${computerMove}-emoji.png" alt="" class="computer-move-icon">
    <p>Computer</p>
  </div>
  `;

  clearTimeout(timeOutId);
  timeOutId = setTimeout(() => {
    moveElement.innerHTML = `
    <p class="make-move-text">Make A Move</p>
    `;
  }, 3000);
  updateScoreElement();
};


function updateScoreElement() {
  scoreElement.innerHTML = `
  <p>
    Wins: ${score.wins}
  </p>
  <p>
    Ties: ${score.ties}
  </p>
  <p>
    Losses: ${score.losses}
  </p>
  `;
};


function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3 ) {
    computerMove = 'rock'
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper'
  } else if (randomNumber >= 2/3 && randomNumber <= 1) {
    computerMove = 'scissors'
  }

  return computerMove; 
};


function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000); 
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}