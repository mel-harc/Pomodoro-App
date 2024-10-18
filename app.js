const startBtn = document.querySelector('.btn-start'); 
const session = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const resetBtn = document.querySelector('.btn-reset');
let myInterval;
let isRunning = false;
let totalSeconds;

const appTimer = () => {
    if (!isRunning) {
        // Start or resume the timer
        if (!totalSeconds) {
            const sessionAmount = Number.parseInt(session.textContent);
            totalSeconds = sessionAmount * 60;
        }
        
        const updateSeconds = () => {
            totalSeconds--;

            let minutesLeft = Math.floor(totalSeconds / 60);
            let secondsLeft = totalSeconds % 60;

            session.textContent = `${minutesLeft}`;
            seconds.textContent = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;

            if (minutesLeft === 0 && secondsLeft === 0) {
                clearInterval(myInterval);
                startBtn.textContent = 'Start';
                isRunning = false;
                totalSeconds = null;
            }
        };

        myInterval = setInterval(updateSeconds, 1000);
        startBtn.textContent = 'Pause';
        isRunning = true;
    } else {
        // Pause the timer
        clearInterval(myInterval);
        startBtn.textContent = 'Start';
        isRunning = false;
    }
};

const resetTimer = () => {
  clearInterval(myInterval);
  session.textContent = '25';
  seconds.textContent = '00';
  startBtn.textContent = 'Start';
  isRunning = false;
  totalSeconds = null;
};

startBtn.addEventListener('click', appTimer);
resetBtn.addEventListener('click', resetTimer);