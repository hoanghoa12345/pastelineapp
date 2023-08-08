import { me } from 'controllers/users';
import { Router } from 'express';
import { checkJwt } from 'middleware/checkJwt';

const router = Router();

router.get('/me', [checkJwt], me)

export default router;