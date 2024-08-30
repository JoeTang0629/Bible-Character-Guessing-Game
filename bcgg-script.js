// Sample database of Bible characters and clues
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
    }
];

let currentCharacterIndex = 0;
let currentClueIndex = 0;
let score = 0;

document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('submit-guess').addEventListener('click', submitGuess);
document.getElementById('next-clue').addEventListener('click', showNextClue);
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
    document.getElementById('next-clue').classList.add('hidden');
}

function showClue() {
    const clue = characters[currentCharacterIndex].clues[currentClueIndex];
    document.getElementById('clue').textContent = clue;
}

function submitGuess() {
    const guess = document.getElementById('guess').value.trim().toLowerCase();
    const correctAnswer = characters[currentCharacterIndex].name.toLowerCase();

    if (guess === correctAnswer) {
        score++;
        document.getElementById('feedback').textContent = 'Correct!';
        document.getElementById('next-clue').classList.remove('hidden');
    } else {
        document.getElementById('feedback').textContent = 'Incorrect. Try again.';
    }
    document.getElementById('guess').value = '';
}

function showNextClue() {
    currentClueIndex++;

    if (currentClueIndex < characters[currentCharacterIndex].clues.length) {
        showClue();
        document.getElementById('feedback').textContent = '';
        document.getElementById('next-clue').classList.add('hidden');
    } else {
        currentCharacterIndex++;
        currentClueIndex = 0;

        if (currentCharacterIndex < characters.length) {
            showClue();
            document.getElementById('feedback').textContent = '';
            document.getElementById('next-clue').classList.add('hidden');
        } else {
            endGame();
        }
    }
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