import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { ApiError } from '../../../utils/response/ApiError';

export const validatorLogin = (req: Request, res: Response, next: NextFunction) => {
  let { email, password } = req.body;
  const errorsValidation = [];

  email = !email ? '' : email;
  password = !password ? '' : password;

  if (validator.isEmail(email)) {
    errorsValidation.push({ email: 'Email is invalid' });
  }
  if (validator.isEmpty(email)) {
    errorsValidation.push({ email: 'Email field is required' });
  }
  if (validator.isEmpty(password)) {
    errorsValidation.push({ password: 'Password field is required' });
  }
  if (errorsValidation.length !== 0) {
    return next(new ApiError(422, 'Login validation error', errorsValidation));
  }
  return next();
};
