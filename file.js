

const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const scoreContainer = document.getElementById('score-container');

let currentQuestionIndex = 0;
let questions = [];
let score = 0;

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    setNextQuestion();
  } else {
    showScore();
  }
});

function startGame() {
  questions = fetchQuestionsFromAPI(); // You can fetch questions from an API here
  score = 0;
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionContainer.innerText = question.question;
  question.options.forEach(option => {
    const button = document.createElement('button');
    button.innerText = option.text;
    button.classList.add('btn');
    button.dataset.correct = option.correct;
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  if (correct) {
    score++;
  }
  setStatusClass(selectedButton, correct);
  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true; // Disable buttons after answer
    setStatusClass(button, button.dataset.correct === "true");
  });
  nextButton.classList.remove('hide');
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else if (!element.classList.contains('selected')) { // Only add default class if not selected
    element.classList.add('default');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
  element.classList.remove('default'); // Remove default class as well
  element.classList.remove('selected'); // Added to remove selection indication
}

function showScore() {
  questionContainer.innerText = `Quiz Completed! Your Score: ${score}/${questions.length}`;
  scoreContainer.innerText = ''; // Clear score container
}

// Function to fetch questions from API (dummy implementation)
function fetchQuestionsFromAPI() {
  return [
    {
      question: "What animal is the symbol of china?",
      options: [
        { text: "Panda", correct: true },
        { text: "Elephant", correct: false },
        { text: "Tiger", correct: false },
        { text: "Leo", correct: false }
      ]
    },
    {
      question: "Which of the following inventions is attributed to Thomas Edison?",
      options: [
        { text: "Telephone", correct: false },
        { text: "computer", correct: false },
        { text: "Bulb", correct: true },
        { text: "Rocket", correct: false }
      ]
    },
    {
      question: "What is the largest planet in the solar system?",
      options: [
        { text: "Mars", correct: false },
        { text: "Jupiter", correct: true },
        { text: "Earth", correct: false },
        { text: "Venus", correct: false }
      ]
    },
    {
      question: "What is the smallest prime number?",
      options: [
        { text: "1", correct: false },
        { text: "0", correct: false },
        { text: "2", correct: true },
        { text: "3", correct: false }
      ]
    }
    // Add more questions here
  ];
}

startGame();
