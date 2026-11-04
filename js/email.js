const maxSends = 2;

// Автоматично отримуємо домен поточного сайту
const website = window.location.hostname;

// Використовуємо динамічний ключ для localStorage
const storageKey = `sendCount_${website}`;

// Отримуємо кількість відправок з localStorage
let sendCount = parseInt(localStorage.getItem(storageKey)) || 0;

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Асинхронна функція відправки email + website
async function sendEmail(email) {
  try {
    const res = await fetch("https://rating-smoky.vercel.app/api/email-web", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail: email, website }),
    });

    const json = await res.json();
    return { userEmail: json.userEmail, website: json.website };
  } catch (err) {
    console.error("Email save failed:", err);
    throw new Error("Не вдалося надіслати email");
  }
}

// Ініціалізація стану форми при завантаженні
const input = document.querySelector('.inputEmail');
const button = document.querySelector('.buttonEmail');
const buttonText = button.querySelector('.buttonText');
const spinner = button.querySelector('.spinner');
const message = document.querySelector('.messageEmail');

if (sendCount >= maxSends) {
  input.disabled = true;
  button.disabled = true;
  message.style.color = 'green';
  message.textContent = `Welcome to the community! You have been successfully subscribed.`;
}

document.querySelector('.formEmail').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = input.value.trim();
  message.textContent = '';
  message.style.color = 'red';

  if (!email) {
    message.textContent = 'Please enter your email.';
    return;
  }

  if (!isValidEmail(email)) {
    message.textContent = 'Invalid email format.';
    return;
  }

  // Показати спінер
  button.disabled = true;
  spinner.style.display = 'inline-block';
  buttonText.style.display = 'none';

  try {
    const saved = await sendEmail(email);
    sendCount++;
    localStorage.setItem(storageKey, sendCount); // зберігаємо в кеш з динамічним ключем

    message.style.color = 'green';
    message.textContent = `Welcome to the community! You have been successfully subscribed`;

    if (sendCount >= maxSends) {
      input.disabled = true;
      button.disabled = true;
      buttonText.style.display = 'block';
      spinner.style.display = 'none';
    } else {
      input.value = '';
    }
  } catch (err) {
    message.textContent = err.message;
  } finally {
    if (sendCount < maxSends) {
      button.disabled = false;
      buttonText.style.display = 'block';
      spinner.style.display = 'none';
    }
  }
});
