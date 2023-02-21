import { faker } from '@faker-js/faker';
import { DatabaseUser, SendUser } from '../../src/types/userTypes';
import cpfFactory from './cpfFactory';

class UserFactory {
  public async generateUser(): Promise<SendUser> {
    const birthday: string = this.formatDateMonthFirst(String(faker.date.birthdate()));
  
    return {
      name: faker.name.fullName(),
      cpf: cpfFactory.createValidCpf(),
      birthday
    };
  }

  public async generateDbUser(): Promise<DatabaseUser> {
    const birthday: string = this.formatDateDayFirst(String(faker.date.birthdate()));

    return {
      id: faker.datatype.number(),
      name: faker.name.fullName(),
      cpf: cpfFactory.createValidCpf(),
      birthday
    };
  }

  public async generateInvalidCpfUser(): Promise<SendUser> {
    const birthday: string = this.formatDateMonthFirst(String(faker.date.birthdate()));

    return {
      name: faker.name.fullName(),
      cpf: cpfFactory.createInvalidCpf(),
      birthday
    };
  }

  private formatDateMonthFirst(date: string): string {
    const birthday = new Date(date);
    const formatedBirthday: string =  ((birthday.getMonth() + 1) + '-' +
      birthday.getDate + '-' + birthday.getFullYear()
    );

    return formatedBirthday;
  }

  private formatDateDayFirst(date: string): string {
    const birthday = new Date(date);
    const formatedBirthday: string =  (birthday.getDate() + '-' +
      (birthday.getMonth() + 1) + '-' + birthday.getFullYear()
    );

    return formatedBirthday;
  }
}

export default new UserFactory();