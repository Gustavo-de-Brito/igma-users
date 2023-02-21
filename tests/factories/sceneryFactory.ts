import connection from "../../src/databases/postgres";
import { SendUser } from "../../src/types/userTypes";
import ValidateCpf from "../../src/utils/CpfValidation";
import { faker } from '@faker-js/faker';
import userFactory from "./userFactory";

class SceneryFactory {
  public async registeredUser(user: SendUser) {
    const cpfForFormatting = new ValidateCpf(user.cpf);
    cpfForFormatting.formatCpf();

    const birthday = new Date(user.birthday);
    const formatedBirthday: string =  (birthday.getDate() + '-' +
      (birthday.getMonth() + 1) + '-' + birthday.getFullYear()
    );

    const formatedUser = {
      ...user,
      cpf: cpfForFormatting.formatedCpf,
      birthday: formatedBirthday
    };

    await connection.query(
      `
      INSERT INTO users (name, cpf, birthday)
      VALUES ($1, $2, $3);      
      `,
      [ formatedUser.name, formatedUser.cpf, formatedUser.birthday ]
    );
  }

  public async registeredUsers() {
    const qtdUser: number = faker.datatype.number({ min: 7, max:30 });

    for(let i = 0; i < qtdUser; i++) {
      const newUser: SendUser = await userFactory.generateUser();

      if(await this.isUserRegistered(newUser.cpf)) {
        i--;
      } else {
        await this.registeredUser(newUser);
      }
    }

    return qtdUser;
  }

  private async isUserRegistered(cpf: string) {
    const { rows: [ user ] } = await connection.query(
      `
      SELECT * FROM users
      WHERE cpf = $1;
      `,
      [ cpf ]
    );

    if(user) return true;

    return false
  }
}

export default new SceneryFactory();