let humanScore = 0;
let computerScore = 0;
let roundScore = 0;
let gameActive = true;

document.querySelectorAll('.choice').forEach(button => {
    button.addEventListener('click', (event) => {
        if (!gameActive) return;
        const choice = event.currentTarget.getAttribute('data-choice');
        saveHumanChoice(choice);
    });
});

function saveHumanChoice(choice) {
    const humanChoice = getChoiceNumber(choice);
    console.log(`You picked ${choice}`);
    const humanChoiceElement = document.getElementById('human-choice');

    showChoiceImage('player', choice);

    const computerSelection = getComputerChoice();
    showChoiceImage('robot', computerSelection);
    playRound(humanChoice, getChoiceNumber(computerSelection));
}

function getComputerChoice() {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    let result = getRandomInt(3);

    const computerChoiceElement = document.getElementById('computer-choice');
    let computerChoice;
    if (result === 0) {
        computerChoice = 'rock';
    } else if (result === 1) {
        computerChoice = 'paper';
    } else {
        computerChoice = 'scissors';
    }

    return computerChoice; // Return the computer's choice as a string
}

function getChoiceNumber(choice) {
    if (choice === "rock") {
        return 0;
    } else if (choice === "paper") {
        return 1;
    } else if (choice === "scissors") {
        return 2;
    } else {
        console.log("Invalid choice");
        return null;
    }
}

function showChoiceImage(type, choice) {
    if (type === 'player') {
        const playerChoiceRock = document.getElementById('player-choice-rock');
        const playerChoiceScissors = document.getElementById('player-choice-scissors');
        const playerChoicePaper = document.getElementById('player-choice-paper');

        playerChoiceRock.classList.remove('visible');
        playerChoiceScissors.classList.remove('visible');
        playerChoicePaper.classList.remove('visible');

        if (choice === 'rock') {
            playerChoiceRock.classList.add('visible');
        } else if (choice === 'scissors') {
            playerChoiceScissors.classList.add('visible');
        } else if (choice === 'paper') {
            playerChoicePaper.classList.add('visible');
        }
    } else if (type === 'robot') {
        const robotChoiceRock = document.getElementById('robot-choice-rock');
        const robotChoiceScissors = document.getElementById('robot-choice-scissors');
        const robotChoicePaper = document.getElementById('robot-choice-paper');

        robotChoiceRock.classList.remove('visible');
        robotChoiceScissors.classList.remove('visible');
        robotChoicePaper.classList.remove('visible');

        if (choice === 'rock') {
            robotChoiceRock.classList.add('visible');
        } else if (choice === 'scissors') {
            robotChoiceScissors.classList.add('visible');
        } else if (choice === 'paper') {
            robotChoicePaper.classList.add('visible');
        }
    }
}

function updateScoreBoard(){
    const roundElement = document.getElementsByClassName('round-score')[0];
    roundElement.textContent = roundScore;
    const humanScoreElement = document.getElementsByClassName('player-score')[0];
    humanScoreElement.textContent = humanScore;
    const robotScoreElement = document.getElementsByClassName('robot-score')[0];
    robotScoreElement.textContent = computerScore;
}

function playRound(humanChoice, computerChoice){
    const resultMessageElement = document.getElementById('result-message');
    if (humanChoice === null) {
        resultMessageElement.textContent = 'Invalid choice, round not played.';
        return;
    }

    if (humanChoice === 1 && computerChoice === 0) {
        humanScore += 1;
        resultMessageElement.textContent = 'Paper envelopes rock, you win one point';
    } else if (humanChoice === 2 && computerChoice === 1){
        humanScore += 1;
        resultMessageElement.textContent = 'Scissors cut paper, you win one point';
    } else if (humanChoice === 0 && computerChoice === 2) {
        humanScore += 1;
        resultMessageElement.textContent = 'Rock smashes scissors, you win one point';
    } else if (humanChoice === computerChoice){
        resultMessageElement.textContent = 'It\'s a tie!!!';
    } else {
        computerScore += 1;
        resultMessageElement.textContent = `The computer has bested you and won a point`;
    }
    roundScore += 1;

    updateScoreBoard();

    // Check for game end
    if (humanScore === 5) {
        resultMessageElement.textContent = 'Congratulations, you have bested the robot! - Refresh to Play Again';
        gameActive = false;
    } else if (computerScore === 5) {
        resultMessageElement.textContent = 'The machine has won. Better luck next time - Refresh to Play Again!';
        gameActive = false;
    }
}

function playGame() {
    humanScore = 0;
    computerScore = 0;
    roundScore = 0;
    gameActive = true;
    updateScoreBoard();
}

playGame();