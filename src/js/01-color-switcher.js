const start = document.querySelector('button[data-start]');
    
const stop = document.querySelector('button[data-stop]');

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

start.addEventListener('click', btnStart);

function btnStart() {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    start.setAttribute("disabled", "disabled");
    stop.removeAttribute("disabled", "disabled");
};

stop.addEventListener("click", btnClose)
   
function btnClose() {
    clearInterval(timerId);
    stop.setAttribute("disabled", "disabled");
    start.removeAttribute("disabled", "disabled");
};


