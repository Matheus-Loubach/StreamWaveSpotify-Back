const User = require("../Models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


const ServiceController = {

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

    
    //get
    getAll: async (req, res) => {
        try {
            const services = await User.find();

            res.json(services);

        } catch (error) {
            console.log(`Erro get ${error}`);
        }
    },

    //get individual
    // get: async (req, res) => {
    //     try {

    //         //id -> req === get url
    //         const id = req.params.id

    //         const service = await User.findById(id);

    //         if (!service) {
    //             res.status(404).json({ msg: "Filme não encontrado" })
    //             return;
    //         }

    //         res.json(service);

    //     } catch (error) {
    //         console.log(`Erro getIndividual ${error}`);
    //     }
    // },

    //Delete Movie
    // delete: async (req, res) => {
    //     try {

    //         const id = req.params.id;

    //         const service = await User.findById(id)

    //         if (!service) {
    //             res.status(404).json({ msg: "Filme não encontrado" })
    //             return;
    //         }

    //         const deleteMovie = await User.findByIdAndDelete(id);

    //         res.status(200).json({ msg: `Filme ${deleteMovie.name} deletado com sucesso` })


    //     } catch (error) {
    //         console.log(`Erro delete ${error}`);
    //     }
    // }

};

module.exports = ServiceController;