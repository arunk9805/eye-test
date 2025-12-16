const landolt = document.getElementById("landolt");
const loader = document.getElementById("loader");
const resultBox = document.getElementById("result");
const timerEl = document.getElementById("timer");

const directions = [
  { angle: 0,   name: "Right" },
  { angle: 45,  name: "Right Down" },
  { angle: 90,  name: "Down" },
  { angle: 135, name: "Left Down" },
  { angle: 180, name: "Left" },
  { angle: 225, name: "Left Up" },
  { angle: 270, name: "Up" },
  { angle: 315, name: "Right Up" }
];

let shownResults = [];
let count = 0;
const TOTAL = 10;

let countdown;
let timeLeft = 10;

function startTimer() {
  clearInterval(countdown);
  timeLeft = 10;
  timerEl.textContent = timeLeft;

  countdown = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdown);
    }
  }, 1000);
}

function showNext() {
  if (count === TOTAL) {
    clearInterval(countdown);
    timerEl.style.display = "none";
    landolt.style.display = "none";
    loader.style.display = "none";

    resultBox.innerHTML =
      "TEST COMPLETE\n\nDirections shown:\n" +
      shownResults.map((d, i) => `${i + 1}. ${d}`).join("\n");
    return;
  }

  // Loader phase (2 sec)
  landolt.style.display = "none";
  loader.style.display = "block";

  setTimeout(() => {
    const random = directions[Math.floor(Math.random() * directions.length)];

    landolt.style.transform = `rotate(${random.angle}deg)`;
    shownResults.push(random.name);

    loader.style.display = "none";
    landolt.style.display = "block";

    startTimer();
    count++;
  }, 2000);
}

// Start
showNext();
setInterval(showNext, 10000);