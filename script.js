'use strict';

// SELECTING ELEMENTS
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

// scores
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
// current score
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
// dice images
const diceElement = document.querySelector('.dice');
// New game, roll and hold buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing; //declaring the empty variable outside the function due to scoping. Varibale live outside init function but are re-assigned values inside the init function. Declaring variable is not the same as asigning them a value

const init = function () {
  // STARTING CONDITIONS
  // Setting the scores equal to 0 at the begin
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  // hiding the dice before game start - create hidden class in css and add it to dice element
  diceElement.classList.add('hidden');

  currentScore = 0; // outside the event handler cz otherwise the current score will be set to 0 each time the dice is rolled

  activePlayer = 0; // Need to identify who's turn it is. Starting w/ 1st player therefore initialize at 0. Player number 1 is 0 and player number 2 is 1

  // Scores of both players will be stored in an array
  scores = [0, 0]; //the total scores that continue accumulating as the player collects dice rolls. Arrays are 0 based therefore score of player 1 will be at position 0. That is why activePlayer is also set to 0 and 1

  // Creating a game state variable. Helps determine if user is still playing or not. Tells developer the condition of the system
  playing = true;

  // 1. Reset the styling
  // Remove winner style
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');

  // 2. Reset all visible conditions
  current1Element.textContent = 0;
  current0Element.textContent = 0;
};

init();

// SWITCH PLAYER FUNCTION - used multiple times
const switchPlayer = function () {
  // No parameters cz nothing needs to change in the code for any situation
  //  1. Current score is lost/set to 0 for the active player before the switch
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  // 2. Switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0; // checking if current player is player 1, if so, switch to player 2. Else it is player 2 who is active, then switch to player 1
  currentScore = 0;

  // 3. Switch the background effects. In HTML, styling applied to active player is found in player--active class
  player0Element.classList.toggle('player--active'); //toggle adds the class if it isnt present or removes it if it is. Toggle is another classList method like add/remove etc
  player1Element.classList.toggle('player--active'); //class is only applied to one at a time. toggling both ensures that both change at the same time
};

// REACT TO PRESSING THE ROLL DICE BUTTON
btnRoll.addEventListener('click', function () {
  // You can only click the button if the game is playing
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display the dice roll
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;
    // 3. Check if rolled 1; if true, switch to next player
    if (dice !== 1) {
      // Add dice roll to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore; //Sets currentScore to whover is the active player. Score element selected dynamically based on who is active player

      /*current0Element.textContent = currentScore;*/ //This line will always set the current score for player 0
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add currentScore to active players global score
    scores[activePlayer] += currentScore; //adds the currentScore of the active player to the stored global score of that player. Eg. scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if score >=100
    if (scores[activePlayer] >= 100) {
      // If there is a winner, you want to assign the player winner class to the current active player
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // NB remember to use a dot when using querySelector and no dot in getElementById
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      // Remove the dice from view
      diceElement.classList.add('hidden');
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// //////////////////////////////////////////////////////////
// CODING CHALLENGE - Reset button

// styling reset and ready for input for player 1
// reset all initial conditions
// both global scores need to be set back to 0
// array values need to be 0
// current scores reset back to 0

btnNew.addEventListener('click', init);
