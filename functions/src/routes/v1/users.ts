import { me } from '../../controllers/users';
import { Router } from 'express';
import { checkJwt } from '../../middleware/checkJwt';
import { validatorLogin } from '../../middleware/validator/auth/validatorLogin';
import { validatorRegister } from '../../middleware/validator/auth/validatorRegister';
import { login, register } from '../../controllers/auth';

const router = Router();

router.get('/me', [checkJwt], me);
router.post('/signin', [validatorLogin], login);
router.post('/signup', [validatorRegister], register);

export default router;
