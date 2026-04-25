import { Router } from "express";
import authorizeUser from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";

const subsriptionRouter = Router();

subsriptionRouter.get("/", (req, res) =>
  res.send({ message: "Get all subsciptions" }),
);

subsriptionRouter.get("/:id", (req, res) =>
  res.send({ message: "Get subsciption details" }),
);

subsriptionRouter.post("/", authorizeUser, createSubscription);

subsriptionRouter.get('/user/:id', authorizeUser ,getUserSubscriptions);


export default subsriptionRouter;
