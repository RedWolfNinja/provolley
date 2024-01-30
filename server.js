const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Настройка Multer для обработки загрузки файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Папка для сохранения файлов
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

// Middleware для обработки статических файлов
app.use('/static', express.static(path.join(__dirname, 'static')));

// Отправка HTML-страницы с формой
app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'upload.html'));
});

// Обработка загрузки файлов
app.post('/upload', upload.array('files'), (req, res) => {
    console.log(`Файл успешно загружен`);
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
