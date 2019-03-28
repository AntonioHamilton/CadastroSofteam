const request = require('supertest');
const app = require('../../index');
const User = require('../../models/userModel');

beforeAll(() => User.remove({}));

describe('Users', () => {

    describe('Create', () => {
        test('Should create a user', async () => {
            const response = await request(app).post('/user').send(
                {
                    cpf: 8039839564,
                    nome:'antonio hamilton',
                    telefone:79998352069,
                    cep:'49095-650',
                    numero: 22,
                    complemento: 'teste'
                }
            );
            expect(response.status).toBe(201);
        });
        test('Should not create a user with the same cpf', async () => {
            const response = await request(app).post('/user').send (
                {
                    cpf: 8039839564,
                    nome:'antonio hamilton'
                }
            );
            expect(response.status).toBe(500);
        });
        test('should not create a user without cpf', async () => {
            const response = await request(app).post('/user').send(
                {
                    nome:'antonio hamilton',
                    telefone:79998352069,
                    cep:'49095-650',
                    numero: 22,
                    complemento: 'teste'
                }
            );
            expect(response.status).toBe(500);
        });

        describe('Find', () => {
            test('Should find a user', async () => {
                const user = await User.create(
                    {
                        cpf: 123,
                        nome: 'Qualquer coisa'
                    }
                );
                const response = await request(app).get('/user/123');
                expect(response.status).toBe(200);
            });
        });
    });
});