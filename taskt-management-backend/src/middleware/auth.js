const jwt = require('jsonwebtoken');
const supabase = require('../supabaseClient');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is required in environment');
}

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Missing authorization token' });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);

        const { data: user, error } = await supabase
            .from('users')
            .select('id, email, role')
            .eq('id', payload.userId)
            .single();

        if (error || !user) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = { authenticateToken };
