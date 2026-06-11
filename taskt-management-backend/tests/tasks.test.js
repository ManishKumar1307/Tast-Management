const request = require('supertest');
const jwt = require('jsonwebtoken');

const mockSupabase = {
    from: jest.fn(() => mockSupabase),
    select: jest.fn(() => mockSupabase),
    eq: jest.fn(() => mockSupabase),
    single: jest.fn(() => mockSupabase),
    order: jest.fn(() => mockSupabase),
    range: jest.fn(() => mockSupabase),
};

jest.mock('../src/supabaseClient', () => mockSupabase);

process.env.JWT_SECRET = 'test-secret';

const app = require('../src/app');

test('task route requires authorization', async () => {
    const response = await request(app).get('/tasks');
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Missing authorization token');
});

test('task listing returns 200 with valid JWT and no tasks', async () => {
    const token = jwt.sign({ userId: '123e4567-e89b-12d3-a456-426614174000' }, 'test-secret', { expiresIn: '1d' });
    mockSupabase.single.mockResolvedValueOnce({
        data: { id: '123e4567-e89b-12d3-a456-426614174000', email: 'test@example.com', role: 'user' },
        error: null,
    });
    mockSupabase.select.mockReturnThis();
    mockSupabase.eq.mockReturnThis();
    mockSupabase.order.mockReturnThis();
    mockSupabase.range.mockResolvedValue({ data: [], count: 0, error: null });

    const response = await request(app).get('/tasks').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.tasks).toEqual([]);
    expect(response.body.total).toBe(0);
});
