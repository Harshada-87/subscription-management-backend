import {Router} from 'express'

const userRouter = Router();

userRouter.get('/', (req, res)=> res.send({title:'GET all users'}))
userRouter.get('/:id', (req, res)=> res.send({title:'GET user details'}))


export default userRouter;