import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userModel from "../user/user.schema";

interface AuthenticatedRequest extends Request {
  user?: any;
}

const authGuard = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ errors: ["Acesso negado!"] });
      return;
    }

    const verified: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await userModel.findById(verified.id).select("-password");

    if (!user) {
      res.status(404).json({ errors: ["Usuário não encontrado."] });
      return;
    }

    res.locals.user = user; 
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errors: ["Token inválido ou expirado."] });
  }
};

export default authGuard;
