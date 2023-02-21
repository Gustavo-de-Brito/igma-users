import userRepository from '../repositories/userRepository';
import { DatabaseUser, SendUser } from '../types/userTypes';
import ValidateCpf from '../utils/CpfValidation';
import { ErrorUtils } from '../utils/errorUtils';

class UserService {  
  public async registerUser(newUser: SendUser): Promise<void> {
    const formatedCpf: string = this.cpfValidation(newUser.cpf);
    await this.isUserRegistered(formatedCpf);

    const formatedBirthday: string = this.formatDate(newUser.birthday);

    const formatedUser = {
      ...newUser,
      cpf: formatedCpf,
      birthday: formatedBirthday
    };

    await userRepository.addUser(formatedUser);
  }

  public async findUserByCpf(cpf: string): Promise<DatabaseUser> {
    const formatedCpf: string = this.cpfValidation(cpf);
  
    const user: DatabaseUser | undefined = (
      await userRepository.findUserByCpf(formatedCpf)
    );
  
    if(!user) throw ErrorUtils.notFoundError('Usuário não encontrado');
  
    return {...user, birthday: this.formatDate(user.birthday)};
  }

  public async getUsers(offset: number, limit: number): Promise<DatabaseUser[]> {
    const users = await userRepository.getUsersList(offset, limit);

    if(users.length === 0) {
      throw ErrorUtils.notFoundError('as querys passadas não possuem dados correspondentes');
    }

    const formatedUsers: DatabaseUser[] = users.map(user => {
      return {
        ...user,
        birthday: this.formatDate(user.birthday)
      };
    });

    return formatedUsers;
  }

  private cpfValidation(cpf: string): string {
    const cpfForValidation = new ValidateCpf(cpf);
    cpfForValidation.formatCpf();

    if(!cpfForValidation.verifyCpf()) {
      throw ErrorUtils.unprocessableError('o CPF passado é inválido');
    }

    return cpfForValidation.formatedCpf;
  }

  private async isUserRegistered(cpf: string): Promise<void> {
    const registeredUser: DatabaseUser | undefined = (
      await userRepository.findUserByCpf(cpf)
    );

    if(registeredUser) {
      throw ErrorUtils.conflictError('o cliente já está registrado');
    }
  }

  private formatDate(date: string): string {
    const birthday = new Date(date);
    const formatedBirthday: string =  (birthday.getDate() + '-' +
      (birthday.getMonth() + 1) + '-' + birthday.getFullYear()
    );

    return formatedBirthday;
  }
}

export default new UserService();