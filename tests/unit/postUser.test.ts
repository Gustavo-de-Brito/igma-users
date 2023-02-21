import userFactory from '../factories/userFactory';
import userService from '../../src/services/userService';
import userRepository from '../../src/repositories/userRepository';
import { faker } from '@faker-js/faker';

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

  it('it should call addUser function if all validations get true',
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
});