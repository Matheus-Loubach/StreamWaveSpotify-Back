import { Router } from "express";
import AppRoutes from "./services";

const router = Router();

router.use("/api", AppRoutes);

export default router;
