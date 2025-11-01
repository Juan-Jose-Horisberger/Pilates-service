const authMiddleware = (req, res, next) => {
    console.log("req.user.rol: ", req.user.rol)
    if (req.user && req.user.rol === 'ADMIN') {
        return next();
    }
    res.status(403).send('Access denied. Admins only.');
}

module.exports = {
    authMiddleware
}