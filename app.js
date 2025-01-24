const tg = window.Telegram.WebApp;
tg.expand();

// Плавный переход на страницу подписок
function openSubscriptions() {
  document.getElementById('homePage').classList.remove('active');
  setTimeout(() => {
    document.getElementById('homePage').classList.add('hidden');
    document.getElementById('subscriptionsPage').classList.remove('hidden');
    document.getElementById('subscriptionsPage').classList.add('active');
  }, 500);
}

// Возврат на главную страницу
function goBack() {
  document.getElementById('subscriptionsPage').classList.remove('active');
  setTimeout(() => {
    document.getElementById('subscriptionsPage').classList.add('hidden');
    document.getElementById('homePage').classList.remove('hidden');
    document.getElementById('homePage').classList.add('active');
  }, 500);
}

// Показ модального окна с QR-кодом
function showPayment(walletAddress, amountInUSDT) {
  document.getElementById('walletAddress').textContent = walletAddress;
  document.getElementById('qrcode').innerHTML = '';
  new QRCode(document.getElementById('qrcode'), {
    text: `ethereum:${walletAddress}?value=${amountInUSDT}&currency=USDT`, // Формат для Trust Wallet
    width: 200, // Размер QR-кода
    height: 200,
  });
  document.getElementById('paymentModal').classList.add('active');
}

// Закрытие модального окна
function closeModal() {
  document.getElementById('paymentModal').classList.remove('active');
}

// Создание парящих частиц
function createParticles() {
  const particlesContainer = document.querySelector('.particles');
  for (let i = 0; i < 25; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
    particlesContainer.appendChild(particle);
  }
}

createParticles();

// Инициализация главной страницы
document.getElementById('homePage').classList.add('active');

// Локализация
const translations = {
  ru: {
    back: "Назад",
    subscriptions: "Подписки",
    payment: "Оплата",
  },
  en: {
    back: "Back",
    subscriptions: "Subscriptions",
    payment: "Payment",
  },
};

function setLanguage(lang) {
  document.querySelector('.back-button').textContent = translations[lang].back;
  document.querySelector('h2').textContent = translations[lang].subscriptions;
}

setLanguage('ru');

// История платежей
const history = [];

function addToHistory(amount) {
  const transaction = { amount, date: new Date().toLocaleString() };
  history.push(transaction);
  const listItem = document.createElement('li');
  listItem.textContent = `Платеж: ${amount} USDT (${transaction.date})`;
  document.getElementById('historyList').appendChild(listItem);
}

// Функция оплаты через Trust Wallet
function payWithTrustWallet(walletAddress, amountInUSDT) {
  // Показываем модальное окно с QR-кодом
  showPayment(walletAddress, amountInUSDT);
}

// Закрытие Mini App
function closeMiniApp() {
  tg.close();
}

// Добавляем кнопку закрытия приложения
document.addEventListener('DOMContentLoaded', () => {
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Закрыть';
  closeButton.classList.add('close-button');
  closeButton.onclick = closeMiniApp;
  document.body.appendChild(closeButton);
});
