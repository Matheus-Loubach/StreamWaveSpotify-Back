import userModel from "./user.schema";

export default class userController {


  async index(req: any, res: any) {
    try {
      const services = await userModel.find();

      res.json(services);

    } catch (error) {
      console.error(`Erro get ${error}`);
    }
  }

  async getCurrentUser(req: any, res: any) {
    try { 
      
        const user = await userModel.findById(req.user.id); 
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        res.status(200).json(user); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
}

};

