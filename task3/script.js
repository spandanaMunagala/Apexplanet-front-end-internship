/* QUIZ DATA */
const quizData = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    answer: "Mars"
  },
  {
    question: "What is the capital of Japan?",
    options: ["Seoul", "Tokyo", "Beijing", "Bangkok"],
    answer: "Tokyo"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["William Wordsworth", "William Shakespeare", "Charles Dickens", "Jane Austen"],
    answer: "William Shakespeare"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    answer: "Pacific"
  }
];

let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

/* LOAD QUESTION */
function loadQuestion() {
  const current = quizData[currentIndex];
  questionEl.textContent = current.question;
  optionsEl.innerHTML = "";

  current.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    optionsEl.appendChild(btn);
  });
}

/* CHECK ANSWER */
function loadQuestion() {
  const current = quizData[currentIndex];
  questionEl.textContent = current.question;
  optionsEl.innerHTML = "";

  current.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;

    btn.onclick = () => {
      const correct = current.answer;

      // Disable all buttons
      document.querySelectorAll(".options button").forEach(b => {
        b.disabled = true;
        if (b.textContent === correct) {
          b.style.background = "#4caf50"; // green
          b.style.color = "white";
        }
      });

      // Wrong selection highlight
      if (option !== correct) {
        btn.style.background = "#f44336"; // red
        btn.style.color = "white";
      } else {
        score++;
      }

      nextBtn.classList.remove("hidden");
    };

    optionsEl.appendChild(btn);
  });
}

/* NEXT */
nextBtn.onclick = () => {
  currentIndex++;
  if (currentIndex < quizData.length) {
    loadQuestion();
    nextBtn.classList.add("hidden");
  } else {
    showResult();
  }
};

/* RESULT */
function showResult() {
  questionEl.textContent = `🎉 You scored ${score} out of ${quizData.length}!`;
  optionsEl.innerHTML = "";
  nextBtn.classList.add("hidden");
  restartBtn.classList.remove("hidden");
}

/* RESTART */
restartBtn.onclick = () => {
  currentIndex = 0;
  score = 0;
  restartBtn.classList.add("hidden");
  loadQuestion();
};

/* JOKE API */
const jokeBtn = document.getElementById("jokeBtn");
const jokeEl = document.getElementById("joke");

jokeBtn.onclick = async () => {
  jokeEl.textContent = "Loading joke...";
  try {
    const res = await fetch("https://official-joke-api.appspot.com/random_joke");
    const data = await res.json();
    jokeEl.textContent = `${data.setup} 😂 ${data.punchline}`;
  } catch {
    jokeEl.textContent = "Failed to fetch joke. Try again!";
  }
};

/* INIT */
loadQuestion();
