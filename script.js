const memoryBoard = document.getElementById('memory-board');
const memoryCards = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'
];

let flippedCards = [];
let matchedCards = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createMemoryGameBoard() {
    shuffleArray(memoryCards).forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.textContent = value;
        card.addEventListener('click', flipCard);
        memoryBoard.appendChild(card);
    });
}

function flipCard(event) {
    const card = event.target;
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    if (flippedCards[0].textContent === flippedCards[1].textContent) {
        matchedCards.push(...flippedCards);
        flippedCards = [];
        if (matchedCards.length === memoryCards.length) {
            setTimeout(() => alert('Você venceu!'), 500);
        }
    } else {
        setTimeout(() => {
            flippedCards.forEach(card => card.classList.remove('flipped'));
            flippedCards = [];
        }, 1000);
    }
}

createMemoryGameBoard();

const ticTacToeBoard = document.getElementById('tic-tac-toe-board');
const ticTacToeResult = document.getElementById('tic-tac-toe-result');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameMode = 'player'; // Modos: 'player' ou 'robot'

function createTicTacToeBoard() {
    ticTacToeBoard.innerHTML = '';
    board.forEach((cell, index) => {
        const button = document.createElement('button');
        button.textContent = cell;
        button.classList.add('tic-tac-toe-cell');
        button.addEventListener('click', () => makeMove(index));
        ticTacToeBoard.appendChild(button);
    });
}

function makeMove(index) {
    if (board[index] === '' && !isGameOver()) {
        board[index] = currentPlayer;
        createTicTacToeBoard();
        if (checkWinner()) {
            ticTacToeResult.textContent = `${currentPlayer} venceu!`;
        } else if (isBoardFull()) {
            ticTacToeResult.textContent = 'Empate!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (gameMode === 'robot' && currentPlayer === 'O') {
                setTimeout(() => robotMove(), 500); // Simula movimento do robô
            }
        }
    }
}

function robotMove() {
    const emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomMove] = 'O';
    createTicTacToeBoard();
    if (checkWinner()) {
        ticTacToeResult.textContent = 'O Robô venceu!';
    } else if (isBoardFull()) {
        ticTacToeResult.textContent = 'Empate!';
    } else {
        currentPlayer = 'X';
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function isBoardFull() {
    return board.every(cell => cell !== '');
}

function isGameOver() {
    return checkWinner() || isBoardFull();
}

document.getElementById('restart-tic-tac-toe').addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    ticTacToeResult.textContent = '';
    createTicTacToeBoard();
});

document.getElementById('play-vs-robot').addEventListener('click', () => {
    gameMode = 'robot';
    ticTacToeResult.textContent = 'Jogo contra o Robô';
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    createTicTacToeBoard();
});

document.getElementById('play-vs-player').addEventListener('click', () => {
    gameMode = 'player';
    ticTacToeResult.textContent = 'Jogo contra Jogador';
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    createTicTacToeBoard();
});

createTicTacToeBoard();

const quizQuestions = [
    { question: "Qual é o nome do criador do projeto?", answers: ['João', 'Maria', 'Carlos', 'Ana'], correctAnswer: 'João' },
    { question: "Qual a principal linguagem utilizada?", answers: ['JavaScript', 'Python', 'Java', 'Ruby'], correctAnswer: 'JavaScript' },
    { question: "Qual é o objetivo do projeto?", answers: ['Divertir', 'Educar', 'Ajudar', 'Todos os anteriores'], correctAnswer: 'Todos os anteriores' }
];

const quizContainer = document.getElementById('quiz-questions');
let quizAnswers = [];

quizQuestions.forEach((q, index) => {
    const questionElem = document.createElement('div');
    questionElem.innerHTML = `<p>${q.question}</p>`;
    q.answers.forEach(answer => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="question${index}" value="${answer}"> ${answer}`;
        questionElem.appendChild(label);
    });
    quizContainer.appendChild(questionElem);
});

document.getElementById('submit-quiz').addEventListener('click', () => {
    let score = 0;
    quizQuestions.forEach((q, index) => {
        const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === q.correctAnswer) {
            score++;
        }
    });
    document.getElementById('quiz-result').textContent = `Você acertou ${score} de ${quizQuestions.length}`;
});

document.getElementById('restart-quiz').addEventListener('click', () => {
    quizContainer.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false);
    document.getElementById('quiz-result').textContent = '';
});

const timedQuizQuestions = [
    { question: "Qual é a capital do Brasil?", answers: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador'], correctAnswer: 'Brasília' },
    { question: "Qual é a maior montanha do mundo?", answers: ['Monte Everest', 'K2', 'Makalu', 'Kangchenjunga'], correctAnswer: 'Monte Everest' },
    { question: "Quem foi o primeiro homem a pisar na Lua?", answers: ['Buzz Aldrin', 'Neil Armstrong', 'Yuri Gagarin', 'John Glenn'], correctAnswer: 'Neil Armstrong' }
];

let timer = 30;
let timedQuizInterval;

const timedQuizContainer = document.getElementById('timed-quiz-questions');
timedQuizQuestions.forEach((q, index) => {
    const questionElem = document.createElement('div');
    questionElem.innerHTML = `<p>${q.question}</p>`;
    q.answers.forEach(answer => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="timed-question${index}" value="${answer}"> ${answer}`;
        questionElem.appendChild(label);
    });
    timedQuizContainer.appendChild(questionElem);
});

function startTimer() {
    timedQuizInterval = setInterval(() => {
        if (timer > 0) {
            timer--;
            document.getElementById('timer').textContent = `Tempo restante: ${timer}s`;
        } else {
            clearInterval(timedQuizInterval);
            document.getElementById('timed-quiz-result').textContent = 'Tempo esgotado!';
        }
    }, 1000);
}

document.getElementById('submit-timed-quiz').addEventListener('click', () => {
    clearInterval(timedQuizInterval);
    let score = 0;
    timedQuizQuestions.forEach((q, index) => {
        const selectedAnswer = document.querySelector(`input[name="timed-question${index}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === q.correctAnswer) {
            score++;
        }
    });
    document.getElementById('timed-quiz-result').textContent = `Você acertou ${score} de ${timedQuizQuestions.length}`;
});

document.getElementById('restart-timed-quiz').addEventListener('click', () => {
    timer = 30;
    clearInterval(timedQuizInterval);
    timedQuizContainer.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false);
    document.getElementById('timed-quiz-result').textContent = '';
    document.getElementById('timer').textContent = `Tempo restante: ${timer}s`;
    startTimer();
});

startTimer();