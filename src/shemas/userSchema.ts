import joi from 'joi';

const userSchema = joi.object(
  {
    name: joi.string().required(),
    cpf: joi.string().min(11).max(14).required(),
    birthday: joi.date().greater('01-01-1900').less('now').required(),
  }
);

export default userSchema;