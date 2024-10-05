const Item = require('../models/item');

exports.getAllItems = async (req, res, next) => {
    try {
        const items = await Item.find();
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        next(error);
    }
};

exports.getItemById = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        next(error);
    }
};

exports.createItem = async (req, res, next) => {
    try {
        const item = await Item.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        next(error);
    }
};

exports.updateItem = async (req, res, next) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        next(error);
    }
};

exports.deleteItem = async (req, res, next) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }
        res.status(204).json({ success: true, data: null });
    } catch (error) {
        next(error);
    }
};