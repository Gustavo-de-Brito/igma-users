import supertest from 'supertest';
import app from '../../src/app';
import connection from '../../src/databases/postgres';
import sceneryFactory from '../factories/sceneryFactory';
import userFactory from '../factories/userFactory';

beforeEach(async () => {
  await connection.query(`TRUNCATE TABLE users CASCADE;`);
});

describe('tests for find user using CPF route', () => {
  it('it should answer with 422 code when the cpf is invalid', async () => {
    const user = await userFactory.generateInvalidCpfUser();

    const response = await supertest(app).get(`/users/${user.cpf}`);

    expect(response.text).toBe('o CPF passado é inválido');
    expect(response.statusCode).toBe(422);
  });

  it('it should answer with 404 code when the cpf is not registered',
    async () => {
      const user = await userFactory.generateUser();

      const response = await supertest(app).get(`/users/${user.cpf}`);

      expect(response.text).toBe('Usuário não encontrado');
      expect(response.statusCode).toBe(404);
    }
  );

  it('it should answer with 200 code and the user data when passing through all validations',
    async () => {
      const user = await userFactory.generateUser();
      await sceneryFactory.registeredUser(user);

      const response = await supertest(app).get(`/users/${user.cpf}`);

      expect(response.body.cpf).toBe(user.cpf);
      expect(response.statusCode).toBe(200);
    }
  );
});

afterAll(async () => {
  await connection.end();
});