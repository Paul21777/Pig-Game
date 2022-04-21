"use strict";

//----------------------STATE VARIABLES --------------------------
let currentScore = 0;
let playing = true;
let activePlayer = 0;
let scores = [0, 0];
//----------------------FUNCTIONS--------------------------------
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active"); //toggle permet d'ajouter la classe si elle est absente, et de la supprimer si elle est présente.
  player1El.classList.toggle("player--active");
  currentScore = 0;
};
const init = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  player1El.classList.remove("player--active");
  player0El.classList.add("player--active");
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};
//--------------------SELECTING ELEMENTS ------------------------
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const buttonNew = document.querySelector(".btn--new");
const buttonRoll = document.querySelector(".btn--roll");
const buttonHold = document.querySelector(".btn--hold");

//----------------------STARTING CONDITION------------------------
init();

//---------------ROLLING DICE FUNCTIONNALITY-----------------------

buttonRoll.addEventListener("click", function () {
  if (playing) {
    // 1. generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1 : if true,
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

buttonHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--active");
      diceEl.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

buttonNew.addEventListener("click", init);
