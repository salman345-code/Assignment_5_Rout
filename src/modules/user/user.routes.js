// سؤال 4 — Get user by PK excluding role
import { Router } from "express";
import {
  signUp,
  createOrUpdateUser,
  getUserByEmail,
  getUserById,
} from "./user.controller.js";

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.get("/by-email", getUserByEmail); 
userRouter.get("/:id", getUserById);
userRouter.put("/:id", createOrUpdateUser);

export default userRouter;

