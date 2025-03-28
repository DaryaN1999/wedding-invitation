console.log("Скрипт подключен!");

document.addEventListener("DOMContentLoaded", function() {
    let sections = document.querySelectorAll("section");
    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        observer.observe(section);
    });
});


// Получаем элементы
const nameInput = document.getElementById('guestName');
const confirmButton = document.getElementById('confirm-button');

// Логика для проверки ввода имени
nameInput.addEventListener('input', function() {
    if (nameInput.value.trim() === "") {
        nameInput.setAttribute('placeholder', 'Пожалуйста, введите ваше имя');  // Меняем текст placeholder
        nameInput.style.borderColor = 'red';  // Красная рамка
        confirmButton.disabled = true;      // Делаем кнопку неактивной
    } else {
        nameInput.setAttribute('placeholder', 'Введите ваше имя');  // Восстанавливаем исходный текст placeholder
        nameInput.style.borderColor = '';  // Сбрасываем красную рамку
        confirmButton.disabled = false;     // Активируем кнопку
    }
});

// Функция для запуска эффектного конфетти
function launchConfetti() {
    let end = Date.now() + 3 * 1000; // Длительность 3 секунды

    function frame() {
        confetti({
            particleCount: 7,
            angle: 60,
            spread: 100,
            startVelocity: 50,
            origin: { x: 0 }
        });

        confetti({
            particleCount: 7,
            angle: 120,
            spread: 100,
            startVelocity: 50,
            origin: { x: 1 }
        });

        confetti({
            particleCount: 5,
            spread: 80,
            startVelocity: 40,
            origin: { x: Math.random(), y: Math.random() }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }

    frame();
}

// Логика для подтверждения
document.getElementById('confirm-button')?.addEventListener('click', function() {
    let name = nameInput.value.trim();
    let messageBox = document.getElementById("confirmation-message");
    let thankYouMessage = messageBox?.querySelector("p");

    // Если имя не введено, подсвечиваем поле ввода красным
    if (!name) {
        nameInput.setAttribute('placeholder', 'Введите имя');  // Текст ошибки в placeholder
        nameInput.style.borderColor = 'red';  // Красная рамка
        return;  // Прерываем выполнение, чтобы не продолжать
    }

    // Обновляем сообщение благодарности с именем
    thankYouMessage.innerHTML = Спасибо, ${name}, что подтвердили свое присутствие!<br>Дмитрий и Дарья уже оповещены об этом ;);

    // Показываем окно с благодарностью
    messageBox?.classList.remove('hidden');
    
    // Показываем кнопку отмены подтверждения
    document.getElementById('cancel-button')?.classList.remove('hidden');
    
    // Скрываем кнопку подтверждения
    confirmButton.classList.add('hidden');
    
    // Показываем форму опроса
    document.getElementById('survey')?.classList.remove('hidden');

    // 🎉 Запускаем конфетти после подтверждения
    launchConfetti();
});

// Логика для отмены подтверждения
document.getElementById('cancel-button')?.addEventListener('click', function() {
    // Скрываем окно с благодарностью и форму опроса
    document.getElementById('confirmation-message')?.classList.add('hidden');
    document.getElementById('survey')?.classList.add('hidden');
    
    // Скрываем кнопку отмены подтверждения
    document.getElementById('cancel-button')?.classList.add('hidden');
    
    // Показываем кнопку подтверждения
    confirmButton.classList.remove('hidden');
});


// Обновление отсчета времени до свадьбы
function updateCountdown() {
    var weddingDate = new Date("2025-08-30T16:30:00");
    var now = new Date();
    var timeLeft = weddingDate - now;

    var weeks = Math.floor(timeLeft / (1000 * 60 * 60 * 24 * 7));
    var days = Math.floor((timeLeft % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);


    
    // Применяем padStart для форматирования времени с двумя цифрами
    document.getElementById('weeks').innerText = String(weeks).padStart(2, '0');
    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
