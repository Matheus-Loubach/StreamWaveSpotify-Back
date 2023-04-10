## Funcionalidades do Back-end do Projeto StreamWave(clone do spotify)

# Pré-requisitos
- NodeJS e NPM instalados
- MongoDB instalado e em execução

# Tecnologias utilizadas:
- Node.js
- Express
- MongoDB com Mongoose
- bcryptjs para criptografia de senhas
- jsonwebtoken (JWT) para autenticação de usuários
- Middleware para autenticação de rotas

Execução
Inicie o servidor: npm run server

# Descrição das funcionalidades

- register: registra um novo usuário com nome, email e senha. Antes disso, verifica se já existe um usuário com o mesmo nome ou email e se as senhas digitadas correspondem. A senha é criptografada antes de ser armazenada no banco de dados. Retorna uma mensagem de sucesso em caso de cadastro realizado com sucesso ou um erro em caso contrário.
- login: verifica se um usuário com um determinado nome existe e, em caso afirmativo, se a senha correspondente está correta. Retorna um objeto com o id do usuário, nome do usuário e um token gerado com base no id do usuário em caso de sucesso ou uma mensagem de erro em caso contrário.
- getAll: retorna todos os usuários registrados no banco de dados.
- getcurrentUser: retorna as informações do usuário atualmente autenticado com base no token fornecido na solicitação.
- recentsMusicsUser: adiciona uma nova música recente ao banco de dados com o id do usuário e as informações da música. Retorna uma mensagem de sucesso em caso de cadastro realizado com sucesso ou um erro em caso contrário.
- favoriteMusic: adiciona uma nova música favorita ao banco de dados com o id do usuário e as informações da música. Verifica se a música já está favoritada antes de adicioná-la e retorna uma mensagem de erro em caso afirmativo. Retorna uma mensagem de sucesso em caso de cadastro realizado com sucesso ou um erro em caso contrário.
- recentMusics: retorna as últimas músicas recentes adicionadas pelo usuário, até um máximo de 10, ordenadas pela data de criação (da mais recente para a mais antiga).
