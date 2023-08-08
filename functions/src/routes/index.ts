import { Router, Response, Request } from 'express';
import v1 from './v1';

const router = Router();

router.use('/api/v1', v1);
router.get('/', (req: Request, res: Response) => {
  res.onSuccess(200, 'Server is running...', { version: '1.0.0' });
});

export default router;
