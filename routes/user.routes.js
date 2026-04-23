import {Router} from 'express'
import { getUser, getUsers } from '../controllers/user.controller.js';
import authorizeUser from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', getUsers)
userRouter.get('/:id', authorizeUser, getUser)


export default userRouter;