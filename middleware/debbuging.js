app.use((req, res, next) => {
    console.log('Incoming request cookies:', req.headers.cookie);
    console.log('Session ID:', req.sessionID);
    console.log('Is authenticated:', req.isAuthenticated());
    next();
});