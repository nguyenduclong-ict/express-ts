import { Router } from 'express';
import {
  handleRegister,
  handleLogin,
  handleGetInfo,
  handleLogout,
  handleLoginWithGoogle,
  handleLoginWithFacebook,
} from './index.handle';
import { authMiddleware } from '@/middlewares/auth';

const router = Router();
// ------- Declare router -------
router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.post('/google', handleLoginWithGoogle);
router.post('/facebook', handleLoginWithFacebook);
router.get('/me', authMiddleware(), handleGetInfo);
router.post('/logout', authMiddleware(), handleLogout);
// ------------------------------
export default router;
