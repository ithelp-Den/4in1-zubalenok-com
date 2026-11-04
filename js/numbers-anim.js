document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.count-up');
    const speed = 2000;

    const animate = (counter) => {
        const target = +counter.getAttribute('data-target');
        const startTime = performance.now();
        const isFloat = counter.getAttribute('data-target').includes('.');

        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / speed, 1);
            
            // Плавна функція сповільнення
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            let currentValue = easeProgress * target;

            // Оновлюємо тільки цифру
            if (isFloat) {
                counter.innerText = currentValue.toFixed(1);
            } else {
                counter.innerText = Math.floor(currentValue).toLocaleString('fr-FR').replace(',', ' '); 
                // 'fr-FR' та replace додадуть гарні пробіли для тисяч (7 000)
            }

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                // Фіксуємо кінцеве точне значення
                counter.innerText = isFloat ? target : target.toLocaleString('fr-FR').replace(',', ' ');
            }
        };

        requestAnimationFrame(updateCount);
    };

    const observerOptions = { threshold: 0.5 };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
});