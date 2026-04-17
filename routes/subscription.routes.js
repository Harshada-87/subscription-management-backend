import {Router} from 'express'

const subsriptionRouter = Router();

subsriptionRouter.get('/', (req, res)=> res.send({message: "Get all subsciptions"}))

export default subsriptionRouter;