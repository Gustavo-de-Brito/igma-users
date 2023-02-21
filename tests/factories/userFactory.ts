import { faker } from '@faker-js/faker';
import { DatabaseUser, SendUser } from '../../src/types/userTypes';
import cpfFactory from './cpfFactory';

class UserFactory {
  public async generateUser(): Promise<SendUser> {
    return {
      name: faker.name.fullName(),
      cpf: cpfFactory.createValidCpf(),
      birthday: String(faker.date.birthdate())
    };
  }

  public async generateDbUser(): Promise<DatabaseUser> {
    return {
      id: faker.datatype.number(),
      name: faker.name.fullName(),
      cpf: cpfFactory.createValidCpf(),
      birthday: String(faker.date.birthdate())
    };
  }

  public async generateInvalidCpfUser(): Promise<SendUser> {
    return {
      name: faker.name.fullName(),
      cpf: cpfFactory.createInvalidCpf(),
      birthday: String(faker.date.birthdate())
    };
  }
}

export default new UserFactory();