document.addEventListener("DOMContentLoaded", () => {
    calendar.init(); // Инициализация календаря
    setupFormValidation(); // Настройка валидации
    setupResetConfirmation(); // Настройка сброса
});
document.getElementById("fullname").addEventListener("input", (event) => {
    validateField(event.target);
});


function setupFormValidation() {
    const form = document.getElementById("contactForm");
    const fields = form.querySelectorAll("input:not([readonly]), textarea, select");
    const submitButton = document.getElementById("submitButton");

    fields.forEach(field => {
        field.classList.remove("valid", "invalid");
        field.addEventListener("input", () => validateField(field));
        field.addEventListener("change", () => validateField(field));
    });

    form.addEventListener("submit", event => {
        event.preventDefault();
        let isFormValid = true;

        fields.forEach(field => {
            validateField(field);
            if (!field.classList.contains("valid")) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            fields.forEach(field => {
                if (!field.classList.contains("valid")) {
                    field.classList.add("invalid");
                }
            });
        } else {
            alert("Форма успешно отправлена!");
            form.reset();
            fields.forEach(field => field.classList.remove("valid", "invalid"));
            submitButton.disabled = true;
        }
    });

    form.addEventListener("input", () => {
        const allValid = Array.from(fields).every(field => {
            return field.id === "yearSelect" || field.classList.contains("valid");
        });
        submitButton.disabled = !allValid;
    });
}

function validateField(field) {
    const phoneRegex = /^(\+7|\+3)\d{9,11}$/; // Номер должен начинаться с +7 и содержать 10 цифр
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Проверка на корректный email
    const fioRegex = /^[а-яА-Я]+\s[а-яА-Я]+\s[а-яА-Я]+$/; // Проверка на три слова, разделенные двумя пробелами

    if (field.id === "phone") {
        if (phoneRegex.test(field.value)) {
            setFieldValidity(field, true);
        } else {
            setFieldValidity(field, false);
        }
    } else if (field.id === "email") {
        if (emailRegex.test(field.value)) {
            setFieldValidity(field, true);
        } else {
            setFieldValidity(field, false);
        }
    } else if (field.id === "fullname") {
        if (fioRegex.test(field.value)) {
            setFieldValidity(field, true);
        } else {
            setFieldValidity(field, false);
        }
    } else if (field.checkValidity()) {
        setFieldValidity(field, true);
    } else {
        setFieldValidity(field, false);
    }
}

function setFieldValidity(field, isValid) {
    const errorMessage = field.nextElementSibling; // Получаем следующий элемент (сообщение об ошибке)
    if (isValid) {
        field.classList.add("valid");
        field.classList.remove("invalid");
        errorMessage.style.display = "none"; // Скрываем сообщение об ошибке
    } else {
        field.classList.add("invalid");
        field.classList.remove("valid");
        errorMessage.style.display = "block"; // Показываем сообщение об ошибке
    }
}


function setupResetConfirmation() {
    const resetButton = document.getElementById("resetButton");
    const modal = document.getElementById("confirmationModal");
    const confirmReset = document.getElementById("confirmReset");
    const cancelReset = document.getElementById("cancelReset");
    const modalClose = document.getElementById("modalClose");
    const mainContent = document.querySelector("main"); // Получаем основной контейнер

    resetButton.addEventListener("click", () => {
        mainContent.classList.add("blur"); // Добавляем размытие на фон
        modal.style.display = "block"; // Показываем модальное окно
    });

    confirmReset.addEventListener("click", () => {
        const form = document.getElementById("contactForm");
        form.reset();
        const fields = form.querySelectorAll("input:not([readonly]), textarea, select");
        fields.forEach(field => {
            field.classList.remove("valid", "invalid");
        });
        modal.style.display = "none"; // Закрываем модальное окно
        mainContent.classList.remove("blur"); // Убираем размытие
    });

    cancelReset.addEventListener("click", () => {
        modal.style.display = "none"; // Закрываем модальное окно
        mainContent.classList.remove("blur"); // Убираем размытие
    });

    modalClose.addEventListener("click", () => {
        modal.style.display = "none"; // Закрываем модальное окно
        mainContent.classList.remove("blur"); // Убираем размытие
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            mainContent.classList.remove("blur"); // Убираем размытие
        }
    });
}


