import * as Joi from 'joi';

const joiValidateLogin = (input: Record<string, string>) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required().messages({
      'any.required': 'INVALID_DATA|All fields must be filled',
      'string.email': 'UNAUTHORIZED|Invalid email or password',
    }),
    password: Joi.string().min(6).required().messages({
      'any.required': 'INVALID_DATA|All fields must be filled',
      'string.min': 'UNAUTHORIZED|Invalid email or password',
    }),
  });
  return schema.validate(input);
};

export default joiValidateLogin;
