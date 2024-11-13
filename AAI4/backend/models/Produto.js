const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./Cliente'); // Certifique-se de que o caminho está correto

class Produto extends Model {}

Produto.init({
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_validade: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, { 
  sequelize, 
  modelName: 'produto',
  tableName: 'produtos',
  timestamps: true,
});

// Definindo as associações depois de definir os modelos
Produto.belongsTo(Cliente, { foreignKey: 'clienteId' }); // Produto pertence a um Cliente
Cliente.hasMany(Produto, { foreignKey: 'clienteId' }); // Cliente pode ter muitos Produtos

module.exports = Produto;