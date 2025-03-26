$(document).ready(function () {
    const $form = $('#contactForm');
    const $fullnameInput = $('#fullname');
    const $phoneInput = $('#phone');
    const $fullnameError = $('#fullnameError');
    const $phoneError = $('#phoneError');
    const $calendar = $('#calendar');
    const $input = $('#birthdate');

    // Проверка валидности формы
    function validateForm() {
        let valid = true;
        // Сброс сообщений об ошибках
        $fullnameError.hide();
        $phoneError.hide();
        $fullnameInput.removeClass('error');
        $phoneInput.removeClass('error');

        // Валидация ФИО
        const fullnameValue = $fullnameInput.val().trim();
        const fullnameRegex = /^[А-Яа-яЁё]+\s[А-Яа-яЁё]+\s[А-Яа-яЁё]+$/;
        if (!fullnameRegex.test(fullnameValue)) {
            valid = false;
            $fullnameInput.addClass('error');
            $fullnameError.show();
        }

        // Валидация телефона
        const phoneValue = $phoneInput.val().trim();
        const phoneRegex = /^(\+7|\+3)\d{7,9}$/;
        if (!phoneRegex.test(phoneValue)) {
            valid = false;
            $phoneInput.addClass('error');
            $phoneError.show();
        }

        return valid;
    }

    // Проверка формы при отправке
    $form.on('submit', function (event) {
        if (!validateForm()) {
            event.preventDefault(); // Предотвращение отправки формы при ошибке
        }
    });

    // Проверка при потере фокуса
    $fullnameInput.on('blur', validateForm);
    $phoneInput.on('blur', validateForm);

    // Календарь
    let selectedDate = new Date();

    function createCalendar(date) {
        $calendar.empty(); // Очистить содержимое календаря

        const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        const daysInWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

        // Создаем заголовок
        const $header = $('<div class="calendar-header"></div>');
        $header.append(`<button id="prev-month">&lt;</button>`);
        $header.append(`<span>${monthNames[month]} ${year}</span>`);
        $header.append(`<button id="next-month">&gt;</button>`);
        $calendar.append($header);

        // Создаем дни недели
        const $daysRow = $('<div class="calendar-days"></div>');
        daysInWeek.forEach(day => {
            const $dayDiv = $('<div></div>').text(day).css('font-weight', 'bold');
            $daysRow.append($dayDiv);
        });
        $calendar.append($daysRow);

        // Создаем ячейки календаря
        const $daysContainer = $('<div class="calendar-days"></div>');

        // Добавляем пустые ячейки перед первым днем месяца
        for (let i = 0; i < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); i++) {
            const $emptyCell = $('<div class="inactive"></div>');
            $daysContainer.append($emptyCell);
        }

        // Добавляем дни месяца
        for (let day = 1; day <= lastDateOfMonth; day++) {
            const $dayCell = $('<div></div>').text(day);
            $dayCell.on('click', function () {
                $input.val(`${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
                $calendar.hide();
            });
            if (
                year === new Date().getFullYear() &&
                month === new Date().getMonth() &&
                day === new Date().getDate()
            ) {
                $dayCell.addClass('active');
            }
            $daysContainer.append($dayCell);
        }

        $calendar.append($daysContainer);

        // Навигация
        $('#prev-month').on('click', function () {
            createCalendar(new Date(year, month - 1, 1));
        });

        $('#next-month').on('click', function () {
            createCalendar(new Date(year, month + 1, 1));
        });
    }

    $input.on('focus', function () {
        const rect = this.getBoundingClientRect();
        $calendar.css({
            top: `${rect.bottom + window.scrollY}px`,
            left: `${rect.left}px`,
            display: 'block'
        });
        createCalendar(selectedDate);
    });

    $(document).on('click', function (event) {
        if (!$calendar.is(event.target) && $calendar.has(event.target).length === 0 && event.target !== $input[0]) {
            $calendar.hide();
        }
    });
});
