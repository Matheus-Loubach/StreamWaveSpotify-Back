import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import connDB from "./src/db/connection";
import router from "./src/routes/app.router";

const app = express();

app.use(cors());
app.use(express.json());

connDB();

// app.use(express.static(path.join(__dirname, "build")));
// app.get("*", (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.use("/", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
