import connection from '../databases/postgres';
import { DatabaseUser, SendUser } from '../types/userTypes';

class UserRepository {
  public async findUserByCpf(cpf: string): Promise<DatabaseUser> {
    const { rows: [ user ] } = await connection.query(
      `
      SELECT * FROM users
      WHERE cpf = '${cpf}';
      `
    );

    return user;
  }

  public async addUser(user: SendUser): Promise<void> {
    await connection.query(
      `
      INSERT INTO users (name, cpf, birthday)
      VALUES ('${ user.name }', '${ user.cpf }', '${ user.birthday }');      
      `
    );
  }
}

export default new UserRepository();