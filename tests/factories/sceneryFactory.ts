import connection from "../../src/databases/postgres";
import { SendUser } from "../../src/types/userTypes";
import ValidateCpf from "../../src/utils/CpfValidation";

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
      VALUES ('${ formatedUser.name }', '${ formatedUser.cpf }',
      '${ formatedUser.birthday }');      
      `
    );
  }
}

export default new SceneryFactory();