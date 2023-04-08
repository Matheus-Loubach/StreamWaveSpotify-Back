const User = require("../Models/User")
const bcrypt = require('bcryptjs');



const ServiceController = {



    //post
    register: async (req, res) => {

        const { name, password } = req.body

        // validation
        if (!name) {
            return res.status(422).json({ msg: "Nome Obrigatorio" })
        }

        // Validação de senha
        if (!password || password.length < 8) {
            return res.status(422).json({ msg: "Senha é obrigatória e deve ter pelo menos 8 caracteres" })
        }

        // Verifica se o usuário já existe
        const useExists = await User.findOne({ name: name })
        if (useExists) {
            return res.status(422).json({ msg: "Usuário já existe" })
        }

        // Cria o hash da senha
        const salt = await bcrypt.genSalt(12)
        const passwordhash = await bcrypt.hash(password, salt)

        try {

            //Create User
            const estructMovies = {
                name,
                password: passwordhash,
            };

            //resposta db
            const response = await User.create(estructMovies)

            res.status(201).json({ response, msg: "Usuario Cadastrado com sucesso" });
        } catch (error) {
            console.log(`Erro post ${error}`);
        }
    },


    //post
    login: async (req, res) => {
        const { name, password } = req.body

        //validation
        if (!name) {
            return res.status(422).json({ msg: "Nome Obrigatorio" })
        }

        //check user
        const user = await User.findOne({ name: name })

        if (!user) {
            return res.status(404).json({ msg: "Usuário ou senha inválidos" })
        }

        //check pass match  //verify pass if is true or false for login
        const checkpass = await bcrypt.compare(password, user.password)

        if (!checkpass) {

            return res.status(422).json({ msg: "Usuário ou senha inválidos" })
        }

        try {

            if (checkpass && user) {


                return checkpass;
            } else {
                res.status(422).json(false);
            }

        } catch (error) {
            console.log(`Erro post ${error}`);
        }
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