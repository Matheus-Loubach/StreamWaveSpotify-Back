import { Router } from "express";
import userController from "./user.controller";
import authGuard from "../middleware/AuthGuard";

const UserModuleRoutes = Router();

const user = new userController();


UserModuleRoutes.get("/all", (req, res) => user.index(req, res));

UserModuleRoutes.get("/me", authGuard, (req, res) => user.getCurrentUser(req, res));


export default UserModuleRoutes;