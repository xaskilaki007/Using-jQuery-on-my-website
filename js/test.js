$(document).ready(function () {
    const $form = $('.contact-form');
    const $resetButton = $form.find('button[type="reset"]');
    const $inputs = $form.find('input[required], select[required]');
    const $radioButtons = $form.find('input[name="option"]');
    const correctAnswers = {
        question1: 'Компьютерные игры',
        question2: 'Люстры',
        question3: 'История',
        option: 'option1' // Белого ящика
    };

    // Подтверждение перед сбросом формы
    $resetButton.on('click', function (event) {
        const confirmReset = confirm('Вы точно хотите очистить форму?');
        if (!confirmReset) {
            event.preventDefault();
        }
    });

    // Проверка формы при отправке
    $form.on('submit', function (event) {
        let isValid = true;

        // Снимаем подсветку ошибок
        $inputs.removeClass('error');
        $radioButtons.parent().removeClass('error');

        // Проверка поля "Фамилия Имя Отчество"
        const $fioField = $form.find('#fio');
        const fioValue = $fioField.val().trim();
        const fioRegex = /^[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+$/;
        if (!fioRegex.test(fioValue)) {
            isValid = false;
            $fioField.addClass('error');
        }

        // Проверка текстовых вопросов
        $inputs.each(function () {
            const $input = $(this);
            if ($input.attr('id').startsWith('question')) {
                const correctAnswer = correctAnswers[$input.attr('name')];
                if ($input.val().trim() !== correctAnswer) {
                    isValid = false;
                    $input.addClass('error');
                }
            }
        });

        // Проверка радиокнопок
        const selectedRadio = $radioButtons.filter(':checked');
        if (selectedRadio.length === 0 || selectedRadio.val() !== correctAnswers.option) {
            isValid = false;
            $radioButtons.parent().addClass('error');
        }

        // Предотвращение отправки формы
        if (!isValid) {
            event.preventDefault();
            alert('Некоторые поля заполнены неверно. Проверьте и попробуйте снова.');
        }
    });
});
