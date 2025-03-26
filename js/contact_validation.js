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

    resetButton.addEventListener("click", () => {
        const confirmation = confirm("Вы уверены, что хотите очистить форму?");

        if (confirmation) {
            const form = document.getElementById("contactForm");
            const fields = form.querySelectorAll("input:not([readonly]), textarea, select");
            const submitButton = document.getElementById("submitButton"); // Добавлено

            form.reset();
            fields.forEach(field => {
                field.classList.remove("valid", "invalid");
                // Сбрасываем видимость сообщения об ошибке
                const errorMessage = field.nextElementSibling;
                if (errorMessage && errorMessage.classList.contains('error-message')) { // Проверяем, что элемент существует и является сообщением об ошибке
                    errorMessage.style.display = "none";
                }

                if (field.tagName === "INPUT" || field.tagName === "TEXTAREA") {
                    field.value = "";
                } else if (field.tagName === "SELECT") {
                    field.selectedIndex = 0;
                }
            });

            // Дополнительно: отключаем кнопку "Отправить" после сброса формы
            submitButton.disabled = true;
        }
    });
}


