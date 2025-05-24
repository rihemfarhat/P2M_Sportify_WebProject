const jwt = require('jsonwebtoken');

const authMiddleware = () => {
  return (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: 'Token manquant, accès interdit' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // ✅ Ici, tu accèdes à decoded.id
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token invalide' });
    }
  };
};

module.exports = authMiddleware;
