// Quiz questions stored in an array of objects
const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Tech Modern Language", correct: false },
            { text: "Hyperlink Text Management Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },

    {
        question: "Which language is used for styling webpages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "Python", correct: false },
            { text: "CSS", correct: true },
            { text: "Java", correct: false }
        ]
    },

    {
        question: "Which keyword declares a variable in JavaScript?",
        answers: [
            { text: "style", correct: false },
            { text: "let", correct: true },
            { text: "design", correct: false },
            { text: "loop", correct: false }
        ]
    }
];

// Selecting HTML elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreText = document.getElementById("score-text");
const restartButton = document.getElementById("restart-btn");
const quizBox = document.getElementById("quiz-box");

// Variables
let currentQuestionIndex = 0;
let score = 0;

// Start quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");

    showQuestion();
}

// Display question
function showQuestion() {

    resetState();

    let currentQuestion = questions[currentQuestionIndex];

    questionElement.innerText = currentQuestion.question;

    // Loop through answers
    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");

        button.innerText = answer.text;

        button.classList.add("btn");

        answerButtons.appendChild(button);

        // Store correct answer in dataset
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        // Event listener
        button.addEventListener("click", selectAnswer);
    });
}

// Clear old answers
function resetState() {

    nextButton.style.display = "none";

    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Answer selection
function selectAnswer(e){

    const selectedBtn = e.target;

    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
    }

    // Show correct answer
    Array.from(answerButtons.children).forEach(button => {

        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    nextButton.style.display = "block";
}

// Next question
function handleNextButton(){

    currentQuestionIndex++;

    if(currentQuestionIndex < questions.length){

        showQuestion();

    } else {

        showScore();
    }
}

// Show final score
function showScore(){

    quizBox.classList.add("hide");

    resultBox.classList.remove("hide");

    scoreText.innerText = 
    `You scored ${score} out of ${questions.length}!` ;
}

// Next button event
nextButton.addEventListener("click", handleNextButton);

// Restart quiz
restartButton.addEventListener("click", startQuiz);

// Initialize quiz
startQuiz();