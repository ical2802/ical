const questions = [
    {
      question: "siapa kahim kalian?",
      answers: [
        { text: "dado", correct: true },
        { text: "deni", correct: false },
        { text: "fadhil", correct: false },
        { text: "bener semua", correct: false }
      ]
    },
    {
      question: "Berapa Jumlah Kalian?",
      answers: [
        { text: "1", correct: true },
        { text: "2", correct: false },
        { text: "3", correct: false },
        { text: "10", correct: false },
      ]
    },
    {
      question: "Apa warna yang membalut kehormatan kalian?",
      answers: [
        { text: "Hitam", correct: true },
        { text: "Biru", correct: false },
        { text: "Oren", correct: false },
        { text: "Pink", correct: false },
      ]
    },
    {
        question: "Siapa Kita?",
      answers: [
        { text: "Mesin", correct: true },
        { text: "Elektro", correct: false },
        { text: "Informatika", correct: false },
        { text: "Industri", correct: false },
      ]
    },
    {
        question: "Informatika?",
      answers: [
        { text: "Biru-Biru Tiga", correct: true },
        { text: "Biru-Biru Empat", correct: false },
        { text: "Biru-Biru Dua", correct: false },
        { text: "Biru-Biru Satu", correct: false },
      ]
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  const questionContainer = document.getElementById("question-container");
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-button");
  const resultContainer = document.getElementById("result");
  const scoreElement = document.getElementById("score");
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 4;
    questionContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      answerButtonsElement.appendChild(button);
    });
  }
  
  function resetState() {
    nextButton.classList.add("hidden");
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) score++;
    setStatusClass(selectedButton, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct === "true");
      button.disabled = true;
    });
    nextButton.classList.remove("hidden");
  }
  
  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add("correct");
    } else {
      element.classList.add("wrong");
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
  }
  
  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });
  
  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreElement.innerText = `${score} / ${questions.length}`;
  }
  
  function restartQuiz() {
    startQuiz();
  }
  
  startQuiz();
  