function login() {
    // Po kliknięciu przycisku, po prostu przekierowujemy użytkownika na dashboard
    window.location.href = "dashboard.html";
}

fetch("users.json")
    .then(response => response.json())
    .then(users => {
        const user = users.users.find(u => u.username === username && u.password === password);
        if (user) {
            localStorage.setItem("loggedInUser", username);
            window.location.href = "dashboard.html";
        } else {
            errorMsg.textContent = "Nieprawidłowe dane logowania!";
            errorMsg.style.color = "red";
        }
    });

// Animacja wejścia
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".login-container").style.opacity = "0";
    setTimeout(() => {
        document.querySelector(".login-container").style.opacity = "1";
    }, 300);
});

function register() {
    const username = document.getElementById("new-username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("new-password").value;
    const registerMsg = document.getElementById("register-msg");

    // Sprawdzanie, czy wszystkie pola są wypełnione
    if (!username || !email || !password) {
        registerMsg.textContent = "Wszystkie pola są wymagane!";
        registerMsg.style.color = "red";
        return;
    }

    // Wysyłanie danych do serwera (POST)
    fetch('http://localhost:3000/save-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password }) // Przesyłamy dane
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            registerMsg.textContent = data.message;
            registerMsg.style.color = "green";
            setTimeout(() => {
                window.location.href = "index.html"; // Przekierowanie do logowania po sukcesie
            }, 2000);
        } else {
            registerMsg.textContent = data.message;
            registerMsg.style.color = "red";
        }
    })
    .catch(error => {
        registerMsg.textContent = "Błąd połączenia z serwerem!";
        registerMsg.style.color = "red";
    });

    // Nowy skrypt otwierający nową kartę po kliknięciu na obrazek
    var image = document.getElementById("ikona-image");

    if (image) {
        image.addEventListener("click", function() {
            // Otwórz nową kartę z linkiem po kliknięciu na obrazek
            window.open("https://twój-link.com", "_blank");  // Zmień "https://twój-link.com" na swój link
        });
    }
};
