// Функция для вывода списка интересов
function displayInterests(...interests) {
    const interestsList = document.getElementById('interests-list');
    interests.forEach(interest => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="obomne.html#Бетховен">${interest}</a>`;
        interestsList.appendChild(listItem);
    });
}

// Вызов функции с переменным числом аргументов
document.addEventListener('DOMContentLoaded', function() {
    displayInterests('Бетховен');
});
        document.getElementById("myInterestsButton").onclick = function() {
            window.location.href = "obomne.html";
        };