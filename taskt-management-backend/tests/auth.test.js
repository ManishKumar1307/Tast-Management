const request = require('supertest');

const mockSupabase = {
    from: jest.fn(() => mockSupabase),
    select: jest.fn(() => mockSupabase),
    eq: jest.fn(() => mockSupabase),
    single: jest.fn(() => mockSupabase),
    insert: jest.fn(() => mockSupabase),
};

jest.mock('../src/supabaseClient', () => mockSupabase);

process.env.JWT_SECRET = 'test-secret';

const app = require('../src/app');

test('signup fails when email is invalid', async () => {
    const response = await request(app).post('/auth/signup').send({ email: 'wrong', password: 'password' });
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
});

test('login returns 401 for invalid credentials', async () => {
    mockSupabase.select.mockReturnThis();
    mockSupabase.eq.mockReturnThis();
    mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Not found' } });

    const response = await request(app).post('/auth/login').send({ email: 'test@example.com', password: 'wrongpassword' });
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Invalid email or password');
});
