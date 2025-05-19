// controllers/partController.js - Контроллеры для запчастей
const Part = require('../models/Part');
const Car = require('../models/Car');

// Получить все запчасти
exports.getAllParts = async (req, res) => {
    try {
        const parts = await Part.find({ inStock: true })
            .populate('car', 'brand model year')
            .sort({ featured: -1, createdAt: -1 });
            
        res.json({
            success: true,
            count: parts.length,
            data: parts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка при получении списка запчастей',
            error: error.message
        });
    }
};

// Получить запчасть по ID
exports.getPartById = async (req, res) => {
    try {
        const part = await Part.findById(req.params.id).populate('car');
        
        if (!part) {
            return res.status(404).json({
                success: false,
                message: 'Запчасть не найдена'
            });
        }
        
        res.json({
            success: true,
            data: part
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка при получении запчасти',
            error: error.message
        });
    }
};

// Создать новую запчасть
exports.createPart = async (req, res) => {
    try {
        // Проверяем существование автомобиля
        const car = await Car.findById(req.body.car);
        if (!car) {
            return res.status(404).json({
                success: false,
                message: 'Автомобиль не найден'
            });
        }
        
        const newPart = new Part(req.body);
        const savedPart = await newPart.save();
        
        res.status(201).json({
            success: true,
            data: savedPart
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Ошибка при создании запчасти',
            error: error.message
        });
    }
};

// Обновить запчасть
exports.updatePart = async (req, res) => {
    try {
        // Если изменяется автомобиль, проверяем его существование
        if (req.body.car) {
            const car = await Car.findById(req.body.car);
            if (!car) {
                return res.status(404).json({
                    success: false,
                    message: 'Автомобиль не найден'
                });
            }
        }
        
        const updatedPart = await Part.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        ).populate('car');
        
        if (!updatedPart) {
            return res.status(404).json({
                success: false,
                message: 'Запчасть не найдена'
            });
        }
        
        res.json({
            success: true,
            data: updatedPart
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Ошибка при обновлении запчасти',
            error: error.message
        });
    }
};

// Удалить запчасть
exports.deletePart = async (req, res) => {
    try {
        const part = await Part.findByIdAndDelete(req.params.id);
        
        if (!part) {
            return res.status(404).json({
                success: false,
                message: 'Запчасть не найдена'
            });
        }
        
        res.json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка при удалении запчасти',
            error: error.message
        });
    }
};

// Поиск запчастей по параметрам
exports.searchParts = async (req, res) => {
    try {
        const { brand, model, part, category, year } = req.query;
        let query = { inStock: true };
        
        // Если есть параметры поиска по автомобилю, найдем соответствующие авто
        if (brand || model || year) {
            const carQuery = {};
            if (brand) carQuery.brand = brand;
            if (model) carQuery.model = model;
            if (year) carQuery.year = year;
            
            const cars = await Car.find(carQuery).select('_id');
            const carIds = cars.map(car => car._id);
            
            if (carIds.length > 0) {
                query.car = { $in: carIds };
            } else {
                // Если нет подходящих автомобилей, возвращаем пустой результат
                return res.json({
                    success: true,
                    count: 0,
                    data: []
                });
            }
        }
        
        // Поиск по названию запчасти
        if (part) {
            query.$text = { $search: part };
        }
        
        // Поиск по категории
        if (category) {
            query.category = category;
        }
        
        const parts = await Part.find(query)
            .populate('car', 'brand model year')
            .sort({ score: { $meta: 'textScore' }, featured: -1 });
        
        res.json({
            success: true,
            count: parts.length,
            data: parts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка при поиске запчастей',
            error: error.message
        });
    }
};

// Получить запчасти для конкретного автомобиля
exports.getPartsByCar = async (req, res) => {
    try {
        const parts = await Part.find({ 
            car: req.params.carId,
            inStock: true 
        }).populate('car', 'brand model year');
        
        res.json({
            success: true,
            count: parts.length,
            data: parts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка при получении запчастей для автомобиля',
            error: error.message
        });
    }
};