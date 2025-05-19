// seeds/seed.js - Скрипт для заполнения базы данных начальными данными
const mongoose = require('mongoose');
const Car = require('../models/Car');
const Part = require('../models/Part');

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/autoparts_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB подключена для заполнения данными'))
.catch(err => {
    console.error('Ошибка подключения к MongoDB:', err);
    process.exit(1);
});

// Данные автомобилей
const carsData = [
    {
        brand: 'Volkswagen',
        model: 'Passat B6',
        year: 2008,
        engine: '2.0 TDI (140 л.с.)',
        transmission: 'Механическая',
        image: 'vw-passat-b6.jpg',
        description: 'Volkswagen Passat B6 в хорошем состоянии. Европейская сборка, обслуживался в официальном дилерском центре.'
    },
    {
        brand: 'Audi',
        model: 'A6 C6',
        year: 2007,
        engine: '3.0 TDI (233 л.с.)',
        transmission: 'Автоматическая',
        image: 'audi-a6-c6.jpg',
        description: 'Audi A6 C6 в отличном состоянии. Полная комплектация, салон - кожа, все опции работают.'
    },
    {
        brand: 'BMW',
        model: '5 E60',
        year: 2006,
        engine: '2.5i (218 л.с.)',
        transmission: 'Автоматическая',
        image: 'bmw-5-e60.jpg',
        description: 'BMW 5 серии E60 с небольшим пробегом. Оригинальные детали, без следов коррозии.'
    },
    {
        brand: 'Mercedes-Benz',
        model: 'E-Class W211',
        year: 2009,
        engine: '3.0 CDI (224 л.с.)',
        transmission: 'Автоматическая',
        image: 'mercedes-e-w211.jpg',
        description: 'Mercedes-Benz E-Class W211 в идеальном состоянии. Максимальная комплектация, панорамная крыша.'
    },
    {
        brand: 'Toyota',
        model: 'Camry V40',
        year: 2008,
        engine: '2.4 (167 л.с.)',
        transmission: 'Автоматическая',
        image: 'toyota-camry-v40.jpg',
        description: 'Toyota Camry V40 в отличном состоянии. Японская сборка, низкий расход топлива.'
    },
    {
        brand: 'Skoda',
        model: 'Octavia A5',
        year: 2010,
        engine: '1.8 TSI (160 л.с.)',
        transmission: 'DSG',
        image: 'skoda-octavia-a5.jpg',
        description: 'Skoda Octavia A5 с небольшим пробегом. Чешская сборка, экономичный двигатель.'
    }
];

// Категории запчастей
const partCategories = [
    'Двигатель и компоненты',
    'Трансмиссия',
    'Ходовая часть',
    'Электроника',
    'Кузовные детали',
    'Оптика',
    'Салон',
    'Тормозная система',
    'Охлаждение',
    'Выхлопная система'
];

// Функция для генерации случайных запчастей для автомобиля
const generatePartsForCar = (car, carId) => {
    const parts = [];
    const partsCount = Math.floor(Math.random() * 10) + 5; // 5-15 запчастей на авто
    
    // Генерируем запчасти из разных категорий
    for (let i = 0; i < partsCount; i++) {
        const categoryIndex = Math.floor(Math.random() * partCategories.length);
        const category = partCategories[categoryIndex];
        
        let name, price, condition;
        
        // Определяем название и цену в зависимости от категории
        switch(category) {
            case 'Двигатель и компоненты':
                name = ['Двигатель в сборе', 'ГБЦ', 'Турбина', 'Коленвал', 'ТНВД', 'Стартер', 'Генератор'][Math.floor(Math.random() * 7)];
                price = Math.floor(Math.random() * 2000) + 800;
                break;
            case 'Трансмиссия':
                name = ['КПП', 'Сцепление', 'Маховик', 'Карданный вал', 'Редуктор', 'Раздатка'][Math.floor(Math.random() * 6)];
                price = Math.floor(Math.random() * 1000) + 500;
                break;
            case 'Ходовая часть':
                name = ['Амортизатор', 'Пружина', 'Рычаг', 'Ступица', 'Подшипник', 'Стойка стабилизатора'][Math.floor(Math.random() * 6)];
                price = Math.floor(Math.random() * 200) + 50;
                break;
            case 'Электроника':
                name = ['Блок управления двигателем', 'Приборная панель', 'Блок комфорта', 'Иммобилайзер', 'Датчик ABS'][Math.floor(Math.random() * 5)];
                price = Math.floor(Math.random() * 300) + 100;
                break;
            case 'Кузовные детали':
                name = ['Капот', 'Дверь', 'Крыло', 'Бампер', 'Крышка багажника', 'Решетка радиатора'][Math.floor(Math.random() * 6)];
                price = Math.floor(Math.random() * 400) + 150;
                break;
            case 'Оптика':
                name = ['Фара', 'Фонарь', 'Противотуманная фара', 'Поворотник', 'Фара ксенон'][Math.floor(Math.random() * 5)];
                price = Math.floor(Math.random() * 250) + 100;
                break;
            case 'Салон':
                name = ['Сиденье', 'Торпедо', 'Руль', 'Подушка безопасности', 'Мультимедиа', 'Обшивка двери'][Math.floor(Math.random() * 6)];
                price = Math.floor(Math.random() * 350) + 100;
                break;
            default:
                name = ['Тормозной диск', 'Радиатор', 'Глушитель', 'Катализатор', 'Рулевая рейка'][Math.floor(Math.random() * 5)];
                price = Math.floor(Math.random() * 200) + 80;
        }
        
        // Определяем состояние
        condition = ['Отличное', 'Отличное', 'Хорошее', 'Хорошее', 'Хорошее', 'Удовлетворительное'][Math.floor(Math.random() * 6)];
        
        // Генерируем артикул
        const brandCode = car.brand.substring(0, 3).toUpperCase();
        const modelCode = car.model.replace(/\s+/g, '-').toUpperCase();
        const partCode = name.replace(/\s+/g, '-').toUpperCase();
        const articleNumber = `${brandCode}-${modelCode}-${partCode}-${car.year}`;
        
        // Определяем особенности для наиболее популярных запчастей
        const featured = Math.random() < 0.2; // 20% шанс, что запчасть будет отмечена как популярная
        
        // Изображения (можно будет заменить на реальные)
        const images = [`${category.toLowerCase().replace(/\s+/g, '-')}-${Math.floor(Math.random() * 5) + 1}.jpg`];
        
        // Описание
        const descriptions = [
            `Оригинальная ${name.toLowerCase()} от ${car.brand} ${car.model} ${car.year} года в ${condition.toLowerCase()} состоянии.`,
            `${name} для ${car.brand} ${car.model}. Состояние: ${condition.toLowerCase()}.`,
            `Б/У ${name.toLowerCase()} с автомобиля ${car.brand} ${car.model} ${car.year} года.`
        ];
        const description = descriptions[Math.floor(Math.random() * descriptions.length)];
        
        parts.push({
            name,
            car: carId,
            category,
            condition,
            price,
            articleNumber: `${articleNumber}-${Math.floor(Math.random() * 1000)}`,
            images,
            description,
            inStock: true,
            featured
        });
    }
    
    return parts;
};

// Очистка базы данных и заполнение новыми данными
const seedDatabase = async () => {
    try {
        // Очистка базы данных
        await Car.deleteMany({});
        await Part.deleteMany({});
        console.log('База данных очищена');
        
        // Добавление автомобилей
        const savedCars = await Car.insertMany(carsData);
        console.log(`Добавлено ${savedCars.length} автомобилей`);
        
        // Генерация и добавление запчастей для каждого автомобиля
        let allParts = [];
        for (const car of savedCars) {
            const carParts = generatePartsForCar(car, car._id);
            allParts = [...allParts, ...carParts];
        }
        
        const savedParts = await Part.insertMany(allParts);
        console.log(`Добавлено ${savedParts.length} запчастей`);
        
        console.log('База данных успешно заполнена!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Ошибка при заполнении базы данных:', error);
        process.exit(1);
    }
};

// Запуск заполнения базы данных
seedDatabase();