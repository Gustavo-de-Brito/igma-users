import { SendUser } from '../types/userTypes';
import ValidateCpf from '../utils/CpfValidation';
import { ErrorUtils } from '../utils/errorUtils';

class UserService {  
  public registerUser(newUser: SendUser) {
    this.cpfValidation(newUser.cpf);
  }

  private cpfValidation(cpf: string):void {
    const cpfForValidation = new ValidateCpf(cpf);

    if(!cpfForValidation.verifyCpf()) {
      throw ErrorUtils.unprocessableError('o CPF passado é inválido');
    }
  }
}

export default new UserService();