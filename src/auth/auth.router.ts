import AuthController from './auth.controller'
import { Router } from "express";

const AuthModuleRoutes = Router();

const auth = new AuthController();

AuthModuleRoutes.post("/register", (req, res) => auth.register(req, res));
AuthModuleRoutes.post("/login", (req, res) => auth.login(req, res));


export default AuthModuleRoutes;
