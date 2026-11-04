document.addEventListener('DOMContentLoaded', () => {
    const values = document.querySelectorAll('.footer-timer-value');

    const TOTAL_TIME = 24 * 60 * 60; // 24 години
    const STORAGE_KEY = 'timerEndTime';

    let endTime = localStorage.getItem(STORAGE_KEY);

    function setNewEndTime() {
        const newEndTime = Date.now() + TOTAL_TIME * 1000;
        localStorage.setItem(STORAGE_KEY, newEndTime);
        return newEndTime;
    }

    if (!endTime) {
        endTime = setNewEndTime();
    } else {
        endTime = parseInt(endTime, 10);
    }

    function updateTimer() {
        const now = Date.now();
        let remaining = Math.floor((endTime - now) / 1000);

        // 🔁 якщо час вийшов — запускаємо заново
        if (remaining <= 0) {
            endTime = setNewEndTime();
            remaining = TOTAL_TIME;
        }

        const hours = Math.floor(remaining / 3600);
        const minutes = Math.floor((remaining % 3600) / 60);
        const seconds = remaining % 60;

        values[0].textContent = String(hours).padStart(2, '0');
        values[1].textContent = String(minutes).padStart(2, '0');
        values[2].textContent = String(seconds).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
});
