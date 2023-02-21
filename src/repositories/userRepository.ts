import connection from '../databases/postgres';
import { DatabaseUser, SendUser } from '../types/userTypes';

class UserRepository {
  public async findUserByCpf(cpf: string): Promise<DatabaseUser | undefined> {
    const { rows: [ user ] } = await connection.query(
      `
      SELECT * FROM users
      WHERE cpf = $1;
      `,
      [ cpf ]
    );

    return user;
  }

  public async addUser(user: SendUser): Promise<void> {
    await connection.query(
      `
      INSERT INTO users (name, cpf, birthday)
      VALUES ($1, $2, $3);
      `,
      [ user.name, user.cpf, user.birthday ]
    );
  }

  public async getUsersList(offset: number, limit: number): Promise<DatabaseUser[]> {
    const{ rows: users } = await connection.query(
      `
      SELECT * FROM users
      OFFSET $1
      LIMIT $2;
      `,
      [ offset, limit]
    );

    return users;
  }
}

export default new UserRepository();