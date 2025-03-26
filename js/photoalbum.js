// Массивы с фото и подписями
const fotos = [
    "images/image1.jpg", "images/image2.jpg", "images/image3.jpg",
    "images/image4.jpg", "images/image5.jpg", "images/image6.jpg",
    "images/image7.jpg", "images/image8.jpg", "images/image9.jpg",
    "images/image10.jpg", "images/image11.jpg", "images/image12.jpg",
    "images/image13.jpg", "images/image14.jpg", "images/image15.jpg"
];

const titles = [
    "Хижина в футуризме", "Котик арт", "Дом в небесах",
    "Женщина из газет", "Мозг вселенной", "Домик на закате тьмы",
    "Подальше от земной коры", "Летающий над водой", "Небосклон под горой и солнцем",
    "Робот аплодирующий осени", "Интерес к искусству", "Русалка",
    "Я буду твоим домом", "Медуза из космоса", "Мазки реальности"
];

const descriptions = [
    "Лучший дом который можно придумать", "Очаровательный кот", "Скрытое убежище среди облаков",
    "Коллаж из газетных фрагментов", "Абстрактное мышление", "Мир в закате",
    "На высоте", "Красивая природа", "Закат за горизонтом",
    "Осенний робот", "Наслаждение искусством", "Мифическое существо",
    "Сказочный дом", "Космическая медуза", "Реалистическая живопись"
];

// Функция для генерации таблицы с фотоальбомом
function generatePhotoAlbum() {
    const $gallery = $('.gallery');
    $gallery.empty(); // Очистить содержимое перед генерацией

    // Цикл для генерации изображений
    for (let i = 0; i < fotos.length; i++) {
        const $imageDiv = $('<div>').addClass('image');

        const $img = $('<img>')
            .attr('src', fotos[i])
            .attr('alt', titles[i])
            .addClass('smallPhoto');

        const $hoverText = $('<p>').addClass('hover_image').text(titles[i]);
        const $underText = $('<p>').addClass('under_image').text(descriptions[i]);

        $imageDiv.append($img, $hoverText, $underText);
        $gallery.append($imageDiv);
    }

    // Обновляем обработчики событий после генерации
    $('.smallPhoto').on('click', function() {
        const index = $('.smallPhoto').index(this);
        showPhoto(index);
    });
}

// Вызов функции при загрузке страницы
$(window).on('load', generatePhotoAlbum);

//--------------------------------------------------------------------big picture small picture
let currentIndex = 0;

function showPhoto(index) {
    currentIndex = index;
    $('#bigPhotoImage').attr('src', $('.smallPhoto').eq(currentIndex).attr('src'));
    $('#bigPhoto').css('display', 'flex');
}

function closePhoto() {
    $('#bigPhoto').css('display', 'none');
}

function navigatePhoto(direction) {
    currentIndex = (currentIndex + direction + $('.smallPhoto').length) % $('.smallPhoto').length;
    showPhoto(currentIndex);
}

// Event Listeners
$('#closeBtn').on('click', closePhoto);
$('#prevBtn').on('click', () => navigatePhoto(-1));
$('#nextBtn').on('click', () => navigatePhoto(1));

$(document).on('keydown', (event) => {
    if ($('#bigPhoto').css('display') === 'flex') {
        if (event.key === 'ArrowLeft') navigatePhoto(-1);
        if (event.key === 'ArrowRight') navigatePhoto(1);
        if (event.key === 'Escape') closePhoto();
    }
});
