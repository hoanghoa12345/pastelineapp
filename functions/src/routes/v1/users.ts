import { me } from '../../controllers/users';
import { Router } from 'express';
import { checkJwt } from '../../middleware/checkJwt';
import { validatorLogin } from 'middleware/validator/auth/validatorLogin';
import { login } from '../../controllers/auth';

const router = Router();

router.get('/me', [checkJwt], me);
router.post('/signin', [validatorLogin], login);

export default router;
