const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    let statusCode = 500;
    let errorMessage = 'Server Error';

    if (err.name === 'ValidationError') {
        statusCode = 400;
        errorMessage = Object.values(err.errors).map(val => val.message);
    } else if (err.name === 'CastError') {
        statusCode = 400;
        errorMessage = 'Invalid ID format';
    } else if (err.code === 11000) {
        statusCode = 400;
        errorMessage = 'Duplicate field value entered';
    } else if (err.name === 'SyntaxError') {
        statusCode = 400;
        errorMessage = 'Malformed request';
    } else if (err.message === 'Not Found') {
        statusCode = 404;
        errorMessage = 'Resource not found';
    }

    res.status(statusCode).json({
        success: false,
        error: errorMessage
    });
};

module.exports = errorHandler;