import { Router } from 'express';
import { checkJwt } from '../../middleware/checkJwt';
import { validatorNote } from '../../middleware/validator/notes/validatorNote';
import { destroy, edit, list, show, store } from '../../controllers/notes';

const router = Router();

router.get('/', [checkJwt], list);
router.get('/:noteId', [checkJwt], show);
router.post('/', [validatorNote, checkJwt], store);
router.patch('/:noteId', [validatorNote, checkJwt], edit);
router.delete('/:noteId', [checkJwt], destroy);

export default router;
