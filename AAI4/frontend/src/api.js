import axios from 'axios';

// Definir a base URL para o Axios
axios.defaults.baseURL = 'http://localhost:3001';

// Criar a instância do axios
const api = axios.create();

// Exemplo de requisição GET
api.get('/clientes')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Erro na requisição', error);
  });

// Exportar a instância de axios
export default api;