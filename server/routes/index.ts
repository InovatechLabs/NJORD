import {Router} from 'express';
import { register, login, logout, getUserInfo, updateUserInfo } from '../controllers/userController';
import { authenticate } from '../middlewares/verifyToken';

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/info", authenticate, getUserInfo);
userRouter.put("/update", authenticate, updateUserInfo);

// Rota usada pelo contexto de autenticaçao para validar a sessão do usuario
userRouter.get('/verify', authenticate, (req, res) => {
    res.status(200).json({ authenticated: true });
  });

export default userRouter;