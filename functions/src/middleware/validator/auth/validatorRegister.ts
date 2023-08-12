import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { ApiError } from '../../../utils/response/ApiError';

export const validatorRegister = (req: Request, res: Response, next: NextFunction) => {
  let { email, password, confirmPassword, acceptTerms } = req.body;
  const errorsValidation = [];

  email = !email ? '' : email;
  password = !password ? '' : password;
  confirmPassword = !confirmPassword ? '' : confirmPassword;
  acceptTerms = !acceptTerms ? '' : acceptTerms;

  if (!validator.isEmail(email)) {
    errorsValidation.push({ email: 'Email is invalid' });
  }

  if (validator.isEmpty(email)) {
    errorsValidation.push({ email: 'Email is required' });
  }

  if (validator.isEmpty(password)) {
    errorsValidation.push({ password: 'Password is required' });
  }

  if (!validator.isLength(password, { min: 6 })) {
    errorsValidation.push({ password: 'Password must be at least 6 character' });
  }

  if (validator.isEmpty(confirmPassword)) {
    errorsValidation.push({ confirmPassword: 'Password confirmation is required' });
  }

  if (!validator.equals(password, confirmPassword)) {
    errorsValidation.push({ confirmPassword: 'Password confirmation doest not match' });
  }

  if (validator.isEmpty(acceptTerms)) {
    errorsValidation.push({ acceptTerms: 'Accept terms is required' });
  }

  if (!validator.toBoolean(acceptTerms, true)) {
    errorsValidation.push({ acceptTerms: 'Accept terms must be accepted' });
  }

  if (errorsValidation.length !== 0) {
    return next(new ApiError(422, 'Register validation error', errorsValidation));
  }
  return next();
};
