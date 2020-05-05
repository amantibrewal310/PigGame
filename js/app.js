/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
- Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100.

*/
/*
TODO:

- Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
var scores, roundScore, activePlayer, gamePlaying, prevDiceNum = 0, lastActivePlayer;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    // 1. Random number
    if(gamePlaying) {

        var dice = Math.floor(Math.random() * 6) + 1;
        

        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = './img/dice-' + dice + '.png';


        // 3. Update the round score IF the rolled number was NOT 1
        if (prevDiceNum == 6 && dice == 6 && lastActivePlayer == activePlayer) {
            roundScore = 0;
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        }

        else if (dice !== 1) {
            // Add Score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            // Next player
            nextPlayer();

        }
        prevDiceNum = dice;
        lastActivePlayer = activePlayer;
    }
   
    
});

document.querySelector('.btn-hold').addEventListener('click', function() {  
    if(gamePlaying) {
        scores[activePlayer] += roundScore;

        roundScore = 0;
        // console.log(scores[activePlayer]);
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        var finalScore = document.querySelector('.final-score').value;
        // console.log(finalScore);
        if(!finalScore) {
            finalScore = 100;
        }

        if (scores[activePlayer] >= finalScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;

        }
        else {
            nextPlayer();
        }
    }
    
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    lastActivePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = scores[0];
    document.getElementById('score-1').textContent = scores[0];
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
function nextPlayer() {
    var diceDOM = document.querySelector('.dice');

    roundScore = 0;

    document.querySelector('#current-' + activePlayer).textContent = roundScore;


    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;


    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');

    diceDOM.style.display = 'none';
}
