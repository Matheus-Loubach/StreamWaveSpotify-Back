const User = require("../Models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const recentTrackSchema = require("../Models/recentTrack");
const FavoriteMusic = require("../Models/FavoriteMusic");

//Genenate user token
const GenerateToken = (id) => {
    return jwt.sign({ id }, 'KS1486735ANFSAN36454BFGSAF45471PKPEKGPSAGK1454EDGG', {
        expiresIn: "7d"
    });
};

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

    //get curret logged in user/Faz a validação do token para confirmar a autenticação
    getcurrentUser: async (req, res) => {
        const user = req.user;
        res.status(200).json(user);
    },

    //enviar as musicas para o banco de dados
    recentsMusicsUser: async (req, res) => {
        try {
            const { userId, name, album, artists } = req.body;
            console.log('algo?',userId);
            //Create Favorites
            const Musics = {
                userId,
                name,
                album,
                artists,
            };

            const NewUser = await recentTrackSchema.create(Musics)

            if (!NewUser) {
                return res.status(422).json({ errors: ["Houver um erro,tente novamente mais tarde"] })

            }
            //return success
            res.status(201).json("Cadastro feito com sucesso");


        } catch (err) {
            console.error(err);
            res.status(500).send('Internal server error');
        }
    },

    //FavoriteMusic
    favoriteMusic: async (req, res) => {
        console.log('reste', req);
        try {
            const { userId, name, album, artists, id } = req.body;

            //Create Favorites
            const MusicsFavorites = {
                userId,
                id,
                name,
                album,
                artists,
            };

            const NewUser = await FavoriteMusic.create(MusicsFavorites)

            if (!NewUser) {
                return res.status(422).json({ errors: ["Houver um erro,tente novamente mais tarde"] })

            }
            //return success
            res.status(201).json({ message: "Musica Favoritada" });


        } catch (err) {
            console.error(err);
            res.status(500).send('Internal server error');
        }
    },

    //Obtém as musicas recentes do usuario
    recentMusics: async (req, res) => {
        const MAX_RECENT_TRACKS = 10; // Define o limite máximo de músicas recentes
        const userId = req.user._id.toString();
  
        try {
            // Encontra as músicas do usuário ordenadas pela data de criação (da mais recente para a mais antiga)
            const latestMusics = await recentTrackSchema.find({ userId }).sort('-createdAt');
            console.log('teste', latestMusics);
            // Remove músicas excedentes, mantendo apenas as MAX_RECENT_TRACKS mais recentes
            if (latestMusics.length > MAX_RECENT_TRACKS) {
                const tracksToDelete = latestMusics.slice(MAX_RECENT_TRACKS); // Seleciona as músicas mais antigas para deletar
                await recentTrackSchema.deleteMany({ _id: { $in: tracksToDelete.map(t => t._id) } }); // Deleta as músicas excedentes do banco de dados
                latestMusics.splice(MAX_RECENT_TRACKS); // Remove as músicas excedentes da lista
            }

            res.json(latestMusics);
        } catch (error) {
            res.status(500).json({ error: 'Não foi possível buscar as músicas recentes.' });
        }
    },

    //Get para buscar as musicas favoritas do usuario
    favoriteMusicsGet: async (req, res) => {
        const MAX_FAVORITE_TRACKS = 10; // Define o limite máximo de músicas recentes
        const userId = req.user._id.toString();


        try {
            const favoritesMusics = await FavoriteMusic.find({ userId }).sort('-createdAt');

            if (favoritesMusics.length > MAX_FAVORITE_TRACKS) {
                const tracksToDelete = favoritesMusics.slice(MAX_FAVORITE_TRACKS); // Seleciona as músicas mais antigas para deletar
                await FavoriteMusic.deleteMany({ _id: { $in: tracksToDelete.map(t => t._id) } }); // Deleta as músicas excedentes do banco de dados
                favoritesMusics.splice(MAX_FAVORITE_TRACKS); // Remove as músicas excedentes da lista
            }

            res.json(favoritesMusics);
        } catch (error) {
            res.status(500).json({ error: 'Não foi possível buscar as músicas Favoritas.' });
        }
    },


    deleteMusicFavorite: async (req, res) => {
        const id = req.params.id; //id da musica a ser excluida
        console.log('idMusica', req.params.id);
        //Procura pela musica
        try {
            const deletMusic = await FavoriteMusic.findByIddAndDelete(id);
            if (!deletMusic) {
                return res.status(404).json({ error: "Música não encontrada" })
            }

            //return success
            res.status(204).json({ message: "Sucesso ao excluir a música" });

        } catch (error) {
            res.status(204).json({ error: "Erro ao excluir a música", error });

        }

    },
};

module.exports = ServiceController;