const { body, param } = require('express-validator');

exports.validateCreateItem = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 50 }).withMessage('Name cannot be more than 50 characters'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ max: 200 }).withMessage('Description cannot be more than 200 characters'),
    body('quantity')
        .notEmpty().withMessage('Quantity is required')
        .isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
];

exports.validateUpdateItem = [
    param('id')
        .isMongoId().withMessage('Invalid item ID'),
    body('name')
        .optional()
        .trim()
        .notEmpty().withMessage('Name cannot be empty')
        .isLength({ max: 50 }).withMessage('Name cannot be more than 50 characters'),
    body('description')
        .optional()
        .trim()
        .notEmpty().withMessage('Description cannot be empty')
        .isLength({ max: 200 }).withMessage('Description cannot be more than 200 characters'),
    body('quantity')
        .optional()
        .isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
];

exports.validateItemId = [
    param('id')
        .isMongoId().withMessage('Invalid item ID'),
];
