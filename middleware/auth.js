const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ success: false, message: 'Not authorized, You must be Logged In to see the Content or execute Queries' });
};

module.exports = auth;