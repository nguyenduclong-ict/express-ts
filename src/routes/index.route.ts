import { Router } from 'express';
import { handleSayHello } from './index.handle';
const router = Router();

router.get('/', handleSayHello);

export default router;
