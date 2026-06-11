const express = require('express');
const { body, validationResult, query, param } = require('express-validator');
const supabase = require('../supabaseClient');

const router = express.Router();

const createTaskValidators = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('status')
        .optional()
        .isIn(['pending', 'in-progress', 'completed'])
        .withMessage('Status must be pending, in-progress, or completed'),
    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Priority must be low, medium, or high'),
    body('due_date').optional().isISO8601().withMessage('Due date must be a valid ISO 8601 date'),
];

const updateTaskValidators = [
    body('title').optional().trim().notEmpty().withMessage('Title is required'),
    body('status')
        .optional()
        .isIn(['pending', 'in-progress', 'completed'])
        .withMessage('Status must be pending, in-progress, or completed'),
    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Priority must be low, medium, or high'),
    body('due_date').optional().isISO8601().withMessage('Due date must be a valid ISO 8601 date'),
];

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.post('/', createTaskValidators, validateRequest, async (req, res) => {
    const { title, description, status = 'pending', priority = 'medium', due_date } = req.body;
    const newTask = {
        user_id: req.user.id,
        title,
        description: description || '',
        status,
        priority,
        due_date: due_date || null,
    };

    const { data, error } = await supabase.from('tasks').insert(newTask).select('*').single();
    if (error) {
        return res.status(500).json({ error: 'Unable to create task' });
    }

    res.status(201).json(data);
});

router.get(
    '/',
    [
        query('status').optional().isIn(['pending', 'in-progress', 'completed']),
        query('page').optional().isInt({ min: 1 }).toInt(),
        query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
        query('sortBy').optional().isIn(['due_date', 'priority', 'created_at']),
        query('sortOrder').optional().isIn(['asc', 'desc']),
        query('search').optional().trim().isString(),
    ],
    validateRequest,
    async (req, res) => {
        const { status, page = 1, limit = 10, search, sortBy = 'created_at', sortOrder = 'desc' } = req.query;
        let queryBuilder = supabase.from('tasks').select('*', { count: 'exact' }).eq('user_id', req.user.id);

        if (status) {
            queryBuilder = queryBuilder.eq('status', status);
        }

        if (search) {
            queryBuilder = queryBuilder.ilike('title', `%${search}%`);
        }

        const orderBy = sortBy || 'created_at';
        queryBuilder = queryBuilder.order(orderBy, { ascending: sortOrder === 'asc' });

        const from = (page - 1) * limit;
        const to = from + limit - 1;
        queryBuilder = queryBuilder.range(from, to);

        const { data, count, error } = await queryBuilder;
        if (error) {
            return res.status(500).json({ error: 'Unable to fetch tasks' });
        }

        res.json({ tasks: data, total: count || 0, page, limit });
    }
);

router.get(
    '/:id',
    [param('id').isUUID().withMessage('Task ID must be a valid UUID')],
    validateRequest,
    async (req, res) => {
        const { id } = req.params;
        const { data, error } = await supabase.from('tasks').select('*').eq('id', id).eq('user_id', req.user.id).single();

        if (error || !data) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(data);
    }
);

router.patch(
    '/:id',
    [param('id').isUUID().withMessage('Task ID must be a valid UUID'), ...updateTaskValidators],
    validateRequest,
    async (req, res) => {
        const { id } = req.params;
        const updates = {};

        ['title', 'description', 'status', 'priority', 'due_date'].forEach((field) => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: 'No valid fields provided for update' });
        }

        updates.updated_at = new Date().toISOString();

        const { data, error } = await supabase
            .from('tasks')
            .update(updates)
            .eq('id', id)
            .eq('user_id', req.user.id)
            .select('*')
            .single();

        if (error || !data) {
            return res.status(404).json({ error: 'Task not found or cannot be updated' });
        }

        res.json(data);
    }
);

router.delete(
    '/:id',
    [param('id').isUUID().withMessage('Task ID must be a valid UUID')],
    validateRequest,
    async (req, res) => {
        const { id } = req.params;
        const { error } = await supabase.from('tasks').delete().eq('id', id).eq('user_id', req.user.id);

        if (error) {
            return res.status(404).json({ error: 'Task not found or cannot be deleted' });
        }

        res.status(204).send();
    }
);

module.exports = router;
