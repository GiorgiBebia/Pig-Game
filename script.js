"use strict";

const player1Score = document.querySelector("#score--0");
const player2Score = document.querySelector("#score--1");
const diceImg = document.querySelector(".dice");
const newGame = document.querySelector(".btn--new");
const rollDice = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");
const player1CurrentScore = document.querySelector("#current--0");
const player2CurrentScore = document.querySelector("#current--1");
const player1Section = document.querySelector(".player--0");
const player2Section = document.querySelector(".player--1");

player1Score.textContent = 0;
player2Score.textContent = 0;
diceImg.classList.add("hidden");

let currentScore = 0;
let scores = [0, 0];
let activePlayer = 0;
let playing = true;

function switchPlayer() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player2Section.classList.toggle("player--active");
  player1Section.classList.toggle("player--active");
}

rollDice.addEventListener("click", function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceImg.src = `dice-${dice}.png`;
    diceImg.classList.remove("hidden");

    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

hold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      diceImg.classList.add("hidden");
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

newGame.addEventListener("click", function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  activePlayer = 0;
  currentScore = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
  player1Score.textContent = 0;
  player2Score.textContent = 0;
  player1CurrentScore.textContent = 0;
  player2CurrentScore.textContent = 0;
  playing = true;
  scores = [0, 0];
});
