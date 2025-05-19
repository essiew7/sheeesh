// models/Part.js - Модель для запчастей
const mongoose = require('mongoose');

const PartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    condition: {
        type: String,
        required: true,
        enum: ['Отличное', 'Хорошее', 'Удовлетворительное', 'Требует ремонта'],
        default: 'Хорошее'
    },
    price: {
        type: Number,
        required: true
    },
    articleNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    images: [{
        type: String
    }],
    description: {
        type: String,
        trim: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Создание индекса для поиска
PartSchema.index({ 
    name: 'text', 
    description: 'text', 
    articleNumber: 'text' 
});

module.exports = mongoose.model('Part', PartSchema);
