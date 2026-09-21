const progressEl = document.getElementById('progress');
const scoreEl = document.getElementById('score');
const questionNumberEl = document.getElementById('question-number');
const domainEl = document.getElementById('question-domain');
const questionTextEl = document.getElementById('question-text');
const optionsForm = document.getElementById('options-form');
const feedbackEl = document.getElementById('feedback');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const selectionScreen = document.getElementById('selection-screen');
const statusSection = document.querySelector('.status');
const cardSection = document.getElementById('question-card');

let allQuestions = [];
let questions = [];
let currentIndex = 0;
let correctCount = 0;
let submitted = false;
let wrongAnswers = [];
let selectedQuestionCount = 0;

const isMulti = (question) => Array.isArray(question.answer);
const correctLetters = (question) => (isMulti(question) ? question.answer : [question.answer]);

const shuffle = (items) => {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const resetState = () => {
  currentIndex = 0;
  correctCount = 0;
  submitted = false;
  wrongAnswers = [];
  scoreEl.textContent = `Correct: ${correctCount}`;
};

const renderQuestion = () => {
  submitted = false;
  feedbackEl.textContent = '';
  feedbackEl.className = 'feedback';
  submitBtn.disabled = false;
  nextBtn.disabled = true;

  const question = questions[currentIndex];
  progressEl.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
  questionNumberEl.textContent = `Question ${question.number}`;
  domainEl.textContent = question.domain || '';
  questionTextEl.textContent = question.text;

  optionsForm.innerHTML = '';
  question.options.forEach((option) => {
    const optionId = `option-${question.number}-${option.letter}`;
    const wrapper = document.createElement('label');
    wrapper.className = 'option';
    wrapper.dataset.letter = option.letter;

    // Every question uses checkboxes, whether it has one correct answer or
    // several, so the input type itself never gives away how many to pick.
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.name = 'answer';
    input.value = option.letter;
    input.id = optionId;

    const text = document.createElement('span');
    text.textContent = `${option.letter}) ${option.text}`;

    wrapper.appendChild(input);
    wrapper.appendChild(text);
    optionsForm.appendChild(wrapper);
  });
};

const showSummary = () => {
  progressEl.textContent = `Finished: ${questions.length} questions`;
  questionNumberEl.textContent = 'Test complete';
  domainEl.textContent = '';
  questionTextEl.textContent = '';
  optionsForm.innerHTML = '';
  feedbackEl.className = 'feedback success summary';
  feedbackEl.innerHTML = `<p>Your score: ${correctCount} out of ${questions.length}.</p>`;

  if (wrongAnswers.length > 0) {
    const wrongCount = document.createElement('p');
    wrongCount.textContent = `Incorrectly answered questions: ${wrongAnswers.length}`;
    feedbackEl.appendChild(wrongCount);
  }

  submitBtn.disabled = true;
  nextBtn.disabled = true;

  // Add button to repeat test with wrong answers only
  if (wrongAnswers.length > 0) {
    const repeatWrongBtn = document.createElement('button');
    repeatWrongBtn.id = 'repeat-wrong-btn';
    repeatWrongBtn.textContent = 'Retry incorrect answers';
    repeatWrongBtn.className = 'secondary';
    repeatWrongBtn.style.marginTop = '16px';
    repeatWrongBtn.addEventListener('click', handleRepeatWrong);
    feedbackEl.appendChild(repeatWrongBtn);
  }
};

const describeOptions = (question, letters) =>
  letters
    .map((letter) => question.options.find((option) => option.letter === letter))
    .map((option) => `${option.letter}) ${option.text}`);

const setFeedback = ({ correct, question, correctSet, selectedSet }) => {
  feedbackEl.innerHTML = '';
  feedbackEl.className = `feedback ${correct ? 'success' : 'error'}`;

  const title = document.createElement('p');
  title.textContent = correct ? 'Correct!' : 'Incorrect.';
  feedbackEl.appendChild(title);

  if (!correct) {
    const correctLine = document.createElement('p');
    correctLine.textContent = `Correct answer: ${describeOptions(question, correctSet).join('; ')}`;
    feedbackEl.appendChild(correctLine);
  }

  const selectedLine = document.createElement('p');
  const selectedText = describeOptions(question, selectedSet);
  selectedLine.textContent = `Your answer: ${selectedText.length ? selectedText.join('; ') : '(none selected)'}`;
  feedbackEl.appendChild(selectedLine);
};

const sameSet = (a, b) => a.length === b.length && a.every((letter) => b.includes(letter));

const handleSubmit = () => {
  if (submitted) {
    return;
  }
  const selectedInputs = [...optionsForm.querySelectorAll('input[name="answer"]:checked')];
  if (selectedInputs.length === 0) {
    feedbackEl.className = 'feedback error';
    feedbackEl.textContent = 'Choose an answer before checking.';
    return;
  }

  submitted = true;
  const question = questions[currentIndex];
  const selectedSet = selectedInputs.map((input) => input.value);
  const correctSet = correctLetters(question);
  const correct = sameSet(selectedSet, correctSet);

  optionsForm.querySelectorAll('.option').forEach((optionEl) => {
    const letter = optionEl.dataset.letter;
    if (correctSet.includes(letter)) {
      optionEl.classList.add('correct');
    }
    if (selectedSet.includes(letter) && !correctSet.includes(letter)) {
      optionEl.classList.add('incorrect');
    }
  });
  optionsForm.querySelectorAll('input[name="answer"]').forEach((input) => {
    input.disabled = true;
  });

  if (correct) {
    correctCount += 1;
    scoreEl.textContent = `Correct: ${correctCount}`;
  } else {
    // Track wrong answers
    wrongAnswers.push(question);
  }

  setFeedback({ correct, question, correctSet, selectedSet });

  submitBtn.disabled = true;
  nextBtn.disabled = false;
};

const handleNext = () => {
  if (currentIndex + 1 >= questions.length) {
    showSummary();
    return;
  }
  currentIndex += 1;
  renderQuestion();
};

const handleRestart = () => {
  questions = shuffle(allQuestions).slice(0, selectedQuestionCount);
  resetState();
  renderQuestion();
};

const handleRepeatWrong = () => {
  questions = shuffle([...wrongAnswers]);
  resetState();
  renderQuestion();
};

const startTest = (questionCount) => {
  selectionScreen.style.display = 'none';
  statusSection.style.display = 'flex';
  cardSection.style.display = 'block';

  selectedQuestionCount = questionCount;
  questions = shuffle(allQuestions).slice(0, questionCount);
  resetState();
  renderQuestion();
};

submitBtn.addEventListener('click', handleSubmit);
nextBtn.addEventListener('click', handleNext);
restartBtn.addEventListener('click', handleRestart);

fetch('questions.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to load questions.');
    }
    return response.json();
  })
  .then((data) => {
    allQuestions = data;
    // Add event listeners for selection buttons after questions are loaded
    document.querySelectorAll('.selection-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const count = parseInt(btn.dataset.count, 10);
        startTest(count);
      });
    });
  })
  .catch((error) => {
    console.error(error);
    const errorMsg = document.createElement('p');
    errorMsg.className = 'feedback error';
    errorMsg.textContent = 'Failed to load the question list. Check questions.json.';
    selectionScreen.appendChild(errorMsg);
  });
