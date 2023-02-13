const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

stop.disabled = true;

start.addEventListener('click', btnStart);

function btnStart() {
     document.body.style.backgroundColor = getRandomHexColor();
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
     start.disabled = true;
  if (stop.hasAttribute('disabled')) {
    stop.disabled = false;
  }
};

stop.addEventListener("click", btnClose)
   
function btnClose() {
    clearInterval(timerId);
    stop.disabled = true;
    start.disabled = false;
};
 

