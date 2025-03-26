document.addEventListener("DOMContentLoaded", () => {
    const sessionHistoryTable = document.getElementById("sessionHistory");
    const allTimeHistoryTable = document.getElementById("allTimeHistory");

    // Получаем данные из localStorage
    const historyData = JSON.parse(localStorage.getItem("pageHistory")) || {};
    const sessionData = JSON.parse(sessionStorage.getItem("pageHistory")) || {};

    // Функция для обновления данных истории
    const updateHistory = (pageName) => {
        const currentTime = new Date().toLocaleString();

        // Обновляем историю текущего сеанса
        if (!sessionData[pageName]) {
            sessionData[pageName] = { visits: 0, lastVisit: null };
        }
        sessionData[pageName].visits += 1;
        sessionData[pageName].lastVisit = currentTime;

        // Обновляем общую историю
        if (!historyData[pageName]) {
            historyData[pageName] = { visits: 0, lastVisit: null };
        }
        historyData[pageName].visits += 1;
        historyData[pageName].lastVisit = currentTime;

        // Сохраняем данные в хранилище
        sessionStorage.setItem("pageHistory", JSON.stringify(sessionData));
        localStorage.setItem("pageHistory", JSON.stringify(historyData));
    };

    // Получаем имя текущей страницы
    const pageName = location.pathname.split("/").pop() || "index.html";
    updateHistory(pageName);

    // Функция для отображения данных в таблице
    const renderTable = (table, data) => {
        for (const [page, details] of Object.entries(data)) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${page}</td>
                <td>${details.visits}</td>
                <td>${details.lastVisit || "—"}</td>
            `;
            table.appendChild(row);
        }
    };

    // Отображаем историю текущего сеанса
    renderTable(sessionHistoryTable, sessionData);

    // Отображаем общую историю
    renderTable(allTimeHistoryTable, historyData);
});
