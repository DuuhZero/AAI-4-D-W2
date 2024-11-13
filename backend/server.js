const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const prisma = new PrismaClient();

const app = express();
app.use(cors()); // Adicionando middleware CORS para permitir requisições do frontend
app.use(express.json()); // Habilitar o Express a lidar com JSON nas requisições

// Rota para listar produtos
app.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);  // Log detalhado do erro
    res.status(500).json({ error: "Erro ao buscar produtos." });
  }
});

// Rota para adicionar produto
app.post("/products", async (req, res) => {
  const { name, description, price, quantity } = req.body;
  try {
    // Verificando os dados recebidos
    if (!name || !description || !price || !quantity) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    // Verificando se price e quantity são números
    if (isNaN(price) || isNaN(quantity)) {
      return res.status(400).json({ error: "Preço e quantidade devem ser números." });
    }

    const newProduct = await prisma.product.create({
      data: { name, description, price: parseFloat(price), quantity: parseInt(quantity) },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);  // Log detalhado do erro
    res.status(500).json({ error: error.message || "Erro ao adicionar produto." });
  }
});

// Rota para deletar produto
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.send("Produto deletado com sucesso");
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    res.status(500).json({ error: "Erro ao deletar produto." });
  }
});


// Rodando o servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
