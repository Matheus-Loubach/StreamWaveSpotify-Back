const SpotifyWebApi = require('spotify-web-api-node');



// Configura a instância do cliente do Spotify
const spotifyApi = new SpotifyWebApi({
    clientId: '7abf8e1f2a1b461aa87992dff8336b4f',
    clientSecret: '85ddb0beec8b4d67a500dae7c4d7661d',
});

// Autentica a instância do cliente
spotifyApi.clientCredentialsGrant().then(
    function (data) {
        console.log('Token de acesso gerado com sucesso: ' + data.body['access_token']);
        spotifyApi.setAccessToken(data.body['access_token']);
        module.exports.spotifyAccessToken = data.body['access_token'];
    },
    function (err) {
        console.log('Erro ao gerar o token de acesso: ' + err.message);
    }
);

const ServiceController = {

    // Define uma rota GET que recebe o nome da música como um parâmetro de consulta na URL
    BarraPesquisa: async (req, res) => {
        const searchTerm = req.query.searchTerm;
        try {
            const data = await spotifyApi.searchTracks(searchTerm);
            const response = {
                accessToken: module.exports.spotifyAccessToken,
                searchResults: data.body
            };
            res.json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

  

}

module.exports = ServiceController;