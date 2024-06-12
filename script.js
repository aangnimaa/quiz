document.addEventListener('DOMContentLoaded', () => {
    const initialScreen = document.getElementById('initial-screen');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const quizContainer = document.getElementById('quiz-container');
    const submitBtn = document.getElementById('submit-btn');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const scoreDisplay = document.getElementById('score-display');
    const timerDisplay = document.getElementById('timer-display');
    const summaryContainer = document.getElementById('summary-container');
    const summaryText = document.getElementById('summary-text');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');

    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 30;

    const questions = [
        {
            question: "What is HTML?",
            options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "None of the above"],
            answer: 0
        },
        {
            question: "What is CSS used for?",
            options: ["Adding content to the webpage", "Styling the appearance of the webpage", "Defining the structure of the webpage", "None of the above"],
            answer: 1
        },
        {
            question: "Which symbol is used to denote IDs in CSS?",
            options: ["#", ".", "&", "@"],
            answer: 0
        },
        {
            question: "What is JavaScript primarily used for in web development?",
            options: ["Styling the webpage", "Adding interactivity to the webpage", "Defining the structure of the webpage", "None of the above"],
            answer: 1
        },
        {
            question: "What does CSS stand for?",
            options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
            answer: 0
        },
        {
            question: "What function is used to print content to the console in JavaScript?",
            options: ["print()", "console.log()", "log()", "write()"],
            answer: 1
        },
        {
            question: "What does the '=== operator' do in JavaScript?",
            options: ["Compares values", "Assigns values", "Compares both value and type", "None of the above"],
            answer: 2
        }
    ];

    startQuizBtn.addEventListener('click', startQuiz);
    submitBtn.addEventListener('click', submitAnswer);
    restartQuizBtn.addEventListener('click', restartQuiz);

    function startQuiz() {
        initialScreen.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        displayQuestion();
        startTimer();
    }

    function displayQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        optionsContainer.innerHTML = '';
        currentQuestion.options.forEach((option, index) => {
            const optionLabel = document.createElement('label');
            optionLabel.innerHTML = `<input type="radio" name="option" value="${index}"> ${option}`;
            optionsContainer.appendChild(optionLabel);
        });
    }

    function submitAnswer() {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (!selectedOption) {
            alert("Please select an answer!");
            return;
        }

        const answer = parseInt(selectedOption.value);
        if (answer === questions[currentQuestionIndex].answer) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        }

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
            resetTimer();
        } else {
            endQuiz();
        }
    }

    function startTimer() {
        timer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timer);
                submitAnswer();
            } else {
                timeLeft--;
                timerDisplay.textContent = `Time: ${timeLeft}`;
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timer);
        timeLeft = 30;
        timerDisplay.textContent = `Time: ${timeLeft}`;
        startTimer();
    }

    function endQuiz() {
        clearInterval(timer);
        quizContainer.classList.add('hidden');
        summaryContainer.classList.remove('hidden');
        summaryText.textContent = `Quiz completed! Your final score is: ${score} out of ${questions.length}`;
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        timeLeft = 30;
        scoreDisplay.textContent = `Score: ${score}`;
        summaryContainer.classList.add('hidden');
        initialScreen.classList.remove('hidden');
    }
});