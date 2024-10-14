const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = errors.array().map(err => err.msg);
        return res.status(400).json({
            success: false,
            error: extractedErrors.length === 1 ? extractedErrors[0] : extractedErrors,
        });
    }
    next();
};

module.exports = validate;
