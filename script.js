const quizQuestions = [
    {
        question: 'What is the capital of France?',
        options: ['Paris', 'Berlin', 'London'],
        correctAnswer: 'Paris'
    },
    {
        question: 'What is 2 + 2?',
        options: ['3', '4', '5'],
        correctAnswer: '4'
    },
    {
        question: 'Today it is Thursday.After 132 days,it will be?',
        options: ['Monday', 'Sunday', 'Wednesday'],
        correctAnswer:'Wednesday'
    },   
    {
        question: 'Find the H.C.F, if the numbers are in the ratio of 4 : 5 : 6 and their L.C.M. is 2400.',
        options: ['35' ,'20' ,'40'],
        correctAnswer: '20'
    },
    {
        question: 'What is 9 + 45 ?',
        options: ['54' ,'55' ,'56'],
        checkAnswer: '54' 
    },
     // Add more questions here...
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
const questionContainer = document.getElementById('question-container');

const timerContainer = document.getElementById('timer-container');
const timerElement = document.getElementById('timer');

const resultContainer = document.getElementById('result-container');
const submitBtn = document.getElementById('submit-btn');

let currentQuestionIndex = 0;
let score = 0;

const timerDuration = 20; // Time limit for each question in seconds
let currentTimer = timerDuration;
let timerInterval;

function startTimer() {
    timerElement.textContent = currentTimer;

    timerInterval = setInterval(() => {
        currentTimer--;
        timerElement.textContent = currentTimer;

        if (currentTimer === 0) {
            clearInterval(timerInterval);
            checkAnswer();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function showQuestion() {
    stopTimer();
    currentTimer = timerDuration;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <p class="question">${currentQuestion.question}</p>
        ${currentQuestion.options.map(option => `
            <label>
                <input type="radio" name="answer" value="${option}">
                ${option}
            </label>
        `).join('')}
    `;

    startTimer();
}



function showResult() {
resultContainer.style.display = 'block';
resultContainer.innerHTML = `You scored ${score} out of ${quizQuestions.length}! Great job!`;
submitBtn.classList.add('hide');
restartBtn.classList.remove('hide');
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert('Please select an answer before submitting.');
        return;
    }

    const userAnswer = selectedOption.value;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (userAnswer === currentQuestion.correctAnswer) {
        score++;
    }

    stopTimer(); // Stop the timer when an answer is submitted


    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    resultContainer.style.display = 'none';
}




function restartQuiz() {
currentQuestionIndex = 0;
score = 0;
showQuestion();
resultContainer.style.display = 'none';
submitBtn.classList.remove('hide');
restartBtn.classList.add('hide');
}

const restartBtn = document.getElementById('restart-btn');
restartBtn.addEventListener('click', restartQuiz);

shuffleArray(quizQuestions);

submitBtn.addEventListener('click', checkAnswer);

// Load the first question when the page loads
window.addEventListener('load', () => {
    showQuestion();
    
});