$(document).ready(function () {
    var openModalButton = $("#openModalButton");
    var $modal = $('#modal');
    var $clearBtn = $('#clearForm');
    var $cancelBtn = $('#closeModal');
    const form = $('#contactForm');
    const submitButton = $('#submit');

    function showModal() {
        $("#overlay").fadeIn();
        $modal.fadeIn();
    }

    function closeModal() {
        $("#overlay").fadeOut();
        $modal.fadeOut();
        resetFormStyles(); // Сброс стилей формы при закрытии
    }

    function validateRequiredField(field) {
        return field.val().trim() !== "";
    }

    function validateName(name) {
        var namePattern = /^[а-яА-Я]+\s[а-яА-Я]+\s[а-яА-Я]+$/;
        return namePattern.test(name);
    }

    function validatePhone(phone) {
        var phonePattern = /^(\+7|\+3)\d{9,11}$/;
        return phonePattern.test(phone);
    }

    function showError(field, errorMessage) {
        const errorElement = $("#" + field.attr("id") + "-error");
        errorElement.text(errorMessage).show().css("color", "red");
    }

    function hideError(field) {
        const errorElement = $("#" + field.attr("id") + "-error");
        errorElement.hide().text("");
    }

    function validateField(field) {
        const fieldId = field.attr("id");
        hideError(field);

        if (!validateRequiredField(field)) {
            field.addClass("error-input").removeClass("valid-input");
            showError(field, "Пожалуйста, заполните это поле.");
        } else if (fieldId === "fullName" && !validateName(field.val())) {
            field.addClass("error-input").removeClass("valid-input");
            showError(field, "Пожалуйста, введите полное имя в формате: Фамилия Имя Отчество.");
        } else if (fieldId === "phone" && !validatePhone(field.val())) {
            field.addClass("error-input").removeClass("valid-input");
            showError(field, "Пожалуйста, введите корректный номер телефона.");
        } else {
            field.removeClass("error-input").addClass("valid-input");
        }

        updateSubmitButtonState();
    }

    function validateForm() {
        var fullNameInput = $("#fullName");
        var birthdayInput = $("#birthday");
        var emailInput = $("#email");
        var phoneInput = $("#phone");
        var messageInput = $("#message");
        var genderInput = $('input[name="gender"]:checked');
        var ageSelect = $("#age");

        var isFullNameValid = validateRequiredField(fullNameInput) && validateName(fullNameInput.val());
        var isBirthdayValid = validateRequiredField(birthdayInput);
        var isEmailValid = validateRequiredField(emailInput);
        var isPhoneValid = validateRequiredField(phoneInput) && validatePhone(phoneInput.val());
        var isMessageValid = validateRequiredField(messageInput);
        var isGenderValid = genderInput.length > 0;
        var isAgeValid = validateRequiredField(ageSelect);

        submitButton.prop('disabled', !(isFullNameValid && isBirthdayValid && isEmailValid && isPhoneValid && isMessageValid && isGenderValid && isAgeValid));
    }

    function updateSubmitButtonState() {
        validateForm();
    }

    function resetFormStyles() {
        const formFields = form.find("input, select, textarea");
        formFields.each(function() {
            $(this).removeClass("error-input valid-input");
            hideError($(this));
        });
    }

    openModalButton.click(function() {
        showModal();
    });

    form.submit(function(event) {
        event.preventDefault(); // Предотвращаем отправку формы
        
        // Выполняем валидацию перед отправкой формы
        validateFullFormAndSubmit();
    });

    function validateFullFormAndSubmit() {
        validateField($("#fullName"));
        validateField($("#birthday"));
        validateField($("#email"));
        validateField($("#phone"));
        validateField($("#message"));
        $("input[name='gender']").each(function() {
            validateField($(this));
        });
        validateField($("#age"));
    
        // Проверяем, если все валидно, то отправляем форму
        if (!submitButton.prop('disabled')) {
            // Получаем значения полей формы
            var fullName = $("#fullName").val();
            var birthday = $("#birthday").val();
            var email = $("#email").val();
            var phone = $("#phone").val();
            var message = $("#message").val();
            var gender = $("input[name='gender']:checked").val();
            var age = $("#age").val();
    
            // Формируем mailto ссылку
            var mailtoLink = "mailto:someone@example.com?subject=Форма обратной связи&body=" +
                              "Имя: " + encodeURIComponent(fullName) + "%0D%0A" +
                              "Дата рождения: " + encodeURIComponent(birthday) + "%0D%0A" +
                              "Email: " + encodeURIComponent(email) + "%0D%0A" +
                              "Телефон: " + encodeURIComponent(phone) + "%0D%0A" +
                              "Сообщение: " + encodeURIComponent(message) + "%0D%0A" +
                              "Пол: " + encodeURIComponent(gender) + "%0D%0A" +
                              "Возраст: " + encodeURIComponent(age);
    
            // Открываем почтовую программу
            window.location.href = mailtoLink;
    
            // Закрываем модальное окно
            closeModal();
            console.log("Форма отправлена через почту!"); // Сообщение в консоль
        }
    }
    

    $clearBtn.click(function() {
        closeModal();
        form.trigger('reset');
    });

    $cancelBtn.click(function() {
        closeModal();
    });

    $('#submit').click(function(e) {
        e.preventDefault();
        validateFullFormAndSubmit();
    });

    // Добавляем обработчики событий для полей формы
    $("#fullName").on("blur", function() { validateField($(this)); });
    $("#birthday").on("blur", function() { validateField($(this)); });
    $("#email").on("blur", function() { validateField($(this)); });
    $("#phone").on("blur", function() { validateField($(this)); });
    $("#message").on("blur", function() { validateField($(this)); });
    $('input[name="gender"]').on("change", function() { validateField($(this)); });
    $("#age").on("change blur", function() { validateField($(this)); });
    
    form.on('reset', resetFormStyles);
});
