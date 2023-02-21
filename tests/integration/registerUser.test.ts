import supertest from 'supertest';
import app from '../../src/app';
import connection from '../../src/databases/postgres';
import sceneryFactory from '../factories/sceneryFactory';
import userFactory from '../factories/userFactory';

beforeEach(async () => {
  await connection.query(`TRUNCATE TABLE users CASCADE;`);
});

describe('tests for register new users route', () => {
  it('it should answer with 422 code when the body is invalid', async () => {
    const body = {};

    const response = await supertest(app).post('/users').send(body);

    expect(response.statusCode).toBe(422);
  });

  it('it should answer with 422 code when the cpf is invalid', async () => {
    const body = await userFactory.generateInvalidCpfUser();

    const response = await supertest(app).post('/users').send(body);

    expect(response.text).toBe('o CPF passado é inválido');
    expect(response.statusCode).toBe(422);
  });

  it('it should answer with 409 code when the cpf is already registered',
    async () => {
      const body = await userFactory.generateUser();
      await sceneryFactory.registeredUser(body);

      const response = await supertest(app).post('/users').send(body);

      expect(response.text).toBe('o cliente já está registrado');
      expect(response.statusCode).toBe(409);
    }
  );

  it('it should answer with 201 code when passing through all validations',
    async () => {
      const body = await userFactory.generateUser();

      const response = await supertest(app).post('/users').send(body);

      expect(response.statusCode).toBe(201);
    }
  );
});

afterAll(async () => {
  await connection.end();
});