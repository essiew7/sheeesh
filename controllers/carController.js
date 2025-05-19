// controllers/carController.js - Контроллеры для автомобилей
const Car = require('../models/Car');

// Получить все автомобили
exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.find({ isActive: true }).sort({ dismantledDate: -1 });
        res.json({
            success: true,
            count: cars.length,
            data: cars
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка при получении списка автомобилей',
            error: error.message
        });
    }
};

// Получить автомобиль по ID
exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        
        if (!car) {
            return res.status(404).json({
                success: false,
                message: 'Автомобиль не найден'
            });
        }
        
        res.json({
            success: true,
            data: car
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка при получении автомобиля',
            error: error.message
        });
    }
};

// Создать новый автомобиль
exports.createCar = async (req, res) => {
    try {
        const newCar = new Car(req.body);
        const savedCar = await newCar.save();
        
        res.status(201).json({
            success: true,
            data: savedCar
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Ошибка при создании автомобиля',
            error: error.message
        });
    }
};

// Обновить автомобиль
exports.updateCar = async (req, res) => {
    try {
        const updatedCar = await Car.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        
        if (!updatedCar) {
            return res.status(404).json({
                success: false,
                message: 'Автомобиль не найден'
            });
        }
        
        res.json({
            success: true,
            data: updatedCar
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Ошибка при обновлении автомобиля',
            error: error.message
        });
    }
};

// Удалить автомобиль
exports.deleteCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        
        if (!car) {
            return res.status(404).json({
                success: false,
                message: 'Автомобиль не найден'
            });
        }
        
        res.json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка при удалении автомобиля',
            error: error.message
        });
    }
};

// Поиск автомобилей по параметрам
exports.searchCars = async (req, res) => {
    try {
        const { brand, model, year } = req.query;
        const query = { isActive: true };
        
        if (brand) query.brand = brand;
        if (model) query.model = model;
        if (year) query.year = year;
        
        const cars = await Car.find(query).sort({ dismantledDate: -1 });
        
        res.json({
            success: true,
            count: cars.length,
            data: cars
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка при поиске автомобилей',
            error: error.message
        });
    }
};