$(document).ready(function() {
    const popover = $('#popover');

    $('input, textarea').on('mouseenter', function() {
        const tooltip = $(this).data('tooltip');
        if (tooltip) {
            popover.text(tooltip).css({
                top: $(this).offset().top + $(this).outerHeight() + 5, // Устанавливаем ниже элемента
                left: $(this).offset().left,
            }).fadeIn(200);

            // Используем setTimeout, чтобы скрыть поповер через 5 секунд
            setTimeout(function() {
                popover.fadeOut(200);
            }, 5000);
        }
    });

    $('input, textarea').on('mouseleave', function() {
        // Убираем поповер, если мышь покидает элемент
        popover.fadeOut(200);
    });
});
