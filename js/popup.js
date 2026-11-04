(function () {
  // --- 1. ЛОГІКА ТАЙМЕРА ---

  function startTimer(durationInSeconds) {
    let timer = durationInSeconds;

    const els = {
      h: document.getElementById("hours"),
      m: document.getElementById("minutes"),
      s: document.getElementById("seconds"),
    };

    const updateDisplay = () => {
      const h = Math.floor(timer / 3600);
      const m = Math.floor((timer % 3600) / 60);
      const s = timer % 60;

      if (els.h) els.h.textContent = String(h).padStart(2, "0");
      if (els.m) els.m.textContent = String(m).padStart(2, "0");
      if (els.s) els.s.textContent = String(s).padStart(2, "0");

      if (--timer < 0) timer = durationInSeconds;
    };

    updateDisplay();
    setInterval(updateDisplay, 1000);
  }

  // --- 2. ЛОГІКА ПОПАПУ ---

  const overlay = document.querySelector(".popup-overlay");
  const closeBtn = document.querySelector(".close-btn");

  const openPopup = () => overlay?.classList.add("active");
  const closePopup = () => overlay?.classList.remove("active");

  if (closeBtn) closeBtn.addEventListener("click", closePopup);

  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closePopup();
    });
  }

  const triggerBtns = document.querySelectorAll(".open-popup-btn");
  if (triggerBtns) {
    triggerBtns.forEach(el => {
        el.addEventListener("click", openPopup)
    })
  }

  // --- 3. ІНІЦІАЛІЗАЦІЯ ФОРМИ ---

  function initForm() {
    const form = document.getElementById("custom-subscribe-form");
    if (!form) return;

    const domainField = document.getElementById("mce-MMERGE4");
    if (domainField) domainField.value = window.location.hostname;

    // 🔹 ЗЧИТУЄМО РЕДІРЕКТ З HTML
    const redirectUrl = form.dataset.redirectUrl;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const btn = form.querySelector("button");
      if (btn) {
        btn.textContent = "Processing...";
        btn.disabled = true;
      }

      const url = form.getAttribute("action") + "&c=mcCallback";
      const data = new FormData(form);

      const params = [];
      data.forEach((value, key) => {
        params.push(
          encodeURIComponent(key) + "=" + encodeURIComponent(value)
        );
      });

      const script = document.createElement("script");
      script.src = `${url}&${params.join("&")}`;

      window.mcCallback = function (response) {
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      };

      document.head.appendChild(script);

      // fallback редірект (на випадок якщо callback не спрацює)
      if (redirectUrl) {
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 3000);
      }
    });
  }

  // --- 4. ІНІЦІАЛІЗАЦІЯ ---

  window.addEventListener("DOMContentLoaded", () => {
    startTimer(1800);
    initForm();
  });
})();