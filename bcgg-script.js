/// Sample database of Bible characters and clues
const characters = [
    {
        name: "Moses",
        clues: [
            "This person led the Israelites out of Egypt.",
            "He received the Ten Commandments on Mount Sinai.",
            "He parted the Red Sea."
        ]
    },
    {
        name: "David",
        clues: [
            "This person was a shepherd boy who became king.",
            "He defeated Goliath with a sling and a stone.",
            "He wrote many of the Psalms."
        ]
    },
    {
        name: "Esther",
        clues: [
            "This queen saved her people by risking her life before the king.",
            "She was a Jewish queen in the Persian Empire.",
            "Her story is celebrated during the festival of Purim."
        ]
    },
    {
        name: "Abraham",
        clues: [
            "This person was called by God to leave his homeland.",
            "He is considered the father of many nations.",
            "He was willing to sacrifice his son Isaac."
        ]
    }
];

let currentCharacterIndex = 0;
let currentClueIndex = 0;
let score = 0;

document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('restart-game').addEventListener('click', restartGame);

function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    resetGame();
    showClue();
}

function resetGame() {
    currentCharacterIndex = 0;
    currentClueIndex = 0;
    score = 0;
    document.getElementById('feedback').textContent = '';
    clearChoices();
}

function showClue() {
    const clue = characters[currentCharacterIndex].clues[currentClueIndex];
    document.getElementById('clue').textContent = clue;
    showChoices();
}

function showChoices() {
    const correctAnswer = characters[currentCharacterIndex].name;
    const allAnswers = getRandomChoices(correctAnswer);
    const choicesContainer = document.getElementById('choices');
    
    clearChoices();

    allAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('choice-btn');
        button.addEventListener('click', () => submitGuess(answer));
        choicesContainer.appendChild(button);
    });
}

function getRandomChoices(correctAnswer) {
    const answers = characters.map(character => character.name);
    const randomChoices = [correctAnswer];
    
    while (randomChoices.length < 4) {
        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
        if (!randomChoices.includes(randomAnswer)) {
            randomChoices.push(randomAnswer);
        }
    }

    // Shuffle the array to randomize the choices
    return randomChoices.sort(() => Math.random() - 0.5);
}

function submitGuess(selectedAnswer) {
    const correctAnswer = characters[currentCharacterIndex].name;

    if (selectedAnswer === correctAnswer) {
        score++;
        document.getElementById('feedback').textContent = 'Correct!';
    } else {
        document.getElementById('feedback').textContent = `Incorrect! The correct answer was ${correctAnswer}.`;
    }

    // Move to the next clue or character
    currentClueIndex++;

    setTimeout(() => {
        if (currentClueIndex < characters[currentCharacterIndex].clues.length) {
            showClue();
        } else {
            currentCharacterIndex++;
            currentClueIndex = 0;
            if (currentCharacterIndex < characters.length) {
                showClue();
            } else {
                endGame();
            }
        }
    }, 1000);
}

function clearChoices() {
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';
}

function endGame() {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('end-screen').classList.remove('hidden');
    document.getElementById('final-score').textContent = `Your score: ${score}`;
}

function restartGame() {
    document.getElementById('end-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
}