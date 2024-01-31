import * as Joi from 'joi';

const joiValidateLogin = (input: Record<string, string>) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(input);
};

export default joiValidateLogin;
