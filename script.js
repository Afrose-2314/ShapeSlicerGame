const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

const shapes = ["circle", "square", "triangle"];
const gridSize = 6;
let score = 0;
let time = 60;
let interval;

function createShape() {
  const div = document.createElement("div");
  const type = shapes[Math.floor(Math.random() * shapes.length)];
  div.classList.add("shape", type);
  div.dataset.type = type;
  return div;
}

function fillGrid() {
  grid.innerHTML = "";
  for (let i = 0; i < gridSize * gridSize; i++) {
    grid.appendChild(createShape());
  }
}

function startGame() {
  score = 0;
  time = 60;
  scoreDisplay.textContent = "Score: 0";
  fillGrid();
  clearInterval(interval);
  interval = setInterval(() => {
    time--;
    timerDisplay.textContent = `Time: ${time}s`;
    if (time === 0) {
      clearInterval(interval);
      alert("⏰ Time's up! Your score: " + score);
    }
  }, 1000);
}

grid.addEventListener("click", (e) => {
  if (!e.target.classList.contains("shape")) return;
  const type = e.target.dataset.type;
  const matches = [...grid.children].filter(
    el => el.dataset.type === type
  );

  if (matches.length >= 3) {
    matches.forEach(el => {
      el.classList.add("fade");
      setTimeout(() => {
        el.replaceWith(createShape());
      }, 300);
    });
    score += matches.length;
    scoreDisplay.textContent = "Score: " + score;
  }
});

startGame();
