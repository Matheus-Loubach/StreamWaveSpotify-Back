import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import userModel from "../user/user.schema";

const GenerateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d"
  });
};

export default class AuthController {

  async register(req: any, res: any) {

    const { name, email, password, passwordConf } = req.body;

    const user = await userModel.findOne({ name });
    const emailExists = await userModel.findOne({ email });

    if (user) {
      return res.status(422).json({ error: "Usuário já existe" });
    }

    if (emailExists) {
      return res.status(422).json({ error: "E-mail já existe" });
    }

    if (!name) {
      return res.status(422).json({ error: "Nome obrigatório" });
    }

    if (!email) {
      return res.status(422).json({ error: "E-mail Obrigatório" });
    }

    if (password !== passwordConf) {
      return res.status(422).json({ error: "As senhas não correspondem" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    try {

      const Users = {
        name,
        email,
        password: passwordHash,
      };

      const NewUser = await userModel.create(Users)

      if (!NewUser) {
        return res.status(422).json({ errors: ["Houver um erro,tente novamente mais tarde"] })

      }
      res.status(201).json({ message: "Cadastro feito com sucesso" });

    } catch (error) {
      console.log(`Erro post ${error}`);
    }
  }

  async login(req: any, res: any) {
    const { email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Usuário não encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Senha incorreta" });
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      token: GenerateToken(user._id),
    })

  }
}


