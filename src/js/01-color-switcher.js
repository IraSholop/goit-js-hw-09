const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', onStartAnimeColor);
stopBtn.addEventListener('click', onStopAnimeColor);

let idStart;
startBtn.disabled = false;

function onStartAnimeColor(evt) {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  document.body.style.backgroundColor = getRandomHexColor();
  idStart = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopAnimeColor() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(idStart);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
