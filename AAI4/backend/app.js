const express = require('express');
const cors = require('cors');
const routes = require('./routes');  // Supondo que as rotas estão no arquivo ./routes

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api', routes);  // Prefixo para todas as rotas da API

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});