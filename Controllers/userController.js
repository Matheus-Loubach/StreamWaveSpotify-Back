const User = require("../Models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");



//Genenate user token
const GenerateToken = (id) => {
    return jwt.sign({ id }, 'KS1486735ANFSAN36454BFGSAF45471PKPEKGPSAGK1454EDGG', {
        expiresIn: "7d"
    });
};



const ServiceControllerUser = {

    // post
    register: async (req, res) => {

        const { name, email, password, passwordconf } = req.body;

        const user = await User.findOne({ name });
        const emailExists = await User.findOne({ email });

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

        if (password !== passwordconf) {
            return res.status(422).json({ error: "As senhas não correspondem" });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        try {

            //Create User
            const Users = {
                name,
                email,
                password: passwordHash,
            };

            const NewUser = await User.create(Users)

            if (!NewUser) {
                return res.status(422).json({ errors: ["Houver um erro,tente novamente mais tarde"] })

            }
            //return success
            res.status(201).json({ message: "Cadastro feito com sucesso" });

        } catch (error) {
            console.log(`Erro post ${error}`);
        }
    },

    // rota para login
    login: async (req, res) => {
        const { name, password } = req.body;
        res.setHeader('Access-Control-Allow-Origin', '*');
        let user = await User.findOne({ name });

        if (!user) {
            return res.status(400).json({ msg: "Usuário não encontrado" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Senha incorreta" });
        }

        //return user with token
        res.status(201).json({
            _id: user._id,
            name: user.name,
            token: GenerateToken(user._id),
        })

    },


};

module.exports = ServiceControllerUser;