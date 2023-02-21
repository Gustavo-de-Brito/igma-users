import supertest from 'supertest';
import app from '../../src/app';
import connection from '../../src/databases/postgres';
import sceneryFactory from '../factories/sceneryFactory';
import userFactory from '../factories/userFactory';
import { faker } from '@faker-js/faker';

beforeEach(async () => {
  await connection.query(`TRUNCATE TABLE users CASCADE;`);
});

describe('tests for get users list with pagination', () => {
  it('it should answer with 422 if queries are not send', async () => {
    const qtdUsers: number = await sceneryFactory.registeredUsers();

    const response = await supertest(app).get(`/users`);

    expect(response.text).toBe('devem ser passadas as querys "offset" e "limit"');
    expect(response.statusCode).toBe(422);
  });

  it('it should answer with 422 if queries are not numbers', async () => {
    const qtdUsers: number = await sceneryFactory.registeredUsers();
    
    const offset: string = 'a';
    const limit: string = 'b';
    
    const response = await supertest(app).get(
      `/users?offset=${offset}&limit=${limit}`
    );
  
    expect(response.text).toBe('as querys "offset" e "limit" devem ser números');
    expect(response.statusCode).toBe(422);
  });

  it('it should answer with 422 if queries are not integers', async () => {
    const qtdUsers: number = await sceneryFactory.registeredUsers();
;
    const offset: number = Math.random();
    const limit: number = Math.random();

    const response = await supertest(app).get(
      `/users?offset=${offset}&limit=${limit}`
    );

    expect(response.text).toBe('as querys "offset" e "limit" devem ser inteiros');
    expect(response.statusCode).toBe(422);
  });

  it('it should answer with 404 if queries find no data', async () => {
    const qtdUsers: number = await sceneryFactory.registeredUsers();

    // const offset: number = faker.datatype.number({ min: 0, max: (qtdUsers - 1)});
    // const limit: number = faker.datatype.number({ min: 1, max: 30})
    const offset: number = faker.datatype.number({ min: qtdUsers, max: 31});
    const limit: number = faker.datatype.number({ min: 0, max: 30});

    const response = await supertest(app).get(
      `/users?offset=${offset}&limit=${limit}`
    );

    expect(response.text).toBe('as querys passadas não possuem dados correspondentes');
    expect(response.statusCode).toBe(404);
  });

  it('it should answer with 200 if there is any data in the array', async () => {
    const qtdUsers: number = await sceneryFactory.registeredUsers();

    const offset: number = faker.datatype.number({ min: 0, max: (qtdUsers - 1)});
    const limit: number = faker.datatype.number({ min: 1, max: 30})

    const response = await supertest(app).get(
      `/users?offset=${offset}&limit=${limit}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('it should answer with 200 and a array according to the sended queries',
    async () => {
      const qtdUsers: number = await sceneryFactory.registeredUsers();

      const offset: number = faker.datatype.number({ min: 0, max: (qtdUsers - 1)});
      const limit: number = faker.datatype.number({ min: 1, max: 30})

      const response = await supertest(app).get(
        `/users?offset=${offset}&limit=${limit}`
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeLessThanOrEqual(limit);
    }
  );
});

afterAll(async () => {
  await connection.end();
});