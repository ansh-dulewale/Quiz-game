let C = document.getElementById("checkbox");
let s = document.getElementById("submit");
s.disabled = true;

C.addEventListener("click", function allow() {
  if (C.checked) {
    s.disabled = false;
  } else {
    s.disabled = true;
  }
});

let quiz = [];

function fetchQuizData() {
  var url =
    "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple&encode=url3986";
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      quiz = data.results;
    })
    .catch(function (err) {
      console.error("Error with fetch:", err);
    });
}

let currentQuestionIndex = 0;

function displayQuiz() {
  const q = document.querySelector("#question");
  const options = document.querySelectorAll('input[type="radio"]');
  const labels = document.querySelectorAll("span");
  q.innerText = decodeURIComponent(quiz[currentQuestionIndex].question);
  let allOptions = [
    ...quiz[currentQuestionIndex].incorrect_answers,
    quiz[currentQuestionIndex].correct_answer,
  ];
  allOptions = allOptions.sort(() => Math.random() - 0.5);
  allOptions.forEach((option, index) => {
    labels[index].innerText = decodeURIComponent(option);
    options[index].style.display = "inline";
  });
}

s.addEventListener("click", function startQuiz() {
  if (C.checked) {
    fetchQuizData();
    document.getElementById("showquiz").style.display = "block";
    displayQuiz();
  }
});

let score = 0;

function checkAnswer() {
  const options = document.querySelectorAll('input[type="radio"]');
  const labels = document.querySelectorAll("span");
  options.forEach((option, index) => {
    if (
      option.checked &&
      labels[index].innerText === quiz[currentQuestionIndex].correct_answer
    ) {
      score++;
    }
  });
}

const next = document.getElementById("Next");
next.addEventListener("click", function nextQuiz() {
  checkAnswer();
  const options = document.querySelectorAll('input[type="radio"]');
  options.forEach((option) => {
    option.checked = false;
  });
  if (currentQuestionIndex < quiz.length - 1) {
    currentQuestionIndex++;
    displayQuiz();
  } else {
    let resultScore = document.getElementById("result");
    resultScore.innerHTML = "Quiz is finished and your score is " + score;
  }
});
s.addEventListener("click", function startQuiz() {
  if (C.checked) {
    fetchQuizData();
    document.getElementById("information").style.display = "none";
    document.getElementById("showquiz").style.display = "block";
    displayQuiz();
  }
});
var firebaseConfig = {
  apiKey: "Use Your Api Key Here",
  authDomain: "Use Your authDomain Here",
  databaseURL: "https://system-lab-p8-default-rtdb.firebaseio.com/",
  projectId: "Use Your projectId Here",
  storageBucket: "gs://system-lab-p8.appspot.com",
  messagingSenderId: "Use Your messagingSenderId Here",
  appId: "Use Your appId Here",
};

firebase.initializeApp(firebaseConfig);

var messagesRef = firebase.database().ref("Collected Data");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  // Get values
  var name = getInputVal("name");
  var email = getInputVal("email");

  saveMessage(name, email);
  document.getElementById("contactForm").reset();
}

// Function to get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email) {
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    email: email,
  });
}
