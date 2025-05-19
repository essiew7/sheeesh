// models/Car.js - Модель для автомобилей
const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true
    },
    engine: {
        type: String,
        required: true,
        trim: true
    },
    transmission: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        default: 'default-car.jpg'
    },
    description: {
        type: String,
        trim: true
    },
    dismantledDate: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Car', CarSchema);
