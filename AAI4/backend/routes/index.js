const express = require('express');
const Cliente = require('../models/Cliente');
const Produto = require('../models/Produto');
const { body, validationResult } = require('express-validator'); // Para validação de dados

const router = express.Router();

// Validação de dados para criação/atualização de clientes
const clienteValidationRules = [
  body('nome').notEmpty().withMessage('Nome é obrigatório.'),
  body('rg').notEmpty().withMessage('RG é obrigatório.')
    .isLength({ min: 7, max: 20 }).withMessage('RG deve ter entre 7 e 20 caracteres.'),
  body('data_nascimento').notEmpty().isDate().withMessage('Data de nascimento é obrigatória e deve ser uma data válida.'),
  body('sexo').notEmpty().isIn(['M', 'F']).withMessage('Sexo deve ser "M" ou "F".'),
];

// Validação de dados para criação/atualização de produtos
const produtoValidationRules = [
  body('nome').notEmpty().withMessage('Nome do produto é obrigatório.'),
  body('preco').notEmpty().isFloat({ min: 0 }).withMessage('Preço do produto é obrigatório e deve ser um número positivo.'),
];

// Middleware de validação
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// CRUD para Clientes
router.post('/clientes', clienteValidationRules, validate, async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar cliente.' });
  }
});

router.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar clientes.' });
  }
});

router.get('/clientes/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }
    res.json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar cliente.' });
  }
});

router.put('/clientes/:id', clienteValidationRules, validate, async (req, res) => {
  try {
    const [updated] = await Cliente.update(req.body, { where: { id: req.params.id } });
    if (!updated) {
      return res.status(404).json({ error: 'Cliente não encontrado para atualização.' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar cliente.' });
  }
});

router.delete('/clientes/:id', async (req, res) => {
  try {
    const deleted = await Cliente.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Cliente não encontrado para exclusão.' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir cliente.' });
  }
});

// CRUD para Produtos
router.post('/produtos', produtoValidationRules, validate, async (req, res) => {
  try {
    const produto = await Produto.create(req.body);
    res.status(201).json(produto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar produto.' });
  }
});

router.get('/produtos', async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar produtos.' });
  }
});

router.get('/produtos/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }
    res.json(produto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar produto.' });
  }
});

router.put('/produtos/:id', produtoValidationRules, validate, async (req, res) => {
  try {
    const [updated] = await Produto.update(req.body, { where: { id: req.params.id } });
    if (!updated) {
      return res.status(404).json({ error: 'Produto não encontrado para atualização.' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar produto.' });
  }
});

router.delete('/produtos/:id', async (req, res) => {
  try {
    const deleted = await Produto.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Produto não encontrado para exclusão.' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir produto.' });
  }
});

// Relacionamento: Consultar Produtos de um Cliente
router.get('/clientes/:id/produtos', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id, {
      include: Produto,  // Incluir os produtos associados ao cliente
    });
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }
    res.json(cliente.produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar produtos do cliente.' });
  }
});

module.exports = router;