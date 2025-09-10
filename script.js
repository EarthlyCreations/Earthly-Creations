const choices = document.querySelectorAll('.choice');
const pScoreEl = document.getElementById('pScore');
const cScoreEl = document.getElementById('cScore');
const resultEl = document.getElementById('result');
const playAgainBtn = document.getElementById('playAgain');

const sounds = {
  play: document.getElementById('sound-play'),
  win: document.getElementById('sound-win'),
  lose: document.getElementById('sound-lose'),
  draw: document.getElementById('sound-draw'),
};

let pScore = 0;
let cScore = 0;

function getComputerMove() {
  const moves = ['rock', 'paper', 'scissors'];
  return moves[Math.floor(Math.random() * 3)];
}

function decideWinner(player, computer) {
  if (player === computer) return 'draw';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) {
    return 'win';
  }
  return 'lose';
}

function playRound(playerMove) {
  const computerMove = getComputerMove();
  const result = decideWinner(playerMove, computerMove);

  // Play sound
  sounds.play.currentTime = 0;
  sounds.play.play();

  // Update scores
  if (result === 'win') {
    pScore++;
    pScoreEl.textContent = pScore;
    resultEl.textContent = 'You Win!';
    sounds.win.play();
    setGlow('glow-win');
  } else if (result === 'lose') {
    cScore++;
    cScoreEl.textContent = cScore;
    resultEl.textContent = 'You Lose!';
    sounds.lose.play();
    setGlow('glow-lose');
  } else {
    resultEl.textContent = "It's a Draw.";
    sounds.draw.play();
    setGlow('glow-draw');
  }

  resultEl.style.opacity = 1;
  playAgainBtn.classList.add('visible');
}

function setGlow(type) {
  choices.forEach(choice => {
    choice.classList.remove('glow-win', 'glow-lose', 'glow-draw');
  });
  document.querySelector(`.choice[data-move="${type}"]`)?.classList.add(type);
}

choices.forEach(choice => {
  choice.addEventListener('click', () => {
    if (!playAgainBtn.classList.contains('visible')) {
      const move = choice.getAttribute('data-move');
      playRound(move);
    }
  });
});

playAgainBtn.addEventListener('click', () => {
  resultEl.style.opacity = 0;
  playAgainBtn.classList.remove('visible');
  choices.forEach(choice => {
    choice.classList.remove('glow-win', 'glow-lose', 'glow-draw');
  });
  resultEl.textContent = 'Make your move...';
});
