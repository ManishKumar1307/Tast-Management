const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const supabase = require('../supabaseClient');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is required in environment');
}

const createToken = (userId) => jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

router.post(
    '/signup',
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const { data: existingUser, error: existingError } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .single();

        if (existingError && existingError.code !== 'PGRST116') {
            return res.status(500).json({ error: 'Could not check existing user' });
        }

        if (existingUser) {
            return res.status(409).json({ error: 'Email is already registered' });
        }

        const { data, error } = await supabase.from('users').insert({ email, password: hashedPassword }).select('id, email, role').single();

        if (error) {
            return res.status(500).json({ error: 'Unable to register user' });
        }

        return res.status(201).json({ token: createToken(data.id), user: { id: data.id, email: data.email, role: data.role } });
    }
);

router.post(
    '/login',
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const { data: user, error } = await supabase.from('users').select('id, email, password, role').eq('email', email).single();

        if (error || !user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        return res.json({ token: createToken(user.id), user: { id: user.id, email: user.email, role: user.role } });
    }
);

module.exports = router;
