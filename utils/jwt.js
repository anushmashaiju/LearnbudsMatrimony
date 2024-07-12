const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'your-secret-key';

const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email, name: user.name }, secretKey, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };
