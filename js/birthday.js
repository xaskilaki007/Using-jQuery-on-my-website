const calendar = {
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth(),
    calendarOpen: false,

    init: function () {
        this.generateYearOptions();
        this.renderCalendar();

        // Используем jQuery для обработки событий
        $("#group").on("change", (e) => {
            const field = e.target;
            if (field.value) {
                setFieldValidity(field, true); // Если значение выбрано, зелёная подсветка
            } else {
                setFieldValidity(field, false); // Если пусто, красная подсветка
            }
        });

        $("#prevMonth").on("click", (e) => {
            e.stopPropagation();
            this.changeMonth(-1);
        });

        $("#nextMonth").on("click", (e) => {
            e.stopPropagation();
            this.changeMonth(1);
        });

        $("#yearSelect").on("change", (e) => {
            e.stopPropagation();
            this.changeYear(e.target.value);
        });

        const $birthdayInput = $("#birthday");
        const $calendarEl = $("#calendar");

        $birthdayInput.on("click", (e) => {
            e.stopPropagation();
            this.calendarOpen = true;
            $("#calendar").show();
          });
          
          $(document).on("click", (e) => {
            if (!$(e.target).closest("#calendar, #birthday").length) {
              this.calendarOpen = false;
              $("#calendar").hide();
            }
          });

        $(document).on("mousedown", (e) => {
            if (!$calendarEl.is(e.target) && $calendarEl.has(e.target).length === 0 && !$birthdayInput.is(e.target)) {
                this.calendarOpen = false;
            }
        });

        $(document).on("mouseup", (e) => {
            if (!this.calendarOpen && !$calendarEl.is(e.target) && $calendarEl.has(e.target).length === 0 && !$birthdayInput.is(e.target)) {
                $calendarEl.hide();
            }
        });
    },

    generateYearOptions: function () {
        const $yearSelect = $("#yearSelect");
        for (let i = 1970; i <= 2025; i++) {
            const $option = $("<option></option>").val(i).text(i);
            if (i === this.currentYear) {
                $option.prop("selected", true);
            }
            $yearSelect.append($option);
        }
    },

    renderCalendar: function () {
        const monthNames = [
            "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
        ];
        const daysOfWeek = ["Mn", "Tu", "We", "Th", "Fr", "Sa", "Su"];
        const $monthDisplay = $("#monthDisplay");
        const $daysOfWeekContainer = $("#daysOfWeek");
        const $calendarDays = $("#calendarDays");
        const $selectedDateField = $("#birthday");

        $monthDisplay.text(`${monthNames[this.currentMonth]} ${this.currentYear}`);
        $daysOfWeekContainer.empty();
        $calendarDays.empty();

        daysOfWeek.forEach(day => {
            const $dayElement = $("<div></div>").text(day);
            $daysOfWeekContainer.append($dayElement);
        });

        const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        const daysInPrevMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();

        for (let i = 0; i < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); i++) {
            const $dayElement = $("<div></div>").text(daysInPrevMonth - ((firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1) - i)).addClass("prev-month-day");
            $calendarDays.append($dayElement);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const $dayElement = $("<div></div>").text(i);
            $dayElement.on("click", () => {
                const selectedDate = `${i}-${monthNames[this.currentMonth]}-${this.currentYear}`;
                $selectedDateField.val(selectedDate);
                $selectedDateField.trigger("input"); // Для обновления валидации
                $("#calendar").hide();
            });
            $calendarDays.append($dayElement);
        }
    },

    changeMonth: function (offset) {
        this.currentMonth += offset;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        } else if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.renderCalendar();
    },

    changeYear: function (year) {
        this.currentYear = parseInt(year, 10);
        this.renderCalendar();
    },
};

// Инициализация календаря
$(document).ready(function () {
    calendar.init();
});
