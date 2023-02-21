import userRepository from '../repositories/userRepository';
import { DatabaseUser, SendUser } from '../types/userTypes';
import ValidateCpf from '../utils/CpfValidation';
import { ErrorUtils } from '../utils/errorUtils';

class UserService {  
  public async registerUser(newUser: SendUser): Promise<void> {
    const formatedCpf: string = this.cpfValidation(newUser.cpf);
    await this.isUserRegistered(formatedCpf);

    const birthday = new Date(newUser.birthday);
    const formatedBirthday: string =  birthday.getDate() + '-' + (birthday.getMonth() + 1) + 
    '-' + birthday.getFullYear() ;

    const formatedUser = {
      ...newUser,
      cpf: formatedCpf,
      birthday: formatedBirthday
    };

    await userRepository.addUser(formatedUser);
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
}

export default new UserService();