import { me, edit, changePassword } from '../../controllers/users';
import { Router } from 'express';
import { checkJwt } from '../../middleware/checkJwt';
import { validatorLogin } from '../../middleware/validator/auth/validatorLogin';
import { validatorRegister } from '../../middleware/validator/auth/validatorRegister';
import { validatorEdit } from '../../middleware/validator/users/validatorEdit';
import {
  login,
  register,
  requestResetPassword,
  verify,
  confirmResetPassword,
  requestActive,
  refreshToken,
  logout,
} from '../../controllers/auth';

const router = Router();

router.get('/me', [checkJwt], me);
router.patch('/change-password', [checkJwt], changePassword);
router.patch('/', [checkJwt, validatorEdit], edit);
router.post('/signin', [validatorLogin], login);
router.post('/login', [validatorLogin], login);
router.post('/signup', [validatorRegister], register);
router.get('/verify', [], verify);
router.post('/forgot', [], requestResetPassword);
router.post('/reset', [], confirmResetPassword);
router.post('/send-verify', [], requestActive);
router.get('/refresh-token', [], refreshToken);
router.get('/logout', [], logout);

export default router;
