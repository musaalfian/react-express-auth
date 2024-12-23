import express from 'express';
import { getUsers, register, login, logout } from '../controllers/Users.js';
import verifyToken from '../middleware/VerifyToken.js';
import RefreshToken from '../controllers/RefreshToken.js';

const router = express.Router();
router.get('/users', verifyToken, getUsers);
router.post('/register', register);
router.post('/login', login);
router.get('/refresh-token', RefreshToken);
router.delete('/logout', logout);

export default router;
