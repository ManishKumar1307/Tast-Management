const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth');
const tasksRouter = require('./routes/tasks');
const { authenticateToken } = require('./middleware/auth');

const app = express();

// CORS configuration for your frontend
const corsOptions = {
    origin: [
        'https://task-management-frontend-six-vert.vercel.app',
        'http://localhost:3000',  // For local development
        'http://localhost:4000'    // For testing
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRouter);
app.use('/tasks', authenticateToken, tasksRouter);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Backend is running',
        frontend: 'https://task-management-frontend-six-vert.vercel.app'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'Internal server error'
    });
});

module.exports = app;