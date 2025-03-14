import authGuard from "../middleware/AuthGuard";
import trackController from "./track.controller";
import { Router } from "express";
const track = new trackController();

const trackModuleRoutes = Router();

trackModuleRoutes.get("/recent/:userId", authGuard, (req, res) => track.findRecentMusicsUser(req, res));

trackModuleRoutes.post("/recent", authGuard, (req, res) => track.addRecentMusics(req, res));

trackModuleRoutes.get("/favorite/:userId", authGuard, (req, res) => track.findFavoriteMusics(req, res));

trackModuleRoutes.post("/favorite", authGuard, (req, res) => track.addFavoriteMusic(req, res));

trackModuleRoutes.delete("/favorite/:id", authGuard, (req, res) => track.removeMusicFavorite(req, res));

trackModuleRoutes.get("/search", authGuard, (req, res) => track.searchMusic(req,res));

export default trackModuleRoutes;
