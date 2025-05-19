// server.js - Основной файл сервера Node.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Импорт маршрутов
const carRoutes = require('./routes/cars');
const partRoutes = require('./routes/parts');

// Инициализация Express приложения
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/autoparts_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB подключена'))
.catch(err => console.error('Ошибка подключения к MongoDB:', err));

// Маршруты API
app.use('/api/cars', carRoutes);
app.use('/api/parts', partRoutes);

// Маршрут для основной страницы
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Ошибка сервера',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
