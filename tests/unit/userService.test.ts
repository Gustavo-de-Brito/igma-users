import userFactory from '../factories/userFactory';
import userService from '../../src/services/userService';
import userRepository from '../../src/repositories/userRepository';
import { SendUser } from '../../src/types/userTypes';

describe('Test user service methods', () => {
  it('it should throw an error for invalid CPF', async () => {
    const newUser = await userFactory.generateInvalidCpfUser();

    const result = userService.registerUser(newUser);

    expect(result).rejects.toEqual({ type: 'unprocessable', message: 'o CPF passado é inválido'});
  });

  it('it should throw an error when a user with the same CPF registred',
    async () => {
      const newUser = await userFactory.generateUser();

      const registreredDbUser = await userFactory.generateDbUser();

      jest
        .spyOn(userRepository, 'findUserByCpf')
        .mockResolvedValue({...registreredDbUser, cpf: newUser.cpf});

      const result = userService.registerUser(newUser);

      expect(result).rejects.toEqual({ type: 'conflict', message: 'o cliente já está registrado'});
    }
  );

  it('it should call addUser function when passing through all validations',
    async () => {
      const newUser = await userFactory.generateUser();

      jest
        .spyOn(userRepository, 'findUserByCpf')
        .mockResolvedValue(undefined);
      
      jest
        .spyOn(userRepository, 'addUser')
        .mockResolvedValue( undefined );

      await userService.registerUser(newUser);

      expect(userRepository.addUser).toBeCalled();
    }
  );

  it('it should throw an error for invalid CPF', async () => {
    const newUser: SendUser = await userFactory.generateInvalidCpfUser();

    const result = userService.findUserByCpf(newUser.cpf);

    expect(result).rejects.toEqual({ type: 'unprocessable', message: 'o CPF passado é inválido'});
  });

  it('it should throw an error if the CPF is not registered', async () => {
    const newUser: SendUser = await userFactory.generateUser();

    jest
        .spyOn(userRepository, 'findUserByCpf')
        .mockResolvedValue(undefined);

    const result = userService.findUserByCpf(newUser.cpf);

    expect(result).rejects.toEqual({ type: 'not_found', message: 'Usuário não encontrado'});
  });

  it('it should throw an error if the CPF is not registered', async () => {
    const newUser = await userFactory.generateUser();

    jest
        .spyOn(userRepository, 'findUserByCpf')
        .mockResolvedValue({id: 1, ...newUser});

    const result = await userService.findUserByCpf(newUser.cpf);

    expect(result.cpf).toEqual(newUser.cpf);
  });
});