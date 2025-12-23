/* QUIZ DATA (Rare & Professional Questions) */
const quizData = [
  {
    question: "Which country was the first to use paper currency?",
    options: ["India", "China", "Japan", "Egypt"],
    answer: "China"
  },
  {
    question: "What does HTTP stand for?",
    options: [
      "HyperText Transfer Protocol",
      "High Transfer Text Process",
      "Hyper Transfer Text Program",
      "Host Text Transfer Path"
    ],
    answer: "HyperText Transfer Protocol"
  },
  {
    question: "Which element has the chemical symbol 'Au'?",
    options: ["Silver", "Oxygen", "Gold", "Argon"],
    answer: "Gold"
  },
  {
    question: "Which year was JavaScript first released?",
    options: ["1990", "1995", "2000", "2005"],
    answer: "1995"
  },
  {
    question: "Which ocean is the deepest in the world?",
    options: ["Indian", "Atlantic", "Pacific", "Arctic"],
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

    btn.onclick = () => {
      // Disable all buttons
      document.querySelectorAll(".options button").forEach(b => {
        b.disabled = true;
        if (b.textContent === current.answer) {
          b.style.background = "#4caf50";
          b.style.color = "white";
        }
      });

      // Wrong answer highlight
      if (option !== current.answer) {
        btn.style.background = "#f44336";
        btn.style.color = "white";
      } else {
        score++;
      }

      nextBtn.classList.remove("hidden");
    };

    optionsEl.appendChild(btn);
  });
}

/* NEXT QUESTION */
nextBtn.onclick = () => {
  currentIndex++;
  if (currentIndex < quizData.length) {
    loadQuestion();
    nextBtn.classList.add("hidden");
  } else {
    showResult();
  }
};

/* SHOW RESULT */
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
