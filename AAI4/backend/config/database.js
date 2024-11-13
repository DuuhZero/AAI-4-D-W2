const mysql = require('mysql2');
const { Sequelize } = require('sequelize');

const DB_HOST = '127.0.0.1'; 
const DB_USER = 'root';     
const DB_PASSWORD = 'anuubiss1';    
const DB_NAME = 'aai4';     

// Criação da conexão com o MySQL (sem especificar um banco de dados ainda)
const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
});

// Conexão para criação do banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conexão ao MySQL estabelecida com sucesso.');

    // Tentar criar o banco de dados, se não existir
    connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`, (err, result) => {
        if (err) {
            console.error('Erro ao criar o banco de dados:', err);
            return;
        }
        console.log(`Banco de dados ${DB_NAME} está pronto.`);

        // Fechar a conexão de criação do banco de dados
        connection.end();

        // Agora que o banco foi criado, podemos inicializar o Sequelize
        initializeSequelize();
    });
});

// Função para inicializar o Sequelize após a criação do banco
function initializeSequelize() {
    const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        dialect: 'mysql',
        logging: console.log,
        define: {
            timestamps: true,   // Habilita timestamps para todos os modelos
            underscored: true,  // Usa snake_case para os nomes de colunas
        },
    });

    // Testar a conexão com o banco de dados
    sequelize.authenticate()
        .then(() => {
            console.log('Conexão estabelecida com sucesso!');
            // Certifique-se de que o modelo Cliente seja sincronizado com o banco
            return sequelize.sync({ force: false }); // Não apaga dados existentes
        })
        .catch((error) => {
            console.error('Erro ao conectar-se ao banco de dados:', error);
        });

    // Retorne a instância do Sequelize para ser usada em outros arquivos
    return sequelize;
}

module.exports = initializeSequelize();