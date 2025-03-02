const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json()); // middleware do obsługi JSON

// Endpoint do zapisu nowego użytkownika
app.post('/save-user', (req, res) => {
    const newUser = req.body;
    console.log("Otrzymane dane użytkownika:", newUser); // Logowanie otrzymanych danych

    // Odczytaj istniejące dane z pliku users.json
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Błąd odczytu pliku:", err); // Logowanie błędu odczytu
            return res.status(500).json({ success: false, message: "Błąd odczytu pliku." });
        }

        let users;
        try {
            users = JSON.parse(data); // Próbujemy sparsować dane JSON
        } catch (parseErr) {
            console.error("Błąd parsowania JSON:", parseErr); // Logowanie błędu parsowania JSON
            return res.status(500).json({ success: false, message: "Błąd parsowania danych." });
        }

        console.log("Odczytani użytkownicy:", users); // Logowanie danych użytkowników przed zapisaniem

        // Dodaj nowego użytkownika
        users.users.push(newUser);

        console.log("Nowi użytkownicy po dodaniu:", users); // Logowanie danych po dodaniu użytkownika

        // Zapisz zaktualizowane dane do pliku users.json
        fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error("Błąd zapisu do pliku:", err); // Logowanie błędu zapisu
                return res.status(500).json({ success: false, message: "Błąd zapisu pliku." });
            }

            console.log("Dane użytkowników po zapisaniu:", users); // Logowanie danych po zapisaniu
            res.status(200).json({ success: true, message: "Dane zostały zapisane." }); // Potwierdzenie zapisu
        });
    });
});

// Endpoint do logowania
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Błąd odczytu pliku:", err);
            return res.status(500).json({ success: false, message: "Błąd odczytu pliku." });
        }

        let users;
        try {
            users = JSON.parse(data);
        } catch (parseErr) {
            console.error("Błąd parsowania JSON:", parseErr);
            return res.status(500).json({ success: false, message: "Błąd parsowania danych." });
        }

        const user = users.users.find(u => u.username === username && u.password === password);

        if (user) {
            res.status(200).json({ success: true, message: "Zalogowano pomyślnie." });
        } else {
            res.status(400).json({ success: false, message: "Nieprawidłowy login lub hasło." });
        }
    });
});

// Serwer nasłuchuje na porcie 3000
app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
});
