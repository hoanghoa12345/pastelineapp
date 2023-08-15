import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { ApiError } from '../../../utils/response/ApiError';

export const validatorEdit = (req: Request, res: Response, next: NextFunction) => {
    let {email, name, photoUrl, locale, theme} = req.body;

    const errorsValidation = [];

    email = email ? email : '';
    name = name ? name : '';
    photoUrl = photoUrl ? photoUrl : '';
    locale = locale ? locale : '';
    theme = theme ? theme : '';

    if(validator.isEmpty(email)) {
        errorsValidation.push('email is required');
    }
    if(!validator.isEmail(email)) {
        errorsValidation.push('email is invalid');
    }
    if(validator.isEmpty(name)) {
        errorsValidation.push('name is required');
    }
    if(validator.isEmpty(photoUrl)) {
        errorsValidation.push('photoUrl is required');
    }
    if(validator.isEmpty(locale)) {
        errorsValidation.push('locale is required');
    }
    if(validator.isEmpty(theme)) {
        errorsValidation.push('theme is required');
    }
    if(errorsValidation.length > 0) {
        return next(ApiError.badRequest('Edit validation error', errorsValidation));
    }
    return next();    
}

