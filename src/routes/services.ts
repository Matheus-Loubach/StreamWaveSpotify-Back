import { Router } from "express";
import trackModuleRoutes from "../track/track.routes";
import AuthModuleRoutes from "../auth/auth.router";
import UserModuleRoutes from "../user/user.routes";


const AppRoutes = Router();

AppRoutes.use("/music", trackModuleRoutes);
AppRoutes.use("/user", UserModuleRoutes);
AppRoutes.use("/auth", AuthModuleRoutes);

export default AppRoutes;
