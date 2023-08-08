import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { ApiError } from '../../../utils/response/ApiError';

export const validatorNote = (req: Request, res: Response, next: NextFunction) => {
  let { title, content } = req.body;

  const errorsValidation = [];

  title = !title ? '' : title;
  content = !content ? '' : content;

  if (validator.isEmpty(title)) {
    errorsValidation.push({ title: 'Title field is required' });
  }
  if (validator.isEmpty(content)) {
    errorsValidation.push({ content: 'Content field is required' });
  }
  if (errorsValidation.length !== 0) {
    return next(new ApiError(422, 'Note validation error', errorsValidation));
  }
  return next();
};
