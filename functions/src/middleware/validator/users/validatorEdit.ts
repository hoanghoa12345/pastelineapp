import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { ApiError } from '../../../utils/response/ApiError';

export const validatorEdit = (req: Request, res: Response, next: NextFunction) => {
  const { email, name, photoUrl, locale, theme } = req.body;

  const errorsValidation = [];

  if (email && !validator.isEmail(email)) {
    errorsValidation.push('Email is invalid');  
  }
  if (name && !validator.isLength(name, { min: 2, max: 30 })) {
    errorsValidation.push('Name is invalid');
  }
  if (photoUrl && !validator.isURL(photoUrl, { require_protocol: true })) {
    errorsValidation.push('PhotoUrl is invalid');
  }
  if (locale && !validator.isLength(locale, { min: 2, max: 4 })) {
    errorsValidation.push('Locale is invalid');
  }
  if (theme && !validator.isIn(theme, ['light', 'dark'])) {
    errorsValidation.push('Theme is invalid');
  }

  if (errorsValidation.length > 0) {
    return next(ApiError.badRequest('Edit validation error', errorsValidation));
  }
  return next();
};
