function updateTime() {
    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    const days = [
        'Воскресенье', 'Понедельник', 'Вторник', 'Среда',
        'Четверг', 'Пятница', 'Суббота'
    ];
    const now = new Date();
    const dayOfWeek = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const formattedDate = `${hours}:${minutes}:${seconds} ${day} ${month} ${year} (${dayOfWeek})`;
    $('#current-time').text(formattedDate); // Используем jQuery для обновления текста
}

// Запускаем обновление времени каждую секунду
setInterval(updateTime, 1000);
updateTime();
