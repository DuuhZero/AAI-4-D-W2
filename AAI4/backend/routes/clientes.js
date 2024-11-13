const express = require('express');
const router = express.Router();
const { Cliente } = require('../models');

// Rota para criar um novo cliente
router.post('/', async (req, res) => {
  try {
    const { nome, rg, data_nascimento, sexo } = req.body;
    const cliente = await Cliente.create({ nome, rg, data_nascimento, sexo });
    res.status(201).json(cliente);  // Retorna o cliente criado
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;