const maxSends = 2;
let sendCount = parseInt(localStorage.getItem('sendCount')) || 0;

// Список країн (можна доповнювати)
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guyana",
  "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Samoa", "San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen", "Zambia", "Zimbabwe"
];

// Елементи
const form = document.querySelector('.formEmail');
const inputEmail = document.querySelector('.inputEmail');
const inputName = document.querySelector('.inputName');
const selectCountry = document.querySelector('.inputCountry'); // Тепер це select
const button = document.querySelector('.buttonEmail');
const buttonText = button.querySelector('.buttonText');
const spinner = button.querySelector('.spinner');
const message = document.querySelector('.messageEmail');

// 1. Функція наповнення списку країн
function initCountries() {
  // Сортуємо за алфавітом (на випадок, якщо масив не в порядку)
  const sortedCountries = countries.sort((a, b) => a.localeCompare(b));
  
  sortedCountries.forEach(country => {
    const option = document.createElement('option');
    option.value = country;
    option.textContent = country;
    selectCountry.appendChild(option);
  });
}

// Запускаємо наповнення відразу
initCountries();

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function disableForm() {
  inputEmail.disabled = true;
  inputName.disabled = true;
  selectCountry.disabled = true;
  button.disabled = true;
}

if (sendCount >= maxSends) {
  disableForm();
  message.style.color = 'green';
  message.textContent = `Welcome to the community! You have been successfully subscribed.`;
}

async function sendEmail(data) {
  const cleanDomain = window.location.hostname.replace(/^www\./, '');

  const res = await fetch("https://mail-send-tau.vercel.app/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: data.email,
      name: data.name,
      country: data.country,
      tag: cleanDomain
    })
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Something went wrong");
  return json;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const emailValue = inputEmail.value.trim();
  const nameValue = inputName.value.trim();
  const countryValue = selectCountry.value; // Отримуємо вибране значення

  message.textContent = '';
  message.style.color = 'red';

  if (!emailValue || !nameValue || !countryValue) {
    message.textContent = 'Please fill in all fields.';
    return;
  }

  if (!isValidEmail(emailValue)) {
    message.textContent = 'Invalid email format.';
    return;
  }

  button.disabled = true;
  spinner.style.display = 'inline-block';
  buttonText.style.display = 'none';

  try {
    await sendEmail({
      email: emailValue,
      name: nameValue,
      country: countryValue
    });

    sendCount++;
    localStorage.setItem('sendCount', sendCount);

    message.style.color = 'green';
    message.textContent = `Welcome to the community! You have been successfully subscribed.`;

    // Очищення
    inputEmail.value = '';
    inputName.value = '';
    selectCountry.selectedIndex = 0; // Повертаємо до першого пункту "Select country"

    if (sendCount >= maxSends) {
      disableForm();
    }

  } catch (err) {
    message.textContent = err.message;
    button.disabled = false;
  } finally {
    spinner.style.display = 'none';
    buttonText.style.display = 'block';
  }
});