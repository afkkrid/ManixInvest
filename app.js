// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Развернуть приложение на весь экран
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

// Показ модального окна с оплатой
function showPayment(walletAddress) {
  document.getElementById('walletAddress').textContent = walletAddress;
  document.getElementById('qrcode').innerHTML = '';
  new QRCode(document.getElementById('qrcode'), {
    text: walletAddress,
    width: 128,
    height: 128,
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

// Функция для открытия Trust Wallet с транзакцией
function openTrustWallet(walletAddress, amountInUSDT) {
  const trustWalletDeepLink = `https://link.trustwallet.com/send?address=${walletAddress}&amount=${amountInUSDT}&currency=USDT`;
  window.location.href = trustWalletDeepLink;

  setTimeout(() => {
    if (document.hidden) return;
    showInstallTrustWalletModal();
  }, 500);
}

// Функция для показа модального окна с ссылкой на установку Trust Wallet
function showInstallTrustWalletModal() {
  const modalContent = `
    <div class="modal-content">
      <span class="close" onclick="closeModal()">&times;</span>
      <h2>Установи Trust Wallet</h2>
      <p>Для оплаты необходимо установить Trust Wallet.</p>
      <a href="https://trustwallet.com/download" target="_blank" class="install-button">Установить Trust Wallet</a>
    </div>
  `;

  const modal = document.getElementById('paymentModal');
  modal.innerHTML = modalContent;
  modal.classList.add('active');
}

// Функция оплаты через Trust Wallet
function payWithTrustWallet(walletAddress, amountInUSDT) {
  if (typeof window.ethereum !== 'undefined') {
    openTrustWallet(walletAddress, amountInUSDT);
  } else {
    showInstallTrustWalletModal();
  }
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